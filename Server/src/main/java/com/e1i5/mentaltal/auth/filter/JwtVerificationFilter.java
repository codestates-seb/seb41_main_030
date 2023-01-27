package com.e1i5.mentaltal.auth.filter;

import com.e1i5.mentaltal.auth.jwt.JwtTokenizer;
import com.e1i5.mentaltal.auth.userdetails.MemberDetailsService;
import com.e1i5.mentaltal.auth.utils.CustomAuthorityUtils;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberDetailsService memberDetailsService;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            isLogout(request);
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims,request);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    // header 값이 null 이거나 bearer로 시작하지 않으면 자격증명 안하고 다음 filter로 넘어감
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }
    // Bearer제거
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims, HttpServletRequest request) {
        String username = (String) claims.get("email");
        MemberDetailsService.MemberDetails memberDetails = (MemberDetailsService.MemberDetails) memberDetailsService.loadUserByUsername(username);
        List<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities((List)claims.get("roles"));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(memberDetails, null, authorities);
        // request에 MemberDetails를 담아서 컨트롤러에게 전달합니다.
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void isLogout(HttpServletRequest request) {
        String jwt = resolveToken(request);

        if (!ObjectUtils.isEmpty(redisTemplate.opsForValue().get(jwt))) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.split(" ")[1];
        }
        return null;
    }


}

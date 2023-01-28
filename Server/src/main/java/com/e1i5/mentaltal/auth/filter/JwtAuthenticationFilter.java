package com.e1i5.mentaltal.auth.filter;

import com.e1i5.mentaltal.auth.dto.LoginDto;
import com.e1i5.mentaltal.auth.jwt.JwtTokenizer;
import com.e1i5.mentaltal.auth.utils.RedisUtils;
import com.e1i5.mentaltal.domain.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtils redisUtils;



    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); //eamil과 password를 DTO 클래스로 역직렬화
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()); //email과 password를 포함한 UsernamePasswordAuthenticationToken 생성

        return authenticationManager.authenticate(authenticationToken); // AuthenticationManager에게 전달하면서 인증 처리를 위임
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal(); // authResult.getPrincipal()로 Member 객체 가져옴

        String accessToken = delegateAccessToken(member); // access token 생성

        Map.Entry<String, Date> entry = delegateRefreshToken(member).entrySet().iterator().next();
        String refreshToken = entry.getKey();
        Long expiration = entry.getValue().getTime(); // refresh token 생성

        // redis에 refreshToken, 멤버정보, 만료시간 전달
        redisUtils.setData(
                member.getEmail(),
                refreshToken,
                expiration
        );

        response.setHeader("Authorization", "Bearer " + accessToken); //Bearer jwt인증타입 중 하나, JWT 혹은 OAuth에 대한 토큰을 사용
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenizerExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private Map<String, Date> delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenizerExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        Map<String, Date> refreshInfo = new HashMap<>();
        refreshInfo.put(refreshToken, expiration);

        return refreshInfo;
    }

}

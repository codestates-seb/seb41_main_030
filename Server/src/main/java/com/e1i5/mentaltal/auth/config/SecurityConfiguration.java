package com.e1i5.mentaltal.auth.config;

import com.e1i5.mentaltal.auth.filter.JwtAuthenticationFilter;
import com.e1i5.mentaltal.auth.filter.JwtVerificationFilter;
import com.e1i5.mentaltal.auth.handler.MemberAuthenticationFailureHandler;
import com.e1i5.mentaltal.auth.handler.MemberAuthenticationSuccessHandler;
import com.e1i5.mentaltal.auth.jwt.JwtTokenizer;
import com.e1i5.mentaltal.auth.userdetails.MemberDetailsService;
import com.e1i5.mentaltal.auth.utils.CustomAuthorityUtils;
import com.e1i5.mentaltal.auth.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final RedisUtils redisUtils;
    private final MemberDetailsService memberDetailsService;
    private final RedisTemplate<String, String> redisTemplate;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일출처로 들어오는 요청만 렌더링 허용
                .and()
                .csrf().disable()        // csrf 공격에 대한 설정 비활성화
                .cors(withDefaults())    // cors filter적용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()   // 폼로그인 사용 안함
                .httpBasic().disable()   // 사용안함
                .exceptionHandling()
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
                        .antMatchers(HttpMethod.POST, "members/logout").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH,"/*/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/members/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/*/comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/comments").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH,"/*/comments/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/comments/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/*/boards/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/boards").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH,"/*/boards/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/boards/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().permitAll()
                );

        http.cors();    // CORS 활성화

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // cors정책 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "POST", "GET", "PATCH", "DELETE", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);      // 모든 url에 cors정책 적용
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisUtils);

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils, memberDetailsService, redisTemplate);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");


            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);;
        }
    }

}

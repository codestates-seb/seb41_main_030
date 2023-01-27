package com.e1i5.mentaltal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true) // 쿠키 요청 허용 (true 설정 시 보안상 이슈 발생 가능)
                .allowedOrigins("http://localhost:3000", "http://localhost:8080", "http://mentaltal-s3-bucket.s3-website.ap-northeast-2.amazonaws.com/");   // 공유를 허락할 origin (* : 모든 origin)

    }
}

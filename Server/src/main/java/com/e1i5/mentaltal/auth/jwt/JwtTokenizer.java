package com.e1i5.mentaltal.auth.jwt;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenizer {
    private String secretKey;

    private int accessTokenizerExpirationMinutes;

    private int refreshTokenizerExpirationMinutes;
}

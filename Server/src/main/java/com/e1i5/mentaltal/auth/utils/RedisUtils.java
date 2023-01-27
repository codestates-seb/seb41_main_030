package com.e1i5.mentaltal.auth.utils;

import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtils {
    private final RedisTemplate<String, String> redisTemplate;

    public void setData(String key, String token, Long expiration) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(token.getClass()));
        redisTemplate.opsForValue().set(key, token, expiration, TimeUnit.MINUTES);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public boolean isExists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public String getValueByKey(String key) {
        if (!StringUtils.hasText(key)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }
        String refreshToken = redisTemplate.opsForValue().get(key);
        if (refreshToken.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }
        return refreshToken;
    }
}

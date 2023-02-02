package com.e1i5.mentaltal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SingleResponseDto <T>{
    private T data;
}

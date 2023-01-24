package com.e1i5.mentaltal.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardPostDto {
    private long memberId;

    private String title;
    // TO DO 유효성 검증 로직 필요 공백만 입력시

    private String content;

//    private String tags;

    private List<String> tags;
}

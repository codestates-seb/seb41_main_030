package com.e1i5.mentaltal.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardGetResponseDto {
    private long boardId;
    private long memberId;
    private String title;
    private String content;
    private int score;
    private long answerCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}

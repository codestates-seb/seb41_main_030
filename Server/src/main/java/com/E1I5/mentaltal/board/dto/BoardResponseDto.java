package com.E1I5.mentaltal.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;
//    private long memberId;
    private String title;
    private String content;
    private int score;
//    private String tags;
//    private int view;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}

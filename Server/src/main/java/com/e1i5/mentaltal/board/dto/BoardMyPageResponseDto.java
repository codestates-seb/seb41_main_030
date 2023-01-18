package com.e1i5.mentaltal.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BoardMyPageResponseDto {
    private long boardId;
    private long memberId;
    private String title;
    private String content;
    private long commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

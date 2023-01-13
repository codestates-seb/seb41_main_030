package com.e1i5.mentaltal.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CommentResponseDto {
    private long commentId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private int score;

    private long boardId;

    private long memberId;

//    private long counselorId;
}

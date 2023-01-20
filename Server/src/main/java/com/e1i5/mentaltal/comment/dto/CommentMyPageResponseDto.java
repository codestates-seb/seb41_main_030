package com.e1i5.mentaltal.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CommentMyPageResponseDto {
    private long commentId;
    private long boardId;
    private long memberId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}

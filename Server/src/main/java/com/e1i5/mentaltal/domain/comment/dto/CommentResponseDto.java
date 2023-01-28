package com.e1i5.mentaltal.domain.comment.dto;

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

    private long voteCount;  // 공감수

    private long boardId;

    private long memberId;

    private String nickName;

//    private long counselorId;
}

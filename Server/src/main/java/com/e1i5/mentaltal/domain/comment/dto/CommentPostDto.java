package com.e1i5.mentaltal.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPostDto {
    private long memberId;

    private long boardId;

    private String content;

}

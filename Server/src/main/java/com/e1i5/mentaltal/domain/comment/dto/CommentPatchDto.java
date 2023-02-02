package com.e1i5.mentaltal.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPatchDto {
    private long commentId;

    private String content;

}

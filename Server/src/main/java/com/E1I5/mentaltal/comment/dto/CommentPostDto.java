package com.E1I5.mentaltal.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CommentPostDto {

    private long memberId;

    private long boardId;

    private String content;
    // 클라이언트가 작성하는 답변 컨텐츠

}

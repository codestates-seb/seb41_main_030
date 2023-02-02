package com.e1i5.mentaltal.domain.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardPatchDto {
    private long boardId;

    private long memberId;

    private String title;

    private String content;

    private String tags;
}

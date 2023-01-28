package com.e1i5.mentaltal.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;
    private long memberId;
    private String title;
    private String content;
    private String tags;
    private long voteCount;  // 공감수
    private long commentCount;

    private String nickName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

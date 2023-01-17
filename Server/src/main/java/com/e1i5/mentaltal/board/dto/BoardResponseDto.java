package com.e1i5.mentaltal.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BoardResponseDto {
    private long boardId;
    private long memberId;
    private String title;
    private String content;
//    private String tags;
    private int viewCount;  // 조회수
    private int voteCount;  // 공감수
    private long commentCount;

    private String nickName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

package com.E1I5.mentaltal.board.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

//    private long memberId;

    @Column(nullable = false, length = 256)
    private String title;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

//    private String tags;
//    private int view = 0;

    @Column
    private LocalDateTime createdAt;


    @Column
    private LocalDateTime modifiedAt;

    @Column
    private int score;
}

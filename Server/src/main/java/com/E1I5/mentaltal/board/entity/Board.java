package com.E1I5.mentaltal.board.entity;

import com.E1I5.mentaltal.comment.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    private long memberId;

    @Column(nullable = false, length = 256)
    private String title;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

//    private String tags;
//    private int view = 0;

    private int answerCount = 0;

    @Column
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> comment = new ArrayList<>();


    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column
    private int score;

}

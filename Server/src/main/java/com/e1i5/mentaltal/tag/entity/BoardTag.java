package com.e1i5.mentaltal.tag.entity;

import com.e1i5.mentaltal.board.entity.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
public class BoardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BoardTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    protected BoardTag () {

    }

    @Builder
    public BoardTag(final Board board, final Tag tag) {
        this.board = board;
        this.tag = tag;
    }

    public void changeBoard (final Board board) {
        this.board = board;
    }

}

package com.e1i5.mentaltal.domain.comment.entity;


import com.e1i5.mentaltal.audit.BaseTimeEntity;
import com.e1i5.mentaltal.domain.board.entity.Board;
import com.e1i5.mentaltal.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private long voteCount;  // 공감수 (좋아요)

    @Transient
    private long bid;

    @Transient
    private long mid;

    //question:answer = 1:n
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getComments().remove(this);
        }
        this.member = member;
        this.member.getComments().add(this);
    }

    public void addBoard(Board board) {
        if (this.board != null) {
            this.board.getComments().remove(this);
        }
        this.board = board;
        this.board.getComments().add(this);
    }
}

package com.e1i5.mentaltal.domain.comment.entity;

import com.e1i5.mentaltal.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CommentVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentVoteId;

    private boolean voteCheck;

    @ManyToOne
    private Comment comment;

    @ManyToOne
    Member member;

    public CommentVote(boolean voteCheck, Comment comment, Member member) {
        this.voteCheck = voteCheck;
        this.comment = comment;
        this.member = member;
    }
}

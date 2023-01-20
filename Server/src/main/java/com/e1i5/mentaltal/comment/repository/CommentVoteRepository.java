package com.e1i5.mentaltal.comment.repository;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.comment.entity.CommentVote;
import com.e1i5.mentaltal.user.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentVoteRepository extends JpaRepository<CommentVote, Long> {
    Optional<CommentVote> findByCommentAndMember(Comment comment, Member member);
//    void deleteAllByComment(Comment comment);   // CommentService --> deleteComment
}

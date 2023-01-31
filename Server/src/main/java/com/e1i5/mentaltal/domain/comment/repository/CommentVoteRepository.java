package com.e1i5.mentaltal.domain.comment.repository;

import com.e1i5.mentaltal.domain.comment.entity.Comment;
import com.e1i5.mentaltal.domain.comment.entity.CommentVote;
import com.e1i5.mentaltal.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentVoteRepository extends JpaRepository<CommentVote, Long> {
    Optional<CommentVote> findByCommentAndMember(Comment comment, Member member);
    void deleteAllByComment(Comment comment);   // CommentService --> deleteComment
}

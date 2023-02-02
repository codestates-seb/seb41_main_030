package com.e1i5.mentaltal.domain.comment.repository;

import com.e1i5.mentaltal.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    Long countCommentByMember_MemberId(Long memberId);

}


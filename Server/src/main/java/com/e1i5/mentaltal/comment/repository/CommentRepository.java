package com.e1i5.mentaltal.comment.repository;

import com.e1i5.mentaltal.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
// Long은 Comment 엔티티 클래스에서 @Id 애너테이션이 붙은 멤버 변수의 타입을 가르킵니다.


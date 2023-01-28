package com.e1i5.mentaltal.domain.comment.repository;

import com.e1i5.mentaltal.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    Long countCommentByMember_MemberId(Long memberId);
    // 멤버아이디를 통해, 멤버에서 답글 개수를 찾을거다..
    // 쿼리메소드란, 메소드의 이름으로 필요한 쿼리를 만들어 주는 것


}
// Long은 Comment 엔티티 클래스에서 @Id 애너테이션이 붙은 멤버 변수의 타입을 가르킵니다.

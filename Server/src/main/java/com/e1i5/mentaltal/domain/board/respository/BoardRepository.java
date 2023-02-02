package com.e1i5.mentaltal.domain.board.respository;

import com.e1i5.mentaltal.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Long countBoardByMember_MemberId(long memberId);
}

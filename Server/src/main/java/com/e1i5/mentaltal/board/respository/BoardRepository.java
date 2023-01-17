package com.e1i5.mentaltal.board.respository;

import com.e1i5.mentaltal.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Long countBoardByMember_MemberId(long memberId);

}

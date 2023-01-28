package com.e1i5.mentaltal.domain.board.respository;

import com.e1i5.mentaltal.domain.board.entity.Board;
import com.e1i5.mentaltal.domain.board.entity.BoardVote;
import com.e1i5.mentaltal.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BoardVoteRepository extends JpaRepository<BoardVote, Long> {
    Optional<BoardVote> findByBoardAndMember(Board board, Member member);
//    void deleteAllByBoard(Board board);   // BoardService --> deleteBoard
}

package com.e1i5.mentaltal.board.respository;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.entity.BoardVote;
import com.e1i5.mentaltal.user.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardVoteRepository extends JpaRepository<BoardVote, Long> {
    Optional<BoardVote> findByBoardAndMember(Board board, Member member);
//    void deleteAllByBoard(Board board);   // BoardService --> deleteBoard
}

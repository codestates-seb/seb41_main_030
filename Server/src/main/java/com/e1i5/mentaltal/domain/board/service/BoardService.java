package com.e1i5.mentaltal.domain.board.service;

import com.e1i5.mentaltal.domain.board.entity.Board;
import com.e1i5.mentaltal.domain.board.entity.BoardVote;
import com.e1i5.mentaltal.domain.board.respository.BoardRepository;
import com.e1i5.mentaltal.domain.board.respository.BoardVoteRepository;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import com.e1i5.mentaltal.domain.member.entity.Member;
import com.e1i5.mentaltal.domain.member.service.MemberService;
import com.e1i5.mentaltal.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<Board> beanUtils; // 제네릭 전용 클래스라서 <> 안에 어떤 엔티티의 service 클래스에 적용할 건지 써줘야 함
    private final BoardVoteRepository boardVoteRepository;

    // 게시물 생성
    public Board createBoard(Board board) {
        verifyStrLength(board); // 게시글 길이 검증
        Member member = memberService.findMember(board.getMid()); // 회원 검증
        board.addMember(member);

        return boardRepository.save(board);
    }

    // 게시믈 수정
    public Board updateBoard(long boardId, Board board) {
        Board findBoard = findVerifiedBoard(board.getBoardId()); // db에 게시글이 있는지 검증
        Board verifiedBoard = findVerifiedBoard(boardId);

        if (verifiedBoard.getMember().getMemberId() != board.getMid()) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        Board updatedBoard = beanUtils.copyNonNullProperties(board, findBoard);
        //beanUtils 클래스 내의 copyNonNullProperties 메서드 사용하여 안에  (수정하고자 하는 정보, 넣을 메서드명)
        verifyStrLength(updatedBoard);
        updatedBoard.setVoteCount(1);

        return boardRepository.save(updatedBoard);
    }

    // 게시물 상세조회
    public Board findBoard(long boardId) {
        Board findBoard = findVerifiedBoard(boardId); // db에서 boardid조회

        return findBoard;
    }

    // 게시물 전체 조회
    @Transactional(readOnly = true)
    public List<Board> findAllBoards() {
        return boardRepository.findAll();
    }


    // 게시믈 페이지네이션
    @Transactional(readOnly = true)
    public Page<Board> findBoards(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page, size, Sort.by("boardId").descending()));
    }

    // 게시믈 삭제
    @Transactional
    public void deleteBoard(long boardId) {
        Board verifiedBoard = findVerifiedBoard(boardId);

        boardVoteRepository.deleteAllByBoard(verifiedBoard);

        boardRepository.delete(verifiedBoard);
    }

    // 공감수 (좋아요)
    public long getVoteCount(long boardId) {
        Board board = findVerifiedBoard(boardId);
        return board.getVoteCount();
    }

    /**
     * 공감 (좋아요)
     * TODO 로그인한 회원만 공감 가능 --> 비회원 공감 버튼 클릭 시 "로그인이 필요합니다."
     * @param boardId
     * @param memberId
     * @param voteCheck
     * @return
     */
    public Board voteBoard(long boardId, long memberId, boolean voteCheck) {
        Member member = memberService.findMember(memberId);

        Board board = findVerifiedBoard(boardId);
        Optional<BoardVote> findVote = boardVoteRepository.findByBoardAndMember(board, member); // 해당 회원이 게시물을 작성했는지 아닌지 확인

        // 공감을 클릭한 이력이 있는 경우
        if (findVote.isPresent()) {
            if (findVote.get().isVoteCheck() == voteCheck) {
                // vote가 true이면 -1, false이면 1 --> true(1)는 공감이 눌러져 있는 상태이므로 0으로 만들어줌 == 공감 취소
                // fasle(0)는 공감을 누르지 않은 상태이므로 1로 만들어줌 == 공감 처리
                board.setVoteCount(board.getVoteCount() + (voteCheck ? -1 : 1));
                boardVoteRepository.delete(findVote.get());  // 공감을 클릭한 이력을 삭제
                return board;
            }
        }
        // 공감을 클릭하지 않은 경우 (findVote 존재 x)
        board.setVoteCount(board.getVoteCount() + (voteCheck ? 1 : -1));    // 공감을 클릭하면 +1, 한 번 더 클릭하면 -1 (공감 취소)
        BoardVote boardVote = new BoardVote(voteCheck, board, member);
        boardVoteRepository.save(boardVote);
        return board;
    }

    // db에 게시물이 있는지 검증. 없으면 예외
    @Transactional(readOnly = true)
    public Board findVerifiedBoard (long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board board = optionalBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return board;
    }

    // 제목, 내용 길이 검증
    private void verifyStrLength(Board board) {
        calculateStrLength(board.getTitle());
        calculateStrLength(board.getContent());
    }

    private void calculateStrLength(String str) {
        if (str.length() < 10) {
            throw new BusinessLogicException(ExceptionCode.POST_UNDER_TEN);
        }
    }
}

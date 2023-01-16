package com.e1i5.mentaltal.board.service;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.respository.BoardRepository;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import com.e1i5.mentaltal.user.member.Member;
import com.e1i5.mentaltal.user.member.MemberService;
import com.e1i5.mentaltal.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    private final MemberService memberService;

    private final CustomBeanUtils<Board> beanUtils;
    // 제네릭 전용 클래스라서 <> 안에 어떤 엔티티의 service 클래스에 적용할 건지 써줘야 함


    // 게시물 생성
    public Board createBoard(Board board) {
        verifyStrLength(board); // 게시글 길이 검증
        Member member = memberService.findMember(board.getMid()); // 회원 검증
        board.setCreatedAt(LocalDateTime.now());
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
        updatedBoard.setModifiedAt(LocalDateTime.now());

        return boardRepository.save(updatedBoard);

    }

    // 게시물 상세조회
    public Board findBoard(long boardId) {
        Board findBoard = findVerifiedBoard(boardId); // db에서 boardid조회

        return findBoard;
    }

    // 게시물 전체 조회
    public List<Board> findAllBoards() {
        return boardRepository.findAll();
    }


    // 게시믈 페이지네이션
    public Page<Board> findBoards(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page, size, Sort.by("boardId").descending()));
    }

    // 게시믈 삭제
    public void deleteBoard(long boardId, Board board) {
//        Member findMember = memberService.findMember(board.getMid());
        Board verifiedBoard = findVerifiedBoard(boardId);

        boardRepository.delete(verifiedBoard);
    }

    // 투표
    public Board upVote(long boardId) {
        Board findBoard = findVerifiedBoard(boardId);
        findBoard.setScore(findBoard.getScore() + 1);
        Board updateBoard = boardRepository.save(findBoard);

        return updateBoard;
    }


    // db에 게시물이 있는지 검증. 없으면 예외
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

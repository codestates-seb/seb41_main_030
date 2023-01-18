package com.e1i5.mentaltal.board.service;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.respository.BoardRepository;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import com.e1i5.mentaltal.user.member.Member;
import com.e1i5.mentaltal.user.member.MemberService;
import com.e1i5.mentaltal.utils.CustomBeanUtils;
import lombok.Getter;
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
    private final CustomBeanUtils<Board> beanUtils; // 제네릭 전용 클래스라서 <> 안에 어떤 엔티티의 service 클래스에 적용할 건지 써줘야 함


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
    public void deleteBoard(long boardId) {
//        Member findMember = memberService.findMember(board.getMid());
        Board verifiedBoard = findVerifiedBoard(boardId);

        boardRepository.delete(verifiedBoard);
    }

    // 조회수
    public void updateBoardViewCount(Board board, int viewCount) {
        board.setViewCount(viewCount + 1);
        boardRepository.save(board);
    }

    // 공감수 (좋아요)
    public int getVoteCount(long boardId) {
        Board board = findVerifiedBoard(boardId);
//        board.setVoteCount(board.getVoteCount() + 1);
        return board.getVoteCount();
    }

    /**
     * 공감 버튼 클릭 시, 공감을 클릭한 이력이 있다면 공감 취소
     * 이력이 없다면 공감 처리
     * 로그인한 사용자만 공감 가능, 중복 불가
     * @param boardId
     * @param memberId
     * @return
     */
    public void setCheckVote(long boardId, long memberId) {
        memberService.findMember(memberId);

        Board board = findVerifiedBoard(boardId);
        VoteStatus voteStatus = getMemberVoteStatus(board, memberId);
        int voteCount = board.getVoteCount();

        // Todo 로그인 하지 않은 사용자 -> 에러 메시지 "로그인 후 이용할 수 있습니다." or 로그인창

        if (voteStatus == VoteStatus.NONE) { // 공감 이력이 없는 경우, 공감 처리
            board.checkVote.add(memberId);
            voteCount++;
        } else {    // 공감 취소
            board.uncheckVote.remove(memberId);
            voteCount--;
        }

        board.setVoteCount(voteCount);
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

    private VoteStatus getMemberVoteStatus(Board board, long memberId) {
        if (board.getCheckVote().contains(memberId)) {  // 공감 이력이 있는 경우, 공감 취소
            return VoteStatus.NONE;
        }else {     // 공감 이력이 없는 경우, 공감 처리
            return VoteStatus.CHECK;
        }
    }

    public enum VoteStatus{
        NONE(1, "none"),
        CHECK(2, "check");

        @Getter
        private int status;

        @Getter
        private String message;

        VoteStatus(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}

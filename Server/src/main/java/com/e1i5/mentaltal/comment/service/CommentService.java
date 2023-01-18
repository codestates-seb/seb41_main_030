package com.e1i5.mentaltal.comment.service;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.service.BoardService;
import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.comment.repository.CommentRepository;
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

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;

    private final BoardService boardService;

    private final MemberService memberService;

    private final CustomBeanUtils<Comment> beanUtils;


    // 답변 등록
    public Comment createComment(Comment comment) {
        Member member = memberService.findMember(comment.getMid());
        Board board = boardService.findVerifiedBoard(comment.getBid());
        comment.setCreatedAt(LocalDateTime.now());
        comment.addMember(member);
        comment.addBoard(board);
        board.plusCommentCount();

        return commentRepository.save(comment);

    }

    // 답변 수정
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        Comment updatingComment = beanUtils.copyNonNullProperties(comment, findComment);
        //comment : 모든 필드를 저장할 변수
        //destination : 모든 필드를 중 변경한 값만 저장할 변수
        updatingComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(updatingComment);

    }

    // 답변 조회
    public Comment findComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.save(findComment);

        return findComment;
    }

    // 답변 전체조회
    public List<Comment> findAllComment() {
        return commentRepository.findAll();
    }

    // 답변 페이지네이션
    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    // 답변 삭제
    public void deleteComment (long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        Board board = boardService.findVerifiedBoard(findComment.getBoard().getBoardId());
        board.minusCommentCount();
        // 게시글에 달린 답변을 삭제해야 하는 거니까,
        // 게시글 id를 받아와서, 그 게시글의 답변 개수를 내린다.
        commentRepository.delete(findComment);

    }


    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        // 답변이 db에 존재하는지 검증
        // orElseThrow : 가져온 값이 null이면 예외
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    // 조회수
    public void updateCommentViewCount(Comment comment, int viewCount) {
        comment.setViewCount(viewCount + 1);
        commentRepository.save(comment);
    }

    // 공감수 (좋아요)
    public int getVoteCount(long commentId) {
        Comment comment = findVerifiedComment(commentId);
//        comment.setVoteCount(comment.getVoteCount() + 1);
        return comment.getVoteCount();
    }

    /**
     * 공감 버튼 클릭 시, 공감을 클릭한 이력이 있다면 공감 취소
     * 이력이 없다면 공감 처리
     * 로그인한 사용자만 공감 가능, 중복 불가
     * @param commentId
     * @param memberId
     */
    public void setCheckVote(long commentId, long memberId) {
        memberService.findMember(memberId);

        Comment comment = findVerifiedComment(commentId);
        VoteStatus voteStatus = getMemberVoteStatus(comment, memberId);
        int voteCount = comment.getVoteCount();

        // Todo 로그인 하지 않은 사용자 -> 에러 메시지 "로그인 후 이용할 수 있습니다." or 로그인창

        if (voteStatus == VoteStatus.NONE) { // 공감 이력이 없는 경우, 공감 처리
            comment.checkVote.add(memberId);
            voteCount++;
        } else {    // 공감 취소
            comment.uncheckVote.remove(memberId);
            voteCount--;
        }

        comment.setVoteCount(voteCount);
    }

    private VoteStatus getMemberVoteStatus(Comment comment, long memberId) {
        if (comment.getCheckVote().contains(memberId)) {  // 공감 이력이 있는 경우, 공감 취소
            return CommentService.VoteStatus.NONE;
        }else {     // 공감 이력이 없는 경우, 공감 처리
            return CommentService.VoteStatus.CHECK;
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

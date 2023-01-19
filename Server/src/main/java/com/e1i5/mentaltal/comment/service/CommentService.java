package com.e1i5.mentaltal.comment.service;

import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.service.BoardService;
import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.comment.entity.CommentVote;
import com.e1i5.mentaltal.comment.repository.CommentRepository;
import com.e1i5.mentaltal.comment.repository.CommentVoteRepository;
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
    private final CommentVoteRepository commentVoteRepository;
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

    /**
     * 공감수 (좋아요)
     * TODO 로그인한 회원만 공감 가능 --> 비회원 공감 버튼 클릭 시 "로그인이 필요합니다."
     * @param commentId
     * @param memberId
     * @param voteCheck
     * @return
     */
    public Comment commentVote(long commentId, long memberId, boolean voteCheck) {
        Member member = memberService.findMember(memberId);

        Comment comment = findVerifiedComment(commentId);
        Optional<CommentVote> findVote = commentVoteRepository.findByCommentAndMember(comment, member);

        if (findVote.isPresent()) {
            if (findVote.get().isVoteCheck() == voteCheck) {
                comment.setVoteCount(comment.getVoteCount() + (voteCheck ? -1 : 1));    // vote가 true이면 -1, false이면 1 --> true는 공감이 눌러져 있는 상태이므로 0으로 만들어줌
                commentVoteRepository.delete(findVote.get());   // 공감을 클릭한 이력을 삭제
                return comment;
            }
        }
        // 공감을 클릭하지 않은 경우 (findVote 존재 x)
        comment.setVoteCount(comment.getVoteCount() + (voteCheck ? 1 : -1));    // 공감을 클릭하면 +1, 한 번 더 클릭하면 -1 (공감 취소)
        CommentVote commentVote = new CommentVote(voteCheck, comment, member);
        commentVoteRepository.save(commentVote);
        return comment;
    }
}

package com.e1i5.mentaltal.comment.controller;

import com.e1i5.mentaltal.comment.dto.CommentPatchDto;
import com.e1i5.mentaltal.comment.dto.CommentPostDto;
import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.comment.mapper.CommentMapper;
import com.e1i5.mentaltal.comment.service.CommentService;
import com.e1i5.mentaltal.dto.MultiResponseDto;
import com.e1i5.mentaltal.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;


    // 답변 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {

        Comment comment = commentService.createComment(mapper.commentPostDtoToComment(commentPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)), HttpStatus.CREATED);

    }

    // 답변 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentPatchDto patchDto) {
        Comment comment = commentService.updateComment(mapper.commentPatchDtoToComment(patchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)),
                HttpStatus.OK);
    }

    // 답변 상세 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)), HttpStatus.OK);

    }

    // 답변 페이지네이션
    @GetMapping
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findComments(page -1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentToCommentResponseDtos(comments), pageComments),
                HttpStatus.OK);
    }

    // 답변 전체조회
    @GetMapping("/all")
    public ResponseEntity allComment() {
        return ResponseEntity.ok(mapper.commentToCommentResponses(commentService.findAllComment()));

    }

    // 답변 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

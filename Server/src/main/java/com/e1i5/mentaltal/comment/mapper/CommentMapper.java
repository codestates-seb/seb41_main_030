package com.e1i5.mentaltal.comment.mapper;

import com.e1i5.mentaltal.comment.dto.CommentPatchDto;
import com.e1i5.mentaltal.comment.dto.CommentPostDto;
import com.e1i5.mentaltal.comment.dto.CommentResponseDto;
import com.e1i5.mentaltal.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment (CommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setMemberId(commentPostDto.getMemberId());
        comment.setBid(commentPostDto.getBoardId());
        comment.setContent(commentPostDto.getContent());

        return comment;
    }

    default CommentResponseDto commentToCommentResponseDto (Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentResponseDto.CommentResponseDtoBuilder commentResponseDto = CommentResponseDto.builder();

        commentResponseDto.commentId(comment.getCommentId());
//        commentResponseDto.boardId(comment.getBoard().getBoardId());
//        commentResponseDto.
        commentResponseDto.content(comment.getContent());
        commentResponseDto.createdAt(comment.getCreatedAt());
        commentResponseDto.modifiedAt(comment.getModifiedAt());
        commentResponseDto.score(comment.getScore());

        return commentResponseDto.build();

    }

    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    List<CommentResponseDto> commentToCommentResponseDtos (List<Comment> members);
}

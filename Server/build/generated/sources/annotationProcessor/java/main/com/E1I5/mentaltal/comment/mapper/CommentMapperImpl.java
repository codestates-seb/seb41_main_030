package com.E1I5.mentaltal.comment.mapper;

import com.E1I5.mentaltal.comment.dto.CommentPatchDto;
import com.E1I5.mentaltal.comment.dto.CommentResponseDto;
import com.E1I5.mentaltal.comment.entity.Comment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-12T01:22:07+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto) {
        if ( commentPatchDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentId( commentPatchDto.getCommentId() );
        comment.setContent( commentPatchDto.getContent() );

        return comment;
    }

    @Override
    public List<CommentResponseDto> commentToCommentResponseDtos(List<Comment> members) {
        if ( members == null ) {
            return null;
        }

        List<CommentResponseDto> list = new ArrayList<CommentResponseDto>( members.size() );
        for ( Comment comment : members ) {
            list.add( commentToCommentResponseDto( comment ) );
        }

        return list;
    }
}

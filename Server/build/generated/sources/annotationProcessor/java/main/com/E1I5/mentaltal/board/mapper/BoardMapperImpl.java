package com.E1I5.mentaltal.board.mapper;

import com.E1I5.mentaltal.board.dto.BoardResponseDto;
import com.E1I5.mentaltal.board.entity.Board;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-12T01:22:06+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public BoardResponseDto boardToBoardResponseDto(Board board) {
        if ( board == null ) {
            return null;
        }

        long boardId = 0L;
        String title = null;
        String content = null;
        int score = 0;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        if ( board.getBoardId() != null ) {
            boardId = board.getBoardId();
        }
        title = board.getTitle();
        content = board.getContent();
        score = board.getScore();
        createdAt = board.getCreatedAt();
        modifiedAt = board.getModifiedAt();

        BoardResponseDto boardResponseDto = new BoardResponseDto( boardId, title, content, score, createdAt, modifiedAt );

        return boardResponseDto;
    }

    @Override
    public List<BoardResponseDto> boardToBoardResponses(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<BoardResponseDto> list = new ArrayList<BoardResponseDto>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponseDto( board ) );
        }

        return list;
    }
}

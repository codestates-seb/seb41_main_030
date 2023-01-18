package com.e1i5.mentaltal.board.mapper;

import com.e1i5.mentaltal.board.dto.BoardDeleteDto;
import com.e1i5.mentaltal.board.dto.BoardResponseDto;
import com.e1i5.mentaltal.board.entity.Board;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-18T13:10:07+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 18.0.2 (Azul Systems, Inc.)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

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

    @Override
    public Board boardDeleteDtoToBoard(BoardDeleteDto boardDeleteDto) {
        if ( boardDeleteDto == null ) {
            return null;
        }

        Board board = new Board();

        return board;
    }
}

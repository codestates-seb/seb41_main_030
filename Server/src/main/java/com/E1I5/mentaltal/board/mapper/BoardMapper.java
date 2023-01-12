package com.E1I5.mentaltal.board.mapper;

import com.E1I5.mentaltal.board.dto.BoardGetResponseDto;
import com.E1I5.mentaltal.board.dto.BoardPatchDto;
import com.E1I5.mentaltal.board.dto.BoardPostDto;
import com.E1I5.mentaltal.board.dto.BoardResponseDto;
import com.E1I5.mentaltal.board.entity.Board;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    default Board boardPostDtoToBoard(BoardPostDto boardPostDto) {
        Board board = new Board();

//        board.setMemberId(boardPostDto.getMemberId());
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
//        board.setTags(boardPostDto.getTags());

        return board;
    }

    default Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto) {
        Board board = new Board();
        board.setBoardId(boardPatchDto.getBoardId());
//        board.setMemberId(boardPatchDto.getMemberId());
        board.setTitle(boardPatchDto.getTitle());
        board.setContent(boardPatchDto.getContent());
//        board.setTags(boardPatchDto.getTags());
        board.setModifiedAt(LocalDateTime.now());

        return board;
    }

    BoardResponseDto boardToBoardResponseDto(Board board);

    List<BoardResponseDto> boardToBoardResponses(List<Board> boards);

//    Board boardDeleteDtoToBoard(BoardDeleteDto boardDeleteDto);


    default BoardGetResponseDto boardToBoardGetResponseDto(Board board) {

        BoardGetResponseDto boardGetResponseDto = new BoardGetResponseDto();

        boardGetResponseDto.setBoardId(board.getBoardId());
//        boardGetResponseDto.setMemberId(board.getMemberId());
        boardGetResponseDto.setTitle(board.getTitle());
        boardGetResponseDto.setContent(board.getContent());
        boardGetResponseDto.setScore(board.getScore());
        boardGetResponseDto.setCreatedAt(board.getCreatedAt());
        boardGetResponseDto.setModifiedAt(board.getModifiedAt());
        // 답변 개수
        // tag

        return boardGetResponseDto;
    }

    default List<BoardResponseDto> boardsToBoardsResponseDto(List<Board> boards) {
        if (boards == null) {
            return null;
        }

        List<BoardResponseDto> list = new ArrayList<BoardResponseDto>(boards.size());
        for ( Board board : boards ) {
//           board.setMemberId(board.getMember().getMemberId()); // 수정 필요
            list.add(boardToBoardResponseDto(board));
        }
        return list;

    }


}

package com.e1i5.mentaltal.board.controller;

import com.e1i5.mentaltal.board.dto.BoardPatchDto;
import com.e1i5.mentaltal.board.dto.BoardPostDto;
import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.board.mapper.BoardMapper;
import com.e1i5.mentaltal.board.service.BoardService;
import com.e1i5.mentaltal.dto.MultiResponseDto;
import com.e1i5.mentaltal.dto.SingleResponseDto;
import com.e1i5.mentaltal.user.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
//Lombok으로 스프링에서의 DI(의존성 주입)의 방법 중, 생성자 주입을 임의의 코드없이 자동으로 설정
@Validated
@RestController
@RequestMapping("/boards")
public class BoardController {
    private final BoardMapper mapper;
    private final BoardService boardService;

    // 질문 등록
    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardPostDto) {
        Board board = mapper.boardPostDtoToBoard(boardPostDto);
        Board response = boardService.createBoard(board);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.boardToBoardResponseDto(response)), HttpStatus.CREATED);
    }

    // 질문 수정
    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @RequestBody BoardPatchDto boardPatchDto) {
        boardPatchDto.setBoardId(boardId);

        Board board = boardService.updateBoard(boardId, mapper.boardPatchDtoToBoard(boardPatchDto));

        return new ResponseEntity(
                new SingleResponseDto(mapper.boardToBoardResponseDto(board)), HttpStatus.OK);
    }

    // 게시물 상세조회
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId ) {
        // TODO Member 엔티티 매핑 이후 @RequestParam 으로 mid(memberId)를 받아오는 코드가 추가되어야 합니다

        Board board = boardService.findBoard(boardId);

        return new ResponseEntity(
                new SingleResponseDto(mapper.boardToBoardGetResponseDto(board)), HttpStatus.OK);
    }

    //게시물 전체조회
    @GetMapping("/all")
    public ResponseEntity getAllBoards () {
        return ResponseEntity.ok(mapper.boardToBoardResponses(boardService.findAllBoards()));
    }


    // 게시물 페이지네이션
    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Board> boards = boardService.findBoards(page -1, size);
        List<Board> content = boards.getContent();

        return new ResponseEntity(
                new MultiResponseDto(mapper.boardsToBoardsResponseDto(content),boards),HttpStatus.OK);
        // TO DO 응답 데이터에 답변 개수 추가, 좋아요(score)제거

    }

    // 게시물 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 공감 기능
    /**
     * todo 500 error ---> 200ok 해결 완료
     * data: 0일 때 true --> data: 1 (공감 처리)
     * data: 1일 때 true --> data: 0 (공감 취소)
     * @param boardId
     * @param memberId
     * @param voteCheck
     * @return
     */
    @PostMapping("/{board-id}/votes")  // {board-id}/votes?memberId={member-id}&voteCheck=true
    public ResponseEntity voteBoard(
            @PathVariable("board-id") long boardId, @Positive @RequestParam long memberId, @RequestParam boolean voteCheck) {
        Board board = boardService.voteBoard(boardId, memberId, voteCheck);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardService.getVoteCount(boardId)), HttpStatus.OK);
    }

    // todo 500 error
//    @PostMapping("/{board-id}/votes")  // /{board-id}/votes?voteCheck=true
//    public ResponseEntity setVoteCheck(
//            @PathVariable("board-id") long boardId, @RequestParam boolean voteCheck, @AuthenticationPrincipal Member member){
//        Board board = boardService.boardVote(boardId, member.getMemberId(), voteCheck);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.boardToBoardResponseDto(board)), HttpStatus.OK); // boardToBoardResponseDto OR boardToBoardGetResponseDto ?
//    }
}

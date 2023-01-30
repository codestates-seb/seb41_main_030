package com.e1i5.mentaltal.domain.member.mapper;

import com.e1i5.mentaltal.domain.board.dto.BoardMyPageResponseDto;
import com.e1i5.mentaltal.domain.board.entity.Board;
import com.e1i5.mentaltal.domain.comment.dto.CommentMyPageResponseDto;
import com.e1i5.mentaltal.domain.comment.entity.Comment;
import com.e1i5.mentaltal.domain.member.dto.MemberDto;
import com.e1i5.mentaltal.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDto(MemberDto.Post requestBody);
    Member memberPatchDto(MemberDto.Patch requestBody);
    MemberDto.Response memberResponseDto(Member member);
    List<MemberDto.Response> membersResponseDtos(List<Member> members);

    default MemberDto.myPageResponse memberToMemberGetResponseDto (Member member) {
        List<Board> boards = member.getBoards();
        List<Comment> comments = member.getComments();

        MemberDto.myPageResponse memberGetResponseDto = new MemberDto.myPageResponse();

        memberGetResponseDto.setMemberId(member.getMemberId());
        memberGetResponseDto.setNickName(member.getNickName());
        memberGetResponseDto.setEmail(member.getEmail());
        memberGetResponseDto.setBoardCount(member.getBoardCount());
        memberGetResponseDto.setCommentCount(member.getCommentCount());
        memberGetResponseDto.setBoards(
                memberToBoardResponseDtos(boards)
        );
        memberGetResponseDto.setComments(
                memberToCommentResponseDtos(comments)
        );
        return memberGetResponseDto;

    }

    default List<BoardMyPageResponseDto> memberToBoardResponseDtos(List<Board> boards) {

        return boards
                .stream()
                .map(board -> BoardMyPageResponseDto
                        .builder()
                        .boardId(board.getBoardId())
                        .memberId(board.getMember().getMemberId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .commentCount(board.getCommentCount())
                        .createdAt(board.getCreatedAt())
                        .modifiedAt(board.getModifiedAt())
                        .build()
                ).collect(Collectors.toList());
    }

    default List<CommentMyPageResponseDto> memberToCommentResponseDtos(List<Comment> comments) {

        return comments
                .stream()
                .map(comment -> CommentMyPageResponseDto
                        .builder()
                        .commentId(comment.getCommentId())
                        .boardId(comment.getBoard().getBoardId())
                        .memberId(comment.getMember().getMemberId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build()
                ).collect(Collectors.toList());
    }
}

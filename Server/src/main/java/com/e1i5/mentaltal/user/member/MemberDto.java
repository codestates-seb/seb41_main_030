package com.e1i5.mentaltal.user.member;

import com.e1i5.mentaltal.board.dto.BoardMyPageResponseDto;
import com.e1i5.mentaltal.board.dto.BoardResponseDto;
import com.e1i5.mentaltal.comment.dto.CommentMyPageResponseDto;
import com.e1i5.mentaltal.comment.dto.CommentResponseDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "닉네임을 입력하세요.")
        private String nickName;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        private String image;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotBlank(message = "닉네임을 입력하세요.")
        private String nickName;

//        @NotBlank(message = "이메일을 입력하세요.")
//        @Email
//        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        private String image;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String nickName;
        private String email;
        private String image;
        // 작성한 게시물 목록
        // 작성한 댓글 목록
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class myPageResponse {
        private long memberId;
        private String nickName;
        private String email;
        private String image;

        private Long boardCount;
        private Long commentCount;

        private List<BoardMyPageResponseDto> boards;
        private List<CommentMyPageResponseDto> comments;

    }

}

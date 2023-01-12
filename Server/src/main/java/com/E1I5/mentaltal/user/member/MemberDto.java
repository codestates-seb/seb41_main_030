package com.E1I5.mentaltal.user.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
//@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    public static class Post {
        @NotBlank(message = "닉네임을 입력하세요.")
        private String nickName;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;
    }

    public static class Patch {
        private long memberId;

        @NotBlank(message = "닉네임을 입력하세요.")
        private String nickName;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    public static class Response {
        private long memberId;
        private String nickName;
        private String email;
        // 작성한 게시물 목록
        // 작성한 댓글 목록
    }
}

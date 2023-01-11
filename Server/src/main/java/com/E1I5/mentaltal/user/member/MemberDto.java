package com.E1I5.mentaltal.user.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class MemberDto {
    public static class Post {
        @NotBlank(message = "닉네임을 입력하세요.")
        private String nick_name;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;
    }

    public static class Patch {
        private long member_id;

        @NotBlank(message = "닉네임을 입력하세요.")
        private String nick_name;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        public void setMember_id(long member_id) {
            this.member_id = member_id;
        }
    }

    public static class Response {
        private long member_id;
        private String nick_name;
        private String email;
        // 작성한 게시물 목록
        // 작성한 댓글 목록
    }
}

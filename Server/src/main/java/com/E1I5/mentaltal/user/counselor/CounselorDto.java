package com.E1I5.mentaltal.user.counselor;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class CounselorDto {
    public static class Post {
        @NotBlank(message = "이름을 입력하세요.")
        private String user_name;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        @NotBlank(message = "학력을 입력하세요.")
        private String education;

        @NotBlank(message = "경력을 입력하세요.")
        private String career;

        @NotBlank(message = "상담센터를 입력하세요.")
        private String center;
    }

    public static class Patch {
        private long counselor_id;

        @NotBlank(message = "이름을 입력하세요.")
        private String user_name;

        @NotBlank(message = "이메일을 입력하세요.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password;

        @NotBlank(message = "학력을 입력하세요.")
        private String education;

        @NotBlank(message = "경력을 입력하세요.")
        private String career;

        @NotBlank(message = "상담센터를 입력하세요.")
        private String center;

        public void setCounselor_id(long counselor_id) {
            this.counselor_id = counselor_id;
        }
    }

    public static class Response {
        private long counselor_id;
        private String user_name;
        private String email;
        // 답변 개수
    }
}

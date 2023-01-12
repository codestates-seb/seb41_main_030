package com.E1I5.mentaltal.user.counselor;

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
public class CounselorDto {
    public static class Post {
        @NotBlank(message = "이름을 입력하세요.")
        private String userName;

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
        private long counselorId;

        @NotBlank(message = "이름을 입력하세요.")
        private String userName;

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

        public void setCounselorId(long counselorId) {
            this.counselorId = counselorId;
        }
    }

    public static class Response {
        private long counselorId;
        private String userName;
        private String email;
        // 답변 개수
    }
}

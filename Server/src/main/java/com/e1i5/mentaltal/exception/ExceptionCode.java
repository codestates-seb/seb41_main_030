package com.e1i5.mentaltal.exception;

import lombok.Getter;

public enum ExceptionCode {
    FORBIDDEN(403, "Forbidden"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    BOARD_NOT_FOUND(404, "Question not found"),
    BOARD_WRITER_NOT_MATCH(409,"BOARDN WRITER NOT MATCH"),  // 게시물 삭제 시 해당 게시물의 작성자가 아닌 경우
    COMMENT_WRITER_NOT_MATCH(409,"COMMENT WRITER NOT MATCH"),   // 댓글 삭제 시 해당 댓글의 작성자가 아닌 경우
    COMMENT_NOT_FOUND(404, "Answer not found"),
    POST_UNDER_TEN(406, "Enter at least 10 characters"),
    INVALID_REFRESH_TOKEN(500, "RefreshToken is invalid."),
    INVALID_TOKEN(500,"Token is invalid.");
    //TAG_NOT_FOUND(404, "Tag not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}

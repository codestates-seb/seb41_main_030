package com.E1I5.mentaltal.exception;

import lombok.Getter;

public enum ExceptionCode {
    FORBIDDEN(403, "Forbidden"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    BOARD_NOT_FOUND(404, "Question not found"),
    COMMENT_NOT_FOUND(404, "Answer not found"),

    POST_UNDER_TEN(406, "Enter at least 10 characters");
    //TAG_NOT_FOUND(404, "Tag not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}

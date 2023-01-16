package com.e1i5.mentaltal.comment.entity;


import com.e1i5.mentaltal.board.entity.Board;
import com.e1i5.mentaltal.user.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static org.apache.catalina.security.SecurityUtil.remove;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private int score;

    private long bid;

    private long mid;

    //question:answer = 1:n
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id") // 외래키 컬럼명 즉, board 클래스의 @id가 붙은 필드명
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getComments().remove(this);
        }
        this.member = member;
        this.member.getComments().add(this);
    }

    public void addBoard(Board board) {
        if (this.board != null) {
            this.board.getComments().remove(this);
        }
        this.board = board;
        this.board.getComments().add(this);
    }
}

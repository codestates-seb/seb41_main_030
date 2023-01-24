package com.e1i5.mentaltal.board.entity;

import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.user.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Transient
    private Long mid;

    @Column(nullable = false, length = 256)
    private String title;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

    private String tags;
//    @ElementCollection
//    private List<String> tags = new ArrayList<>();

    // 게시판 : 게시판 태그 ( 1 : n)
//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
//    private List<BoardTag> tags = new ArrayList<>();

    @Column(nullable = false) // columnDefinition = "integer default 0"
    private long viewCount = 0;  // 조회수

    @Column(nullable = false)
    private long voteCount = 0;  // 공감수 (좋아요)

    private long commentCount = 0;

    @Column
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    private String nickName;

    public void addMember(Member member) {
        if ( this.member != null) {
            this.member.getBoards().remove(this);
        }
        this.member = member;
        this.member.getBoards().add(this);
    }

    public void plusCommentCount() {
        commentCount++;
    }

    public void minusCommentCount () {
        commentCount--;
    }
}

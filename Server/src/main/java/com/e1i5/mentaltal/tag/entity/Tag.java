package com.e1i5.mentaltal.tag.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    @Column
    private String tagName;
    @OneToMany(mappedBy = "tag")
    private List<BoardTag> board = new ArrayList<>();

    protected Tag() {

    }

    public Tag(final String tagName) {
        this.tagName = tagName;
    }
}

package com.e1i5.mentaltal.tag.dto;


import com.e1i5.mentaltal.tag.entity.BoardTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TagResponseDto {

    public long getTagId() {
        return tagId;
    }

    public void setTagId(long tagId) {
        this.tagId = tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    private long tagId;
    private String tagName;


    public TagResponseDto(String tagName) {
        this.tagName = tagName;
    }

    public static TagResponseDto of(final BoardTag tag) {

        return new TagResponseDto(tag.getTag().getTagName());
    }

}

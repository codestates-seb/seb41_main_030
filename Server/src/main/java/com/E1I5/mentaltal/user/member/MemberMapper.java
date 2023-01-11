package com.E1I5.mentaltal.user.member;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDto(MemberDto.Post requestBody);
    Member memberPatchDto(MemberDto.Patch requestBody);
    MemberDto.Response memberResponseDto(Member member);
}

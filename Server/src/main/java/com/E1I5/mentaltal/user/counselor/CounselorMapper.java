package com.E1I5.mentaltal.user.counselor;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CounselorMapper {
    Counselor counselorPostDto(CounselorDto.Post requestBody);
    Counselor counselorPatchDto(CounselorDto.Patch requestBody);
    CounselorDto.Response counselorResponseDto(Counselor counselor);
}

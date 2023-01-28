package com.e1i5.mentaltal.domain.counselor.mapper;

import com.e1i5.mentaltal.domain.counselor.entity.Counselor;
import com.e1i5.mentaltal.domain.counselor.dto.CounselorDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CounselorMapper {
    Counselor counselorPostDto(CounselorDto.Post requestBody);
    Counselor counselorPatchDto(CounselorDto.Patch requestBody);
    CounselorDto.Response counselorResponseDto(Counselor counselor);
    List<CounselorDto.Response> counselorsResponseDtos(List<Counselor> counselors);
}

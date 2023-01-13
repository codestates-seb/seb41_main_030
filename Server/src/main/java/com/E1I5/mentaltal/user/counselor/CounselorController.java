package com.E1I5.mentaltal.user.counselor;

import com.E1I5.mentaltal.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/counselors")
@Validated
public class CounselorController {
    private final CounselorService counselorService;
    private final CounselorMapper mapper;

    public CounselorController(CounselorService counselorService, CounselorMapper mapper) {
        this.counselorService = counselorService;
        this.mapper = mapper;
    }

    // 상담사 정보 등록
    @PostMapping
    public ResponseEntity postCounselor(@Valid @RequestBody CounselorDto.Post requestBody) {
        Counselor counselor = mapper.counselorPostDto(requestBody);
        CounselorDto.Response response = mapper.counselorResponseDto(counselorService.createCounselor(counselor));

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // 상담사 정보 수정
    @PatchMapping("/{counselor-id}")
    public ResponseEntity patchCounselor(
            @PathVariable("counselor-id") @Positive long counselorId, @Valid @RequestBody CounselorDto.Patch requestBody) {
        requestBody.setCounselorId(counselorId);

        Counselor counselor = counselorService.updateCounselor(mapper.counselorPatchDto(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.counselorResponseDto(counselor)), HttpStatus.OK);
    }

    // 특정 상담사 목록 조회
    @GetMapping("/{counselor-id}")
    public ResponseEntity getCounselor(@PathVariable("counselor-id") @Positive long counselorId) {
        Counselor counselor = counselorService.findCounselor(counselorId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.counselorResponseDto(counselor)), HttpStatus.OK);
    }

    // 전체 상담사 목록 조회
    @GetMapping
    public ResponseEntity getCounselors() { // page, size
        List<Counselor> counselors = counselorService.findCounselors();

        return new ResponseEntity<>(mapper.counselorsResponseDtos(counselors), HttpStatus.OK);
    }

    // 상담사 정보 삭제
    @DeleteMapping("/{counselor-id}")
    public ResponseEntity deleteCounselor(@PathVariable("counselor-id") @Positive long counselorId) {
        counselorService.deleteCounselor(counselorId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.E1I5.mentaltal.user.member;

import com.E1I5.mentaltal.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 회원 정보 등록
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(mapper.memberPostDto(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberResponseDto(member)), HttpStatus.CREATED);
    }

    // 회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long member_id, @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMember_id(member_id);

        Member member = memberService.updateMember(mapper.memberPatchDto(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberResponseDto(member)), HttpStatus.OK);
    }

    // 특정 회원 목록 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long member_id) {
        Member member = memberService.findMember(member_id);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberResponseDto(member)), HttpStatus.OK);
    }

    // 전체 회원 목록 조회
    @GetMapping
    public ResponseEntity getMembers() {
        List<MemberDto.Response> members = memberService.findMembers();

        return new ResponseEntity(members, HttpStatus.OK);
    }

    // 회원 정보 삭제
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

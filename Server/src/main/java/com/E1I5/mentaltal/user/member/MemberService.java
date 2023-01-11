package com.E1I5.mentaltal.user.member;

import com.E1I5.mentaltal.exception.BusinessLogicException;
import com.E1I5.mentaltal.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, MemberMapper mapper, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail()); // DB에 존재하는 이메일인지 확인

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        return memberRepository.save(member);
    }

    // Todo : 확인 필요
    public Member updateMember(Member member) {
        Member findMember = verifiedMember(member.getMember_id());

        Optional.ofNullable(member.getNick_name())
                .ifPresent(findMember::setNick_name);
        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);
        Optional.ofNullable(member.getEmail())
                .ifPresent(findMember::setEmail);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        return memberRepository.save(findMember);
    }

    public Member findMember(long member_id) {
        return verifiedMember(member_id);
    }

    public List<MemberDto.Response> findMembers() {
        List<Member> members = memberRepository.findAll();
        List<MemberDto.Response> memberResponseList = new ArrayList<>();

        for (Member member : members) {
            MemberDto.Response memberResponseDto = mapper.memberResponseDto(member);
            memberResponseList.add(memberResponseDto);
        }

        return memberResponseList;
    }

    // Todo : 확인 필요
    public void deleteMember(long member_id) {
        Member findMember = verifiedMember(member_id);
        memberRepository.delete(findMember);
    }

    private Member verifiedMember(long member_id) {
        Optional<Member> optionalMember = memberRepository.findById(member_id);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}

package com.E1I5.mentaltal.user.member;

import com.E1I5.mentaltal.exception.BusinessLogicException;
import com.E1I5.mentaltal.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail()); // DB에 존재하는 이메일인지 확인
        Member savedMember = memberRepository.save(member);

        return memberRepository.save(member);
    }

    // Todo : 확인 필요
    public Member updateMember(Member member) {
        Member findMember = verifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickName())
                .ifPresent(findMember::setNickName);
        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);
        Optional.ofNullable(member.getEmail())
                .ifPresent(findMember::setEmail);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return verifiedMember(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
//        List<Member> members = memberRepository.findAll();
//        List<MemberDto.Response> memberResponseList = new ArrayList<>();
//        return memberResponseList;

//        for (Member member : members) {
////            MemberDto.Response memberResponseDto = mapper.memberResponseDto(member);
//            memberResponseList.add(memberResponseDto);
//        }


    }

    // Todo : 확인 필요
    public void deleteMember(long memberId) {
        Member findMember = verifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    private Member verifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

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

package com.e1i5.mentaltal.user.member;

import com.e1i5.mentaltal.auth.utils.CustomAuthorityUtils;
import com.e1i5.mentaltal.board.respository.BoardRepository;
import com.e1i5.mentaltal.comment.repository.CommentRepository;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    private final BoardRepository boardRepository;

    private final CommentRepository commentRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    // 회원 정보 등록
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail()); // DB에 존재하는 이메일인지 확인

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword); //password 암호화

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles); //db에 user role 저장

        return memberRepository.save(member);
    }

    // 회원 정보 수정
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        // 추후에 Custom BeanUtils 사용
        Optional.ofNullable(member.getNickName())
                .ifPresent(findMember::setNickName);
        Optional.ofNullable(member.getEmail())
                .ifPresent(findMember::setEmail);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);
        Optional.ofNullable(member.getImage())
                .ifPresent(findMember::setImage);

        return memberRepository.save(findMember);
    }

    // 특정 회원 목록 조회
    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        findMember.setBoardCount(getBoardCount(memberId));
        findMember.setAnswerCount(getCommentCount(memberId));

        return findMember;
    }

    // 전체 회원 목록 조회
    @Transactional(readOnly = true)
    public List<Member> findMembers() { // page, size
        return memberRepository.findAll();
    }

    // 회원 정보 삭제
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
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

    @Transactional(readOnly = true)
    public Long getBoardCount(Long memberId) {
        Long boardCount = boardRepository.countBoardByMember_MemberId(memberId);
        return boardCount;
    }

    @Transactional(readOnly = true)
    public Long getCommentCount(Long memberId) {
        Long commentCount = commentRepository.countCommentByMember_MemberId(memberId);
        return commentCount;
    }

}

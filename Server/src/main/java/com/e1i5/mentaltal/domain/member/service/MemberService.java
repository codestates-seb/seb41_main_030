package com.e1i5.mentaltal.domain.member.service;

import com.e1i5.mentaltal.auth.jwt.JwtTokenizer;
import com.e1i5.mentaltal.auth.utils.CustomAuthorityUtils;
import com.e1i5.mentaltal.auth.utils.RedisUtils;
import com.e1i5.mentaltal.domain.board.respository.BoardRepository;
import com.e1i5.mentaltal.domain.comment.repository.CommentRepository;
import com.e1i5.mentaltal.domain.member.entity.Member;
import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import com.e1i5.mentaltal.domain.member.repository.MemberRepository;
import com.e1i5.mentaltal.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomBeanUtils<Member> beanUtils;
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtils redisUtils;

    // 회원 정보 등록
    @Transactional
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
        Member updatingMember = beanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatingMember);
    }

    // 특정 회원 목록 조회
    public Member findMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        findMember.setBoardCount(getBoardCount(memberId));
        findMember.setCommentCount(getCommentCount(memberId));

        return findMember;
    }

    // 전체 회원 목록 조회
    public List<Member> findMembers() { // page, size
        return memberRepository.findAll();
    }

    // 회원 정보 삭제
    @Transactional
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

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

    public Long getBoardCount(Long memberId) {
        Long boardCount = boardRepository.countBoardByMember_MemberId(memberId);
        return boardCount;
    }

    public Long getCommentCount(Long memberId) {
        Long commentCount = commentRepository.countCommentByMember_MemberId(memberId);
        return commentCount;
    }

    @Transactional
    public void logout(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.split(" ")[1];

        String ATKemail = jwtTokenizer.getATKemail(accessToken);
        redisUtils.deleteData(ATKemail);

        Long expiration = jwtTokenizer.getATKExpiration(accessToken);
        redisUtils.setData(accessToken, "blackList", expiration);
    }
}

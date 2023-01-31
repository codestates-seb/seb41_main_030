package com.e1i5.mentaltal.domain.counselor.service;

import com.e1i5.mentaltal.exception.BusinessLogicException;
import com.e1i5.mentaltal.exception.ExceptionCode;
import com.e1i5.mentaltal.domain.counselor.entity.Counselor;
import com.e1i5.mentaltal.domain.counselor.repository.CounselorRepository;
import com.e1i5.mentaltal.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CounselorService {
    private final CounselorRepository counselorRepository;
    private final CustomBeanUtils<Counselor> beanUtils;

//    public CounselorService(CounselorRepository counselorRepository) {
//        this.counselorRepository = counselorRepository;
//    }

    // 상담사 정보 등록
    public Counselor createCounselor(Counselor counselor) {
        verifyExistsEmail(counselor.getEmail()); // DB에 존재하는 이메일인지 확인

        return counselorRepository.save(counselor);
    }

    // 상담사 정보 수정
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Counselor updateCounselor(Counselor counselor) {
        Counselor findCounselor = findVerifiedCounselor(counselor.getCounselorId());

        // 추후에 Custom BeanUtils 사용
//        Optional.ofNullable(counselor.getUserName())
//                .ifPresent(findCounselor::setUserName);
//        Optional.ofNullable(counselor.getEmail())
//                .ifPresent(findCounselor::setEmail);
//        Optional.ofNullable(counselor.getPassword())
//                .ifPresent(findCounselor::setPassword);
//        Optional.ofNullable(counselor.getEducation())
//                .ifPresent(findCounselor::setEducation);
//        Optional.ofNullable(counselor.getCareer())
//                .ifPresent(findCounselor::setCareer);
//        Optional.ofNullable(counselor.getImage())
//                .ifPresent(findCounselor::setImage);

        Counselor updatingCounselor = beanUtils.copyNonNullProperties(counselor, findCounselor);

        return counselorRepository.save(updatingCounselor);
    }

    // 특정 상담사 목록 조회
    @Transactional(readOnly = true)
    public Counselor findCounselor(long counselorId) {
        return findVerifiedCounselor(counselorId);
    }

    // 전체 상담사 목록 조회
    @Transactional(readOnly = true)
    public List<Counselor> findCounselors() { // page, size
        return counselorRepository.findAll();
    }

    // 상담사 정보 삭제
    public void deleteCounselor(long counselorId) {
        Counselor counselor = findVerifiedCounselor(counselorId);

        counselorRepository.delete(counselor);
    }

    @Transactional(readOnly = true)
    public Counselor findVerifiedCounselor(long counselorId) {
        Optional<Counselor> optionalCounselor = counselorRepository.findById(counselorId);

        return optionalCounselor.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Counselor> counselor = counselorRepository.findByEmail(email);

        if (counselor.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}

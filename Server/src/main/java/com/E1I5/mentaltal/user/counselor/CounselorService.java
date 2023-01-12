package com.E1I5.mentaltal.user.counselor;

import com.E1I5.mentaltal.exception.BusinessLogicException;
import com.E1I5.mentaltal.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CounselorService {
    private final CounselorRepository counselorRepository;

    public CounselorService(CounselorRepository counselorRepository) { // CounselorMapper mapper, PasswordEncoder passwordEncoder
        this.counselorRepository = counselorRepository;
    }

    public Counselor createCounselor(Counselor counselor) {
        verifyExistsEmail(counselor.getEmail()); // DB에 존재하는 이메일인지 확인

        return counselorRepository.save(counselor);
    }

    // Todo : 확인 필요
    public Counselor updateCounselor(Counselor counselor) {
        Counselor findCounselor = verifiedCounselor(counselor.getCounselorId());

        Optional.ofNullable(counselor.getUserName())
                .ifPresent(findCounselor::setUserName);
        Optional.ofNullable(counselor.getEmail())
                .ifPresent(findCounselor::setEmail);
        Optional.ofNullable(counselor.getPassword())
                .ifPresent(findCounselor::setPassword);
        Optional.ofNullable(counselor.getEducation())
                .ifPresent(findCounselor::setEducation);
        Optional.ofNullable(counselor.getCareer())
                .ifPresent(findCounselor::setCareer);
        Optional.ofNullable(counselor.getImage())
                .ifPresent(findCounselor::setImage);

        return counselorRepository.save(findCounselor);
    }

    public Counselor findCounselor(long counselorId) {
        return verifiedCounselor(counselorId);
    }

    public List<Counselor> findCounselors() { // CounselorDto.Response
        return counselorRepository.findAll();
//        List<Counselor> counselors = counselorRepository.findAll();
//        List<CounselorDto.Response> counselorResponseList = new ArrayList<>();
//        return counselorResponseList;

//        for (Counselor counselor : counselors) {
//            CounselorDto.Response counselorResponseDto = mapper.counselorResponseDto(counselor);
//            counselorResponseList.add(counselorResponseDto);
//        }


    }

    // Todo : 확인 필요
    public void deleteCounselor(long counselorId) {
        Counselor findCounselor = verifiedCounselor(counselorId);
        counselorRepository.delete(findCounselor);
    }

    private Counselor verifiedCounselor(long counselorId) {
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

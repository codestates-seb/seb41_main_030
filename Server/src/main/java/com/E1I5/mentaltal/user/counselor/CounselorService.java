package com.E1I5.mentaltal.user.counselor;

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
public class CounselorService {
    private final CounselorRepository counselorRepository;
    private final CounselorMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public CounselorService(CounselorRepository counselorRepository, CounselorMapper mapper, PasswordEncoder passwordEncoder) {
        this.counselorRepository = counselorRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    public Counselor createCounselor(Counselor counselor) {
        verifyExistsEmail(counselor.getEmail()); // DB에 존재하는 이메일인지 확인

        String encryptedPassword = passwordEncoder.encode(counselor.getPassword());
        counselor.setPassword(encryptedPassword);

        return counselorRepository.save(counselor);
    }

    // Todo : 확인 필요
    public Counselor updateCounselor(Counselor counselor) {
        Counselor findCounselor = verifiedCounselor(counselor.getCounselor_id());

        Optional.ofNullable(counselor.getUser_name())
                .ifPresent(findCounselor::setUser_name);
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

    public Counselor findCounselor(long counselor_id) {
        return verifiedCounselor(counselor_id);
    }

    public List<CounselorDto.Response> findCounselors() {
        List<Counselor> counselors = counselorRepository.findAll();
        List<CounselorDto.Response> counselorResponseList = new ArrayList<>();

        for (Counselor counselor : counselors) {
            CounselorDto.Response counselorResponseDto = mapper.counselorResponseDto(counselor);
            counselorResponseList.add(counselorResponseDto);
        }

        return counselorResponseList;
    }

    // Todo : 확인 필요
    public void deleteCounselor(long counselor_id) {
        Counselor findCounselor = verifiedCounselor(counselor_id);
        counselorRepository.delete(findCounselor);
    }

    private Counselor verifiedCounselor(long counselor_id) {
        Optional<Counselor> optionalCounselor = counselorRepository.findById(counselor_id);

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

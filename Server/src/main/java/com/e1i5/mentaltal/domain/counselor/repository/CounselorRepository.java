package com.e1i5.mentaltal.domain.counselor.repository;

import com.e1i5.mentaltal.domain.counselor.entity.Counselor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {
    Optional<Counselor> findByEmail(String email);
}

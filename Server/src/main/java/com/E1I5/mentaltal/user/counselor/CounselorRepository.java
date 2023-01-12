package com.E1I5.mentaltal.user.counselor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {
    Optional<Counselor> findByEmail(String email);

}

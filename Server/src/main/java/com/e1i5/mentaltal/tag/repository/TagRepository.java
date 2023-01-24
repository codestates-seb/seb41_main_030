package com.e1i5.mentaltal.tag.repository;

import com.e1i5.mentaltal.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}

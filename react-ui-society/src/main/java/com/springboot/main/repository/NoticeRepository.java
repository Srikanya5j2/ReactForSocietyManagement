
package com.springboot.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
	Optional<Notice> findById(Long id);
}

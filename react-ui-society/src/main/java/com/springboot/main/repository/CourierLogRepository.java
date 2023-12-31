package com.springboot.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.CourierLog;

public interface CourierLogRepository extends JpaRepository<CourierLog, Integer> {

	List<CourierLog> findByResidentId(int residentId);

}
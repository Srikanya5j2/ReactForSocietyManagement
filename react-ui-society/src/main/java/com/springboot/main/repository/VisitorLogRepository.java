
package com.springboot.main.repository;

import java.time.LocalTime;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.VisitorLog;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, Integer> {

	List<VisitorLog> findByResidentId(int residentId);

	//List<VisitorLog> findByResidentId(int residentId);

	

	//List<VisitorLog> findListOfVisitorsByIdandDate(int residentId, LocalTime visitdate);
}

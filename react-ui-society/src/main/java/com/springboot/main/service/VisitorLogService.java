
package com.springboot.main.service;

import java.time.LocalTime;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.VisitorLog;
import com.springboot.main.repository.VisitorLogRepository;

@Service
public class VisitorLogService {
	@Autowired
	private VisitorLogRepository visitorLogRepository;

	public VisitorLog addVisitorLog(VisitorLog visitorLog) {
		// TODO Auto-generated method stub
		return visitorLogRepository.save(visitorLog);
	}

	public VisitorLog insert(VisitorLog newVisitorLog) {
		// TODO Auto-generated method stub
		return visitorLogRepository.save(newVisitorLog);
	}

	public VisitorLog getOne(int visitorLogId) {
		// Use Spring Data JPA's findById method to get a VisitorLog by its ID
		Optional<VisitorLog> optionalVisitorLog = visitorLogRepository.findById(visitorLogId);

		// Return the VisitorLog if present, or null if not found
		return optionalVisitorLog.orElse(null);
	}

	public VisitorLog update(VisitorLog visitorLog) {
		// Use Spring Data JPA's save method to update the VisitorLog
		return visitorLogRepository.save(visitorLog);
	}

	public List<VisitorLog> getVisitorLogByResident(int residentId) {

		return visitorLogRepository.findByResidentId(residentId);
	}

	public List<VisitorLog> getAllVisitorLogs() {
		// TODO Auto-generated method stub
		return visitorLogRepository.findAll();
	}

/*	public List<VisitorLog> getListOfVisitorsByIdandDate(int residentId, LocalTime visitdate) {
		// TODO Auto-generated method stub
		return visitorLogRepository.findListOfVisitorsByIdandDate(residentId,visitdate);
	}*/

}

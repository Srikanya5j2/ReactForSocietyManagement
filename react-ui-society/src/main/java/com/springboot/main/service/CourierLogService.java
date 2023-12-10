package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.CourierLog;
import com.springboot.main.model.VisitorLog;
import com.springboot.main.repository.CourierLogRepository;

@Service
public class CourierLogService {
	@Autowired
	private CourierLogRepository courierLogRepository;

	public CourierLog addCourier(CourierLog courierLog) {
		// TODO Auto-generated method stub
		return courierLogRepository.save(courierLog);
	}

	public CourierLog insert(CourierLog courierLog) {
		// TODO Auto-generated method stub
		return courierLogRepository.save(courierLog);
	}

	public CourierLog getOne(int courierLogId) {
		// TODO Auto-generated method stub
		Optional<CourierLog> optionalCourierLog = courierLogRepository.findById(courierLogId);

		// Return the VisitorLog if present, or null if not found
		return optionalCourierLog.orElse(null);
	}

	public CourierLog update(CourierLog existingCourierLog) {
		// TODO Auto-generated method stub
		return courierLogRepository.save(existingCourierLog);
	}

	public List<CourierLog> getCourierLogByResident(int residentId) {
		// TODO Auto-generated method stub
		return courierLogRepository.findByResidentId(residentId);
	}

	public List<CourierLog> getAllCourierLogs() {
		// TODO Auto-generated method stub
		return courierLogRepository.findAll();
	}

}

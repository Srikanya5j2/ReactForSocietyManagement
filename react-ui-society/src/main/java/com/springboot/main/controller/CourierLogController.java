package com.springboot.main.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.CourierLog;
import com.springboot.main.model.Gatekeeper;
import com.springboot.main.model.Resident;
import com.springboot.main.service.CourierLogService;
import com.springboot.main.service.GatekeeperService;
import com.springboot.main.service.ResidentService;

@Controller
@RequestMapping("/courierlogs")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CourierLogController {

	@Autowired
	private CourierLogService courierLogService;
	@Autowired
	private GatekeeperService gatekeeperService;
	@Autowired
	private ResidentService residentService;

	@PostMapping("/addcourierlog/{residentId}/{gatekeeperId}")
	
	public ResponseEntity<?> addCourierLog(@RequestBody CourierLog courierLog,
			@PathVariable("gatekeeperId") int gatekeeperId, @PathVariable("residentId") int residentId) {
		try {
			/* Fetch gatekeeper and resident objects from the database using IDs */
			Gatekeeper gatekeeper = gatekeeperService.getOne(gatekeeperId);
			courierLog.setGateKeeper(gatekeeper);
			Resident resident = residentService.getOne(residentId);
			courierLog.setResident(resident);
			courierLog = courierLogService.insert(courierLog);
			return ResponseEntity.ok().body(courierLog);
		} catch (InvalidIdException e) {

			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/addcourier/{residentId}")
	public ResponseEntity<?> addCourierLogByResident(@RequestBody CourierLog courierLog,
			@PathVariable("residentId") int residentId) {
		try {
			/* Fetch resident object from the database using ID */
			Resident resident = residentService.getOne(residentId);
			courierLog.setResident(resident);
			courierLog = courierLogService.insert(courierLog);
			return ResponseEntity.ok().body(courierLog);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/getallCouriers/{residentId}")
	public ResponseEntity<?> getCourierLogByResident(@PathVariable("residentId") int residentId) {
		try {
			Resident resident = residentService.getOne(residentId);
			List<CourierLog> list = courierLogService.getCourierLogByResident(residentId);
			return ResponseEntity.ok().body(list);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}

	@PostMapping("/entry")
	public ResponseEntity<?> logCourierEntryTime(@RequestBody CourierLog courierLog) {
		try {
			// Create a new CourierLog with only the provided entry time
			CourierLog newCourierLog = new CourierLog();
			newCourierLog.setEntryTime(courierLog.getEntryTime());

			// Save the new CourierLog with only entry time
			newCourierLog = courierLogService.insert(newCourierLog);

			return ResponseEntity.ok().body(newCourierLog);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping("/exit/{courierLogId}")
	public ResponseEntity<?> updateCourierExitTime(@PathVariable("courierLogId") int courierLogId,
			@RequestBody CourierLog updatedCourierLog) {
		try {
			// Fetch the existing CourierLog from the database
			CourierLog existingCourierLog = courierLogService.getOne(courierLogId);

			if (existingCourierLog != null) {
				// Update the exit time with the new value
				existingCourierLog.setExitTime(updatedCourierLog.getExitTime());

				// Save the updated CourierLog
				existingCourierLog = courierLogService.update(existingCourierLog);

				return ResponseEntity.ok().body(existingCourierLog);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	@GetMapping("/all")
	public ResponseEntity<List<CourierLog>> getAllCourierLogs() {
	    try {
	        List<CourierLog> courierLogs = courierLogService.getAllCourierLogs();
	        return ResponseEntity.ok().body(courierLogs);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().build();
	    }
	}

}

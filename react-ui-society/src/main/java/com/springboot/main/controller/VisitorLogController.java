package com.springboot.main.controller;

import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Gatekeeper;
import com.springboot.main.model.Resident;
import com.springboot.main.model.VisitorLog;
import com.springboot.main.service.GatekeeperService;
import com.springboot.main.service.ResidentService;
import com.springboot.main.service.VisitorLogService;

@RestController
@RequestMapping("/visitorLogs")
@CrossOrigin(origins = {"http://localhost:3000"})
public class VisitorLogController {
	@Autowired
	private VisitorLogService visitorLogService;
	@Autowired
	private ResidentService residentService;
	@Autowired
	private GatekeeperService gatekeeperService;

	@PostMapping("/addVisitorLog/{residentId}/{gatekeeperId}")
	public ResponseEntity<?> addVisitorLog(@RequestBody VisitorLog visitorLog,
			@PathVariable("residentId") int residentId, @PathVariable("gatekeeperId") int gatekeeperId) {
		try {
			Resident resident = residentService.getOne(residentId);
			visitorLog.setResident(resident);

			Gatekeeper gatekeeper = gatekeeperService.getOne(gatekeeperId);
			visitorLog.setGatekeeper(gatekeeper);
			visitorLog = visitorLogService.addVisitorLog(visitorLog);
			return ResponseEntity.ok().body(visitorLog);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@PostMapping("/entry")
	public ResponseEntity<?> addVisitorEntryTime(@RequestBody VisitorLog visitorLog) {
		// Create a new VisitorLog with only the provided entry time
		VisitorLog newVisitorLog = new VisitorLog();
		newVisitorLog.setEntryTime(visitorLog.getEntryTime());

		// Save the new VisitorLog with only entry time
		try {
			newVisitorLog = visitorLogService.insert(newVisitorLog);
			return ResponseEntity.ok().body(newVisitorLog);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/getallVisitors/{residentId}")
	public ResponseEntity<?> getVisitorLogByResident(@PathVariable("residentId") int residentId) {
		try {
			Resident resident = residentService.getOne(residentId);
			List<VisitorLog> list = visitorLogService.getVisitorLogByResident(residentId);
			return ResponseEntity.ok().body(list);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}

	@PutMapping("/exit/{visitorLogId}")
	public ResponseEntity<?> updateExitTime(@PathVariable("visitorLogId") int visitorLogId,
			@RequestBody VisitorLog VisitorLog) {
		try {
			// Fetch the existing VisitorLog from the database
			VisitorLog existingVisitorLog = visitorLogService.getOne(visitorLogId);

			if (existingVisitorLog != null) {
				// Update the exit time with the new value
				existingVisitorLog.setExitTime(VisitorLog.getExitTime());

				// Save the updated VisitorLog
				existingVisitorLog = visitorLogService.update(existingVisitorLog);

				return ResponseEntity.ok().body(existingVisitorLog);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
/*	//display the list of visitors that have been approved by particular resident on 
		//a given date Take resident id and date as path variable
		@GetMapping("/listofVisitors/{residentId}/{visitdate}")
		
			
				public ResponseEntity<?> getListOfVisitors(@PathVariable("Id") int Id,
						@PathVariable("visitdate") LocalTime visitdate){
					try {
					Resident resident=residentService.getOne(Id);
					List<VisitorLog> visitorLog = visitorLogService.getListOfVisitorsByIdandDate(Id,visitdate);
					return ResponseEntity.ok().body(visitorLog);
				}catch(InvalidIdException e)
					{
					return ResponseEntity.badRequest().body(e.getMessage());
			}
		}*/
	@GetMapping("/allVisitorLogs")
	public ResponseEntity<List<VisitorLog>> getAllVisitorLogs() {
	    try {
	        List<VisitorLog> allVisitorLogs = visitorLogService.getAllVisitorLogs();
	        return ResponseEntity.ok().body(allVisitorLogs);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(Collections.emptyList());
	    }
	}

}

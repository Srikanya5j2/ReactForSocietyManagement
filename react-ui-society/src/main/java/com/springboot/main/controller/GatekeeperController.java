package com.springboot.main.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.springboot.main.model.User;
import com.springboot.main.model.VisitorLog;
import com.springboot.main.service.GatekeeperService;
import com.springboot.main.service.ResidentService;
import com.springboot.main.service.UserService;
import com.springboot.main.service.VisitorLogService;

@RestController
@RequestMapping("/gatekeeper")
@CrossOrigin(origins = {"http://localhost:3000"})
public class GatekeeperController {

	@Autowired
	private GatekeeperService gatekeeperService;
	@Autowired
	private UserService userService;
	@Autowired
	private ResidentService residentService;
	@Autowired
	private VisitorLogService visitorLogService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/addGatekeeper")
	public Gatekeeper insert(@RequestBody Gatekeeper gatekeeper) {
		/* save user with id */
		User user = gatekeeper.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		/* set role as gatekeeper */
		user.setRole("GATEKEEPER");
		/* Update the Gatekeeper object */
		gatekeeper.setUser(user);
		/* save gatekeeper as user in table */
		user = userService.insert(user);
		/* Save the modified Gatekeeper object to the database */
		return gatekeeperService.insert(gatekeeper);
	}

	@PostMapping("/addVisitor/{gatekeeperId}/{residentId}")
	public ResponseEntity<?> addVisitorLog(@RequestBody VisitorLog visitorLog,
			@PathVariable("gatekeeperId") int gatekeeperId, @PathVariable("residentId") int residentId) {
		try {
			Gatekeeper gatekeeper = gatekeeperService.getOne(gatekeeperId);
			visitorLog.setGateKeeper(gatekeeper);
			Resident resident = residentService.getOne(residentId);
			visitorLog.setResident(resident);
			visitorLog = visitorLogService.insert(visitorLog);
			return ResponseEntity.ok().body(visitorLog);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/getgatekeeper/{gatekeeperId}")
	public ResponseEntity<?> getOne(@PathVariable ("gatekeeperId") int gatekeeperId ){
		try {
		Gatekeeper gatekeeper=gatekeeperService.getOne(gatekeeperId);
		return ResponseEntity.ok().body(gatekeeper);
	}catch(InvalidIdException e) {
		return ResponseEntity.badRequest().body(e.getMessage());
	}
}
	@DeleteMapping("/deletegatekeeper/{id}")
	public ResponseEntity<?> deleteGatekeeper(@PathVariable("id") int id){
		try {
			Gatekeeper gatekeeper=gatekeeperService.getOne(id);
			gatekeeperService.deleteGatekeeper(gatekeeper);
			return ResponseEntity.ok().body("gatekeeper deleted sucessfully");
			
		}catch(InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	@PutMapping("/update/{gatekeeperId}")
	public ResponseEntity<?> updateGatekeeper(@RequestBody Gatekeeper gatekeeper,@PathVariable("id") int id) throws InvalidIdException{
		gatekeeper.setId(id);
		Gatekeeper updategatekeeper=gatekeeperService.updateGatekeeper(id,gatekeeper);
		return ResponseEntity.ok().body(updategatekeeper);
	}
	@GetMapping("/all")
	public ResponseEntity<List<Gatekeeper>> getAllGatekeepers() {
	    try {
	        List<Gatekeeper> allGatekeepers = gatekeeperService.getAllGatekeepers();
	        return ResponseEntity.ok().body(allGatekeepers);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(Collections.emptyList());
	    }
	}

}
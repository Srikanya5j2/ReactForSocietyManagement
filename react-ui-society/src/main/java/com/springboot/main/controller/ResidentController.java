package com.springboot.main.controller;

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
import com.springboot.main.model.Resident;
import com.springboot.main.model.User;
import com.springboot.main.service.ResidentService;
import com.springboot.main.service.UserService;

@RestController
@RequestMapping("/resident")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ResidentController {

	@Autowired
	private UserService userService;

	@Autowired
	private ResidentService residentService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	/* Add residents in signup screen */
	@PostMapping("/add")
	public Resident insert(@RequestBody Resident resident) {
		User user = resident.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		/* Set the role of the user to resident */
		user.setRole("RESIDENT");
		/* Save theUser to the database*/
		user = userService.insert(user);
		/* Update the Resident */
		resident.setUser(user);	
		/* Save the modified Resident*/
		resident = residentService.insert(resident);
		return resident;
	}

	/* get one resident by id */
	@GetMapping("/getone/{id}")
	public ResponseEntity<?> getOne(@PathVariable("id") int id) {

		try {
			Resident resident = residentService.getOne(id);
			return ResponseEntity.ok().body(resident);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	/* delete resident by id */
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteResident(@PathVariable("id") int id) {

		try {
			Resident resident = residentService.getOne(id);
			residentService.deleteResident(resident);
			return ResponseEntity.ok().body("resident deleted successfully");
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	/* update profile of resident */
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateResident(@PathVariable("id") int id, @RequestBody Resident resident) {
		try {
			resident.setId(id); // Set the ID from the path variable to the resident object
			Resident updatedResident = residentService.updateResident(id, resident); // Pass the ID to the service
																						// method
			return ResponseEntity.ok().body(updatedResident);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	@GetMapping("/all")
	public ResponseEntity<?> getAllResidents() {
	    try {
	        List<Resident> residents = residentService.getAllResidents();
	        return ResponseEntity.ok().body(residents);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Failed to retrieve all residents");
	    }
	}
	@GetMapping("/getResidentIdByUserId/{userId}")
    public ResponseEntity<?> getResidentIdByUserId(@PathVariable("userId") int userId) {
        int residentId = residentService.getResidentIdByUserId(userId);
		return ResponseEntity.ok().body(residentId);
    }
}

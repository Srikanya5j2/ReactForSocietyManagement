package com.springboot.main.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.model.Admin;
import com.springboot.main.model.Gatekeeper;
import com.springboot.main.model.Resident;
import com.springboot.main.model.User;
import com.springboot.main.service.AdminService;
import com.springboot.main.service.GatekeeperService;
import com.springboot.main.service.ResidentService;
import com.springboot.main.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3000"})
/*
 * This controller is responsible for handling requests related to
 * administrative tasks, specifically adding new users with different roles
 * (admin, resident, gatekeeper)
 */
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private UserService userService;
	@Autowired
	private ResidentService residentService;
	@Autowired
	private GatekeeperService gatekeeperService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@PostMapping("/addResident")
	public Resident insert(@RequestBody Resident resident) {
		/* save user with id */
		User user = resident.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		
		/* set role as resident */
		user.setRole("RESIDENT");
		/* Update the user object */
		resident.setUser(user);
		/* save resident as user in table */
		user = userService.insert(user);
		/* Save the modified user object to the database */
		return residentService.insert(resident);
	}

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

	@PostMapping("/addAdmin")
	public Admin insert(@RequestBody Admin admin) {
		// Save user with id
		User user = admin.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		// Set role as Administrator
		user.setRole("ADMIN");
		// Update the Administrator object with the modified User object
		admin.setUser(user);
		// Save user object.
		user = userService.insert(user);
		// Save modified Administrator object to the database and show output
		return adminService.insert(admin);
	}
	
	 @GetMapping("/allAdmins")
	    public ResponseEntity<List<Admin>> getAllAdmins() {
	        List<Admin> allAdmins = adminService.getAllAdmins();
	        return ResponseEntity.ok().body(allAdmins);
	    }
}
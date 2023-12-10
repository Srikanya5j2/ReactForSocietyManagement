package com.springboot.main.controller;

import java.security.Principal;






import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import com.springboot.main.model.User;

import com.springboot.main.service.UserService;



@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

	/*
	 * If username/password given are correct, them spring will call this api
	 * method. so we need to request spring to tell us the username of the logged in
	 * user. We use Principal interface for reading loggedin username value.
	 */

	@Autowired
	private UserService userService;
	

	@PostMapping("/user/login")
	public User login(Principal principal) {
		String username = principal.getName();
		User user = userService.getUserByUserName(username);
	
		return user;
	}
	
}

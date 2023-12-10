package com.springboot.main.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.main.model.Resident;

public interface ResidentRepository extends JpaRepository<Resident, Integer> {

	
	
	   

		Optional<Resident> findByUserId(int userId);
	}
	

	



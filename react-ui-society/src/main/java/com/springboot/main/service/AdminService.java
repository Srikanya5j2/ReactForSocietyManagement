
package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.springboot.main.model.Admin;
import com.springboot.main.repository.AdminRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;

	public Admin insert(Admin admin) {
		return adminRepository.save(admin);
	}

	public Admin getOne(int id) {
		Optional<Admin> adminOptional = adminRepository.findById(id);
		if (!adminOptional.isPresent()) {
			throw new RuntimeException("Error");
		}
		return adminOptional.get();
	}

	public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

}
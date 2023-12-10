
package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.HomeService;
import com.springboot.main.repository.HomeServiceRepository;

@Service
public class HomeServiceService {
	@Autowired
	private HomeServiceRepository homeServiceRepository;

	public HomeService insert(HomeService homeService) {
		return homeServiceRepository.save(homeService);
	}

	public HomeService postHomeService(HomeService homeService) {
		return homeServiceRepository.save(homeService);
	}
}

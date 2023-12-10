package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.HelpDesk;
import com.springboot.main.repository.HelpDeskRepository;

@Service
public class HelpDeskService {
	@Autowired
	private HelpDeskRepository helpDeskRepository;

	public List<HelpDesk> getAllTickets() {
		return helpDeskRepository.findAll();
	}

	public HelpDesk getOne(int ticketId) throws InvalidIdException {
		Optional<HelpDesk> helpDeskOptional = helpDeskRepository.findById(ticketId);
		if (helpDeskOptional.isPresent()) {
			return helpDeskOptional.get();
		} else {
			throw new InvalidIdException("Ticket not found");
		}
	}

	public HelpDesk postHelpDesk(HelpDesk helpDesk) {
		return helpDeskRepository.save(helpDesk);
	}

	

	
	public List<HelpDesk> getTicketsByResidentId(int residentId) {
		// TODO Auto-generated method stub
		return helpDeskRepository.findByResidentId(residentId);
	}
}
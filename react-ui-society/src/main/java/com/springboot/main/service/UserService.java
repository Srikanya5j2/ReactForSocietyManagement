package com.springboot.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Resident;
import com.springboot.main.model.User;
import com.springboot.main.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	public User insert(User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	public User getUserByUserName(String username) {

		return userRepository.findByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		return userRepository.findByUsername(username);
	}

	public User getOne(int Id) throws InvalidIdException {
		// TODO Auto-generated method stub
		Optional<User> optional = userRepository.findById(Id);
		if (!optional.isPresent()) {
			throw new InvalidIdException("user Id Invalid");
		}
		return optional.get();
	}


	public User UpdateUSer(int id, User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		 return userRepository.findAll();
	}

	 public void deleteUser(int id) throws InvalidIdException {
	        Optional<User> userOptional = userRepository.findById(id);
	        if (userOptional.isPresent()) {
	            userRepository.deleteById(id);
	        } else {
	            throw new InvalidIdException("User not found with ID: " + id);
	        }
	    }

	
}

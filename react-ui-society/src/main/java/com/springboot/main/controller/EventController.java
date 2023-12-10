package com.springboot.main.controller;

import java.util.List;

import java.util.Optional;

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

import com.springboot.main.model.Event;
import com.springboot.main.service.EventService;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = {"http://localhost:3000"})
public class EventController {
	@Autowired
	private EventService eventService;

	/* Add events */
	@PostMapping("/addEvents")
	public Event insertEvents(@RequestBody Event event) {
		return eventService.insert(event);
	}

	/* Get all events */
	@GetMapping("/getallEvents")
	public List<Event> getAllEvents() {
		return eventService.getAllEvents();
	}

	/* Update Events by id */
	@PutMapping("/updateEvents/{id}")
	public ResponseEntity<?> updateEvent(@PathVariable int id, @RequestBody Event updatedEvent) {
		try {
			Optional<Event> optionalEvent = eventService.findById(id);

			if (optionalEvent.isPresent()) {
				Event existingEvent = optionalEvent.get();

				if (updatedEvent.getContent() != null) {
					existingEvent.setContent(updatedEvent.getContent());
				}
				if (updatedEvent.getDate() != null) {
					existingEvent.setDate(updatedEvent.getDate());
				}
				if (updatedEvent.getLocation() != null) {
					existingEvent.setLocation(updatedEvent.getLocation());
				}
				

				// Save the updated event
				Event updatedEventEntity = eventService.insert(existingEvent);

				return ResponseEntity.ok().body(updatedEventEntity);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}

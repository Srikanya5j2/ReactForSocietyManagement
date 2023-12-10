package com.springboot.main.model;

import java.time.LocalTime;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class VisitorLog {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String visitorName;
	
	private LocalTime entryTime;
	private LocalTime exitTime;
	private String visitorContact;
	
	   // private LocalTime visitdate;

	@ManyToOne
	private Gatekeeper gatekeeper;
	@ManyToOne
	private Resident resident;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalTime getEntryTime() {
		return entryTime;
	}

	public void setEntryTime(LocalTime entryTime) {
		this.entryTime = entryTime;
	}

	public LocalTime getExitTime() {
		return exitTime;
	}

	public void setExitTime(LocalTime exitTime) {
		this.exitTime = exitTime;
	}

	public String getVisitorContact() {
		return visitorContact;
	}

	public void setVisitorContact(String visitorContact) {
		this.visitorContact = visitorContact;
	}

	public void setGatekeeper(Gatekeeper gatekeeper) {
		this.gatekeeper = gatekeeper;
	}

	public Gatekeeper getGatekeeper() {
		return gatekeeper;
	}

	public void setGateKeeper(Gatekeeper gatekeeper) {
		this.gatekeeper = gatekeeper;
	}

	public Resident getResident() {
		return resident;
	}

	public void setResident(Resident resident) {
		this.resident = resident;
	}

	public String getVisitorName() {
		return visitorName;
	}

	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}

	


	
}
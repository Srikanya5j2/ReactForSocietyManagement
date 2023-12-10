
package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Gatekeeper;

public interface GatekeeperRepository extends JpaRepository<Gatekeeper, Integer> {
}
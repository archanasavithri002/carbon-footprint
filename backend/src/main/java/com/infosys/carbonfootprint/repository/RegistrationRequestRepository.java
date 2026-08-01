package com.infosys.carbonfootprint.repository;

import com.infosys.carbonfootprint.entity.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Long> {
}

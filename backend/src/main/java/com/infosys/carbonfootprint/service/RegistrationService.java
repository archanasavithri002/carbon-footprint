package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.dto.RegistrationRequestDTO;
import com.infosys.carbonfootprint.entity.RegistrationRequest;

import java.util.List;

public interface RegistrationService {
    RegistrationRequest submit(RegistrationRequestDTO dto);
    List<RegistrationRequest> getPendingRequests();
    RegistrationRequest approve(Long id);
    RegistrationRequest reject(Long id, String reason);
}

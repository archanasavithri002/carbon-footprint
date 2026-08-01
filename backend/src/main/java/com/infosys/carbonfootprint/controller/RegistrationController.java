package com.infosys.carbonfootprint.controller;

import com.infosys.carbonfootprint.dto.RegistrationRequestDTO;
import com.infosys.carbonfootprint.entity.RegistrationRequest;
import com.infosys.carbonfootprint.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody RegistrationRequestDTO dto) {
        RegistrationRequest req = registrationService.submit(dto);
        return ResponseEntity.ok(req);
    }
}

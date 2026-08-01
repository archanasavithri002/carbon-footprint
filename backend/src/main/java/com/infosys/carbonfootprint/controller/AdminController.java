package com.infosys.carbonfootprint.controller;

import com.infosys.carbonfootprint.entity.RegistrationRequest;
import com.infosys.carbonfootprint.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/registrations/pending")
    public ResponseEntity<?> pending() {
        List<RegistrationRequest> list = registrationService.getPendingRequests();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/registrations/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        RegistrationRequest req = registrationService.approve(id);
        return ResponseEntity.ok(req);
    }

    @PostMapping("/registrations/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, @RequestParam(required = false) String reason) {
        RegistrationRequest req = registrationService.reject(id, reason);
        return ResponseEntity.ok(req);
    }
}

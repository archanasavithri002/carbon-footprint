package com.infosys.carbonfootprint.controller;

import com.infosys.carbonfootprint.dto.ActivityLogRequestDTO;
import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.service.EmissionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private EmissionService emissionService;

    @PostMapping
    public ResponseEntity<?> logActivity(Authentication authentication, @Valid @RequestBody ActivityLogRequestDTO dto) {
        String username = authentication.getName();
        ActivityLog log = emissionService.logActivity(username, dto);
        return ResponseEntity.ok(log);
    }

    @GetMapping
    public ResponseEntity<?> listActivities(Authentication authentication) {
        String username = authentication.getName();
        List<ActivityLog> list = emissionService.getUserActivities(username);
        return ResponseEntity.ok(list);
    }
}

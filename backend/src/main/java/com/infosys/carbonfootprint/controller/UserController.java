package com.infosys.carbonfootprint.controller;

import com.infosys.carbonfootprint.dto.UserProfileDTO;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        UserProfileDTO dto = toDto(user);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody UserProfileDTO dto) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setAddressLine1(dto.getAddressLine1());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setPostalCode(dto.getPostalCode());
        user.setCountry(dto.getCountry());
        userRepository.save(user);
        return ResponseEntity.ok(toDto(user));
    }

    private UserProfileDTO toDto(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhone());
        dto.setAddressLine1(user.getAddressLine1());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setPostalCode(user.getPostalCode());
        dto.setCountry(user.getCountry());
        return dto;
    }
}

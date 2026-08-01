package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.dto.RegistrationRequestDTO;
import com.infosys.carbonfootprint.entity.RegistrationRequest;
import com.infosys.carbonfootprint.entity.Role;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.RegistrationRequestRepository;
import com.infosys.carbonfootprint.repository.RoleRepository;
import com.infosys.carbonfootprint.repository.UserRepository;
import com.infosys.carbonfootprint.util.PasswordGenerator;
import com.infosys.carbonfootprint.util.UsernameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRequestRepository registrationRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public RegistrationRequest submit(RegistrationRequestDTO dto) {
        RegistrationRequest req = new RegistrationRequest();
        req.setFirstName(dto.getFirstName());
        req.setLastName(dto.getLastName());
        req.setEmail(dto.getEmail());
        req.setPhone(dto.getPhone());
        req.setAddressLine1(dto.getAddressLine1());
        req.setCity(dto.getCity());
        req.setState(dto.getState());
        req.setPostalCode(dto.getPostalCode());
        req.setCountry(dto.getCountry());
        req.setGovIdType(dto.getGovIdType());
        req.setGovIdNumber(dto.getGovIdNumber());
        req.setStatus("PENDING");
        return registrationRequestRepository.save(req);
    }

    @Override
    public List<RegistrationRequest> getPendingRequests() {
        return registrationRequestRepository.findAll().stream().filter(r -> "PENDING".equals(r.getStatus())).toList();
    }

    @Override
    public RegistrationRequest approve(Long id) {
        Optional<RegistrationRequest> opt = registrationRequestRepository.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("Request not found");
        RegistrationRequest req = opt.get();
        // generate username and temp password
        String username = UsernameGenerator.generate(req.getFirstName(), req.getLastName());
        // ensure uniqueness
        while (userRepository.findByUsername(username).isPresent()) {
            username = UsernameGenerator.generate(req.getFirstName(), req.getLastName());
        }
        String tempPassword = PasswordGenerator.generate(12);

        User user = new User();
        user.setUsername(username);
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPhone(req.getPhone());
        user.setAddressLine1(req.getAddressLine1());
        user.setCity(req.getCity());
        user.setState(req.getState());
        user.setPostalCode(req.getPostalCode());
        user.setCountry(req.getCountry());
        user.setGovIdType(req.getGovIdType());
        user.setGovIdNumber(req.getGovIdNumber());
        user.setMustResetPassword(true);
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(tempPassword));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new RuntimeException("ROLE_USER missing"));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        req.setStatus("APPROVED");
        registrationRequestRepository.save(req);

        // send email with credentials - application logs for dev
        System.out.println("[EMAIL] To: " + user.getEmail());
        System.out.println("[EMAIL] Subject: Your account approved");
        System.out.println("[EMAIL] Body: username=" + username + ", temporaryPassword=" + tempPassword);

        return req;
    }

    @Override
    public RegistrationRequest reject(Long id, String reason) {
        Optional<RegistrationRequest> opt = registrationRequestRepository.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("Request not found");
        RegistrationRequest req = opt.get();
        req.setStatus("REJECTED");
        registrationRequestRepository.save(req);
        // Optionally record reason (not in schema)
        return req;
    }
}

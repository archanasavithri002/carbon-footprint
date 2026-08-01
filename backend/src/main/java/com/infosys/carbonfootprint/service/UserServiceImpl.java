package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.entity.Role;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.RoleRepository;
import com.infosys.carbonfootprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user, String rawPassword) {
        user.setPassword(passwordEncoder.encode(rawPassword));
        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName("ROLE_USER");
        userRole.ifPresent(roles::add);
        user.setRoles(roles);
        return userRepository.save(user);
    }
}

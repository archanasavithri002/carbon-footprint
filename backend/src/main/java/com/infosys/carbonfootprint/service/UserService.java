package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.entity.User;

public interface UserService {
    User createUser(User user, String rawPassword);
    User getByUsername(String username);
    User updateProfile(String username, User updated);
}

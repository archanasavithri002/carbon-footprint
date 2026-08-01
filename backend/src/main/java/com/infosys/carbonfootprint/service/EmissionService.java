package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.dto.ActivityLogRequestDTO;
import com.infosys.carbonfootprint.entity.ActivityLog;

import java.util.List;

public interface EmissionService {
    ActivityLog logActivity(String username, ActivityLogRequestDTO dto);
    List<ActivityLog> getUserActivities(String username);
}

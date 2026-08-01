package com.infosys.carbonfootprint.repository;

import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserOrderByActivityDateDesc(User user);
}

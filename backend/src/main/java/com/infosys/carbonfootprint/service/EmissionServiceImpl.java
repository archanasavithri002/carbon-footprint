package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.dto.ActivityLogRequestDTO;
import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.entity.EmissionFactor;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.ActivityLogRepository;
import com.infosys.carbonfootprint.repository.EmissionFactorRepository;
import com.infosys.carbonfootprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class EmissionServiceImpl implements EmissionService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private EmissionFactorRepository emissionFactorRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ActivityLog logActivity(String username, ActivityLogRequestDTO dto) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        ActivityLog log = new ActivityLog();
        log.setUser(user);
        log.setCategory(dto.getCategory());
        log.setActivity(dto.getActivity());
        log.setQuantity(dto.getQuantity());
        log.setUnit(dto.getUnit());

        // find emission factor
        EmissionFactor ef = emissionFactorRepository.findFirstByCategoryAndActivity(dto.getCategory(), dto.getActivity())
                .orElse(null);

        if (ef != null && ef.getFactor() != null) {
            log.setEmissionFactor(ef.getFactor());
            BigDecimal emissionKg = dto.getQuantity().multiply(ef.getFactor());
            log.setEmissionKg(emissionKg);
        } else {
            log.setEmissionFactor(null);
            log.setEmissionKg(BigDecimal.ZERO);
        }

        return activityLogRepository.save(log);
    }

    @Override
    public List<ActivityLog> getUserActivities(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return activityLogRepository.findByUserOrderByActivityDateDesc(user);
    }
}

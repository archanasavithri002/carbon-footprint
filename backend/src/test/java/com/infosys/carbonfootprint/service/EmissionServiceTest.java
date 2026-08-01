package com.infosys.carbonfootprint.service;

import com.infosys.carbonfootprint.entity.EmissionFactor;
import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.EmissionFactorRepository;
import com.infosys.carbonfootprint.repository.ActivityLogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EmissionServiceTest {

    @Mock
    private ActivityLogRepository activityLogRepository;

    @Mock
    private EmissionFactorRepository emissionFactorRepository;

    @Mock
    private com.infosys.carbonfootprint.repository.UserRepository userRepository;

    @InjectMocks
    private com.infosys.carbonfootprint.service.EmissionServiceImpl emissionService;

    private User testUser;

    @BeforeEach
    public void setup() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("jdoe");
        testUser.setEmail("jdoe@example.com");
    }

    @Test
    public void testLogActivity_WithEmissionFactor() {
        // arrange
        com.infosys.carbonfootprint.dto.ActivityLogRequestDTO dto = new com.infosys.carbonfootprint.dto.ActivityLogRequestDTO();
        dto.setCategory("transport");
        dto.setActivity("Car (petrol) per km");
        dto.setQuantity(new BigDecimal("100"));

        EmissionFactor ef = new EmissionFactor();
        ef.setFactor(new BigDecimal("0.192"));

        when(userRepository.findByUsername("jdoe")).thenReturn(Optional.of(testUser));
        when(emissionFactorRepository.findFirstByCategoryAndActivity("transport", "Car (petrol) per km")).thenReturn(Optional.of(ef));
        when(activityLogRepository.save(any(ActivityLog.class))).thenAnswer(i -> i.getArgument(0));

        // act
        ActivityLog result = emissionService.logActivity("jdoe", dto);

        // assert
        assertNotNull(result);
        assertEquals(new BigDecimal("19.20000"), result.getEmissionKg().setScale(5));
    }

    @Test
    public void testLogActivity_WithoutEmissionFactor() {
        com.infosys.carbonfootprint.dto.ActivityLogRequestDTO dto = new com.infosys.carbonfootprint.dto.ActivityLogRequestDTO();
        dto.setCategory("unknown");
        dto.setActivity("Unknown activity");
        dto.setQuantity(new BigDecimal("10"));

        when(userRepository.findByUsername("jdoe")).thenReturn(Optional.of(testUser));
        when(emissionFactorRepository.findFirstByCategoryAndActivity("unknown", "Unknown activity")).thenReturn(Optional.empty());
        when(activityLogRepository.save(any(ActivityLog.class))).thenAnswer(i -> i.getArgument(0));

        ActivityLog result = emissionService.logActivity("jdoe", dto);

        assertNotNull(result);
        assertEquals(new BigDecimal("0"), result.getEmissionKg());
    }
}

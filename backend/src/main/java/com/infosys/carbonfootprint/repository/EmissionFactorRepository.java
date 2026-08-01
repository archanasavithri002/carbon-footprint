package com.infosys.carbonfootprint.repository;

import com.infosys.carbonfootprint.entity.EmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Integer> {
    Optional<EmissionFactor> findFirstByCategoryAndActivity(String category, String activity);
}

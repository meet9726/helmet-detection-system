package com.helmet.helmet_detection_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;

import com.helmet.helmet_detection_backend.entity.DetectionLog;

@Repository
public interface DetectionLogRepository
        extends JpaRepository<DetectionLog, Long> {
	
	 Page<DetectionLog> findByHelmetDetected(Boolean helmetDetected, Pageable pageable);

	    Page<DetectionLog> findByCameraId(
	            String cameraId, Pageable pageable);

	    long countByHelmetDetected(Boolean helmetDetected);

	    long countByDetectedAtBetween(
	            LocalDateTime start, LocalDateTime end);

}

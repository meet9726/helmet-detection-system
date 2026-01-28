package com.helmet.helmet_detection_backend.service;



import org.springframework.stereotype.Service;


import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.repository.DetectionLogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import java.time.LocalDateTime;
import java.util.Random;

@Service
public class DetectionService {

    private final DetectionLogRepository repository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public DetectionService(DetectionLogRepository repository) {
        this.repository = repository;
    }

    public DetectionLog processDetection(String cameraId, String imageUrl) {

        boolean helmetDetected = new Random().nextBoolean(); // AI placeholder

        DetectionLog log = new DetectionLog();
        log.setCameraId(cameraId);
        log.setHelmetDetected(helmetDetected);
        log.setImageUrl(imageUrl);
        log.setDetectedAt(LocalDateTime.now());

        return repository.save(log);
    }

	public DetectionLog SaveCreateDetection(DetectionLog detection) {
		 DetectionLog saved = repository.save(detection);

		    if (!saved.isHelmetDetected()) {
		        messagingTemplate.convertAndSend(
		            "/topic/alerts",
		            saved
		        );
		    }

		    return saved;
	}
}

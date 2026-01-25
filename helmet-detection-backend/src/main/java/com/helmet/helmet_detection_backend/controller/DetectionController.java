package com.helmet.helmet_detection_backend.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.helmet.helmet_detection_backend.config.FileUploadConfig;
import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.service.DetectionService;

import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/api/detection")
public class DetectionController {

    private final DetectionService detectionService;

    public DetectionController(DetectionService detectionService) {
        this.detectionService = detectionService;
    }

    @PostMapping("/upload")
    public DetectionLog uploadImage(
    		  @RequestParam("file") MultipartFile file,
    	        @RequestParam("cameraId") String cameraId) throws Exception {

    	 if (file.isEmpty()) {
    	        throw new IllegalArgumentException("File is empty");
    	    }
    	 
    	 String contentType = file.getContentType();
    	 if (contentType == null || !contentType.startsWith("image/")) {
    	     throw new IllegalArgumentException("Only image files are allowed");
    	 }
    	 
        String fileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

       
        
        File dest = new File(FileUploadConfig.UPLOAD_DIR + fileName);
        file.transferTo(dest);
        
        

        return detectionService.processDetection(
                cameraId,
                "/uploads/" + fileName
        );
    }
}

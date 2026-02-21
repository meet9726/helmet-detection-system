package com.helmet.helmet_detection_backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.helmet.helmet_detection_backend.config.FileUploadConfig;
import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.service.DetectionService;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class DetectionController {

    private final DetectionService detectionService;

    public DetectionController(DetectionService detectionService) {
        this.detectionService = detectionService;
    }

    @PostMapping("/detection/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(
    		  @RequestParam("file") MultipartFile file,
    	        @RequestParam("cameraId") String cameraId) throws Exception {

    	 if (file.isEmpty()) {
    	        throw new IllegalArgumentException("File is empty");
    	    }
    	 
    	 String contentType = file.getContentType();
    	 if (contentType == null || 
    		        (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
    		        throw new IllegalArgumentException("Only image and video files are allowed");
    		    }
    	 
    	 
    	 String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
    	// Optional: separate folders
//    	    String uploadDir = FileUploadConfig.UPLOAD_DIR;
    	 String baseDir = System.getProperty("user.dir"); 
    	 String uploadDir = baseDir + File.separator + "uploads" + File.separator;
    	    
    	 if (contentType.startsWith("video/")) {
    	        uploadDir += "videos" + File.separator;
    	    } else {
    	        uploadDir += "images" + File.separator;
    	    }

       
        
    	 File directory = new File(uploadDir);
    	    if (!directory.exists()) {
    	        directory.mkdirs();
    	    }

    	    File dest = new File(uploadDir + fileName);
    	    
    	    file.transferTo(dest);
        
        
    	    Map<String, Object> resp = new HashMap<>();
    	    DetectionLog dl = detectionService.processDetection(
    	            cameraId,
    	            "/uploads/" + (contentType.startsWith("video/") ? "videos/" : "images/") + fileName
    	    );
        
       
    	    if(dl == null) {
    	    	resp.put("status", HttpStatus.OK.value());
    		    resp.put("message", "Nothing detect");
    	    }else {
			    resp.put("status", HttpStatus.OK.value());
			    resp.put("message", "Detection Added successfully");
    	    }
        return  ResponseEntity.ok(resp);
    }
    
    @PostMapping("/detection")
    public DetectionLog createDetection(
            @RequestBody DetectionLog detection) {

        detection.setDetectedAt(LocalDateTime.now());
        return detectionService.SaveCreateDetection(detection);
        
    }
}

package com.helmet.helmet_detection_backend.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helmet.helmet_detection_backend.config.JWTUtills;
import com.helmet.helmet_detection_backend.config.SecurityConfig;
import com.helmet.helmet_detection_backend.entity.User;
import com.helmet.helmet_detection_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class UserController {

	@Autowired
	private UserRepository repo;

	  private final PasswordEncoder encoder;
	
	  // Constructor injection
	    public UserController(PasswordEncoder encoder) {
	        this.encoder = encoder;
	    }
	@Autowired
	private JWTUtills jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {

		 Optional<User> userOpt = repo.findByUsername(req.getUsername());
		    if (userOpt.isEmpty()) {
//		        Map<String, String> body = Collections.singletonMap("Error", "User not found");
		        Map<String, Object> resp = new HashMap<>();
			    resp.put("status", HttpStatus.OK);
			    resp.put("error", "User not found"); 
		        return ResponseEntity.ok(resp); // status 200 with error object
		    }

		    User user = userOpt.get();
		    if (!encoder.matches(req.getPassword(), user.getPassword())) {
		        Map<String, String> body = Collections.singletonMap("Error", "Invalid credentials");
		        Map<String, Object> resp = new HashMap<>();
			    resp.put("status", HttpStatus.OK);
			    resp.put("error", "Invalid credentials");
			    return ResponseEntity.ok(resp);
		    }

		    String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
		    Map<String, Object> resp = new HashMap<>();
		    resp.put("token", token);
		    return ResponseEntity.ok(resp);
	}
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create-user")
	public User createUser(@RequestBody User user) {
	    user.setPassword(encoder.encode(user.getPassword()));
	    
	    return repo.save(user);
	}


}

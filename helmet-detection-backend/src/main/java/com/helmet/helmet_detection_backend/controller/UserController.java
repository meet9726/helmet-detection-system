package com.helmet.helmet_detection_backend.controller;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
	
	 private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();
	    
	    public void blacklistToken(String token) {
	        blacklistedTokens.add(token);
	    }
	    
	    public boolean isBlacklisted(String token) {
	        return blacklistedTokens.contains(token);
	    }
	    
	    // Optional: Clear expired tokens periodically
	    public void removeToken(String token) {
	        blacklistedTokens.remove(token);
	    }
	
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
	@PostMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(
	        @RequestHeader(value = "Authorization", required = false) String authHeader) {
	    
	    Map<String, Object> resp = new HashMap<>();
	    
	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        resp.put("status", HttpStatus.BAD_REQUEST.value());
	        resp.put("error", "No token provided");
	        return ResponseEntity.badRequest().body(resp);
	    }
	    
	    String token = authHeader.substring(7); // Remove "Bearer " prefix
	    blacklistToken(token);
	    
	    resp.put("status", HttpStatus.OK.value());
	    resp.put("message", "Logged out successfully");
	    return ResponseEntity.ok(resp);
	}

}

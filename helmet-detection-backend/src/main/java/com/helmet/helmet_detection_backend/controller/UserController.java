package com.helmet.helmet_detection_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	public String login(@RequestBody LoginRequest req) {

	    User user = repo.findByUsername(req.getUsername())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (!encoder.matches(req.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid credentials");
	    }

	    return jwtUtil.generateToken(user.getUsername(), user.getRole());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create-user")
	public User createUser(@RequestBody User user) {
	    user.setPassword(encoder.encode(user.getPassword()));
	    
	    return repo.save(user);
	}


}

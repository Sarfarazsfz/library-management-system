package com.library.management.controller;

import com.library.management.dto.LoginRequest;
import com.library.management.dto.LoginResponse;
import com.library.management.dto.UserDTO;
import com.library.management.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody UserDTO userDTO) {
        UserDTO registeredUser = authService.register(userDTO);
        return ResponseEntity.ok(registeredUser);
    }
}

package com.library.management.service;

import com.library.management.dto.LoginRequest;
import com.library.management.dto.LoginResponse;
import com.library.management.dto.UserDTO;
import com.library.management.model.User;
import com.library.management.repository.UserRepository;
import com.library.management.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .phone(user.getPhone())
                .address(user.getAddress())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .updatedAt(user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null)
                .build();

        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .user(userDTO)
                .build();
    }

    public UserDTO register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + userDTO.getEmail());
        }

        User user = User.builder()
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .role(userDTO.getRole() != null ? User.Role.valueOf(userDTO.getRole()) : User.Role.LIBRARIAN)
                .phone(userDTO.getPhone())
                .address(userDTO.getAddress())
                .isActive(true)
                .build();

        User savedUser = userRepository.save(user);

        return UserDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .phone(savedUser.getPhone())
                .address(savedUser.getAddress())
                .isActive(savedUser.getIsActive())
                .createdAt(savedUser.getCreatedAt() != null ? savedUser.getCreatedAt().toString() : null)
                .build();
    }
}

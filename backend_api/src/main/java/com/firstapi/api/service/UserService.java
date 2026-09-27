package com.firstapi.api.service;

import com.firstapi.api.dto.RegisterRequest;
import com.firstapi.api.dto.UserDto;
import com.firstapi.api.model.Role;
import com.firstapi.api.model.User;
import com.firstapi.api.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    public void createUser(UserDto userDto) {

        Optional<User> userDb= userRepository.findById(userDto.getUsername());
        if(userDb.isPresent())
            throw new IllegalArgumentException("User already exists");

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setRole(Role.USER);

        userRepository.save(user);
    }

    public User register(RegisterRequest request) {
        Optional<User> userDb = userRepository.findByUsername(request.username());
        if (userDb.isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEmail(request.email());
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserDetails loadUserDetails(String username) {
        return userDetailsService.loadUserByUsername(username);
    }
}

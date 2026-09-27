package com.firstapi.api.controller;

import com.firstapi.api.dto.UserDto;
import com.firstapi.api.model.User;
import com.firstapi.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    private UserService userService;

    public ApiController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping
    public void createUser(@RequestBody UserDto user){
        userService.createUser(user);
    }


}

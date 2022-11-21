package com.registraduriaG10.RegistergG10.controllers;

import com.registraduriaG10.RegistergG10.models.User;
import com.registraduriaG10.RegistergG10.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return this.userServices.index();
    }

    @GetMapping("/by_id/{id}")
    public Optional<User> getUserById(@PathVariable("id") int id) {
        return this.userServices.show(id);
    }

    @GetMapping("/by_nickname/{nickname}")
    public  Optional<User> getUserByNickname(@PathVariable("nickname") String nickname){
        return this.userServices.showByNickname(nickname);
    }

    @GetMapping("/by_email/{email}")
    public Optional<User> getUserByEmail(@PathVariable("email") String email){
        return this.userServices.showByEmail(email);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return this.userServices.login(user);
    }

    @PostMapping("/insert")
    public User insertUser(@RequestBody User user) {
        return this.userServices.create(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") int id, @RequestBody User user){
        return this.userServices.update(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteUser(@PathVariable("id") int id){
        return this.userServices.delete(id);
    }
}


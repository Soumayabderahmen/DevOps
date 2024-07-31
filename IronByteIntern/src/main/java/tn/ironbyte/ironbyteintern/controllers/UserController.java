package tn.ironbyte.ironbyteintern.controllers;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import tn.ironbyte.ironbyteintern.entities.User;
import tn.ironbyte.ironbyteintern.services.IUserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController///choisir le type de body en form json
@RequestMapping("users")// le path du controller → tjr en minuscule
@AllArgsConstructor////important pour l'injection de dependance
public class UserController {
    IUserService userService;

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("/add_User")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/update_user")
    public User UpdateUser(@RequestBody User user)
    {
        return userService.updateUser(user);
    }
    @DeleteMapping("/del-user/{id}")
    public void removeUser(@PathVariable("id")Long idUser)
    {
        userService.removeUser(idUser);
    }

}

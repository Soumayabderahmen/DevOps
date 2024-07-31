package tn.ironbyte.ironbyteintern.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tn.ironbyte.ironbyteintern.entities.User;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
public class UserServiceTest {

    //@Autowired
    private IUserService userService;

    //@Test
    public void testCreateUser() {
        User user = new User();
        user.setName("Test User");
        user.setEmail("test@example.com");
        User createdUser = userService.createUser(user);
        assertNotNull(createdUser);
        assertEquals("Test User", createdUser.getName());
        assertEquals("test@example.com", createdUser.getEmail());
    }

   // @Test
    public void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertNotNull(users);
        assertFalse(users.isEmpty());
    }
}

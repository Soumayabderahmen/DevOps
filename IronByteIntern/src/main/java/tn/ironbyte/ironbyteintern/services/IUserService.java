package tn.ironbyte.ironbyteintern.services;

import tn.ironbyte.ironbyteintern.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User createUser(User user);
    void removeUser(Long id);
    User updateUser(User user);

}

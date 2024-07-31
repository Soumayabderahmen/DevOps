package tn.ironbyte.ironbyteintern.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.ironbyte.ironbyteintern.entities.User;
import tn.ironbyte.ironbyteintern.repositories.UserRepository;

import java.util.List;
@Service
@AllArgsConstructor////important pour l'injection de dependance
public class UserServiceImpl implements IUserService{
    UserRepository userRepository;
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void removeUser(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }
}

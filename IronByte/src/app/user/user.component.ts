import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('connected users', this.users)
    });
  }

  addUser() {
    this.userService.createUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = { name: '', email: '' };
    });
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(updatedUser => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.selectedUser = null;
      });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

}

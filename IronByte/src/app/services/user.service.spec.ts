import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all users', () => {
    const dummyUsers: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(service.apiUrl+'/getAllUsers');
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });

  it('should create a user', () => {
    const newUser: User = { id: 3, name: 'New User', email: 'newuser@example.com' };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/add_User`);
    expect(request.request.method).toBe('POST');
    request.flush(newUser);
  });

  it('should update a user', () => {
    const updatedUser: User = { id: 1, name: 'Updated User', email: 'updateduser@example.com' };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/update_user`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe();

    const request = httpMock.expectOne(`${service.apiUrl}/del-user/${userId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});

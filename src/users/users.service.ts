import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  login(body: LoginDTO) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}

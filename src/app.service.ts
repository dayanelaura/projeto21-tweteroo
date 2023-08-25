import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[];

  constructor(){
    this.users = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  login(body: any){
    const {username, avatar} = body;
    return this.users.push(new User(username, avatar));
  }
}

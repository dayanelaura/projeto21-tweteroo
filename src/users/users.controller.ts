import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';

@Controller()
export class UsersController {

  // private readonly usersService: UsersService;
  constructor(private readonly usersService: UsersService) { }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: LoginDTO) {
    return this.usersService.login(body);
  }

}

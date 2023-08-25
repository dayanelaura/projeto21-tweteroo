import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDTO } from './dtos/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: LoginDTO){
    return this.appService.login(body);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDTO } from './dtos/login.dto';
import { TweetDTO } from './dtos/tweet.dto';

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

  @Post('tweets')
  createTweet(@Body() body: TweetDTO) {
    try {
      return this.appService.createTweet(body);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('tweets')
  getTweets(@Query('page') page: number = undefined) {

    if (page && (isNaN(page) || page <= 0))
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);

    return this.appService.getTweets(page);
  }

  @Get('tweets/:username')
  getTweetsByUsername(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }
}

import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetDTO } from './dtos/tweet.dto';

@Controller()
export class TweetsController {

  constructor(private readonly tweetsService: TweetsService) { }

  @Get('tweets')
  //@Query('page', new ParseIntPipe({ optional: true }))
  getTweets(@Query('page') page: number = undefined) {
    if (page && (isNaN(page) || page <= 0)) {
      throw new HttpException(
        'Informe uma página válida!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.tweetsService.getTweets(page);
  }

  @Get('tweets/:username')
  getTweetsFromUsername(@Param('username') username: string) {
    return this.tweetsService.getTweetsFromUser(username);
  }

  @Post('tweets')
  createTweet(@Body() body: TweetDTO) {
    try {
      return this.tweetsService.createTweet(body);
    } catch (error) {
      console.log(error); //HttpException
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }


}

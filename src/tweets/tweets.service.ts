import { Injectable } from '@nestjs/common';
import { Tweet } from './entities/tweet.entity';
import { TweetDTO } from './dtos/tweet.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  private LIMIT = 15;
  private tweets: Tweet[];

  constructor(private readonly usersService: UsersService) {
    this.tweets = [];
  }

  createTweet(body: TweetDTO) {
    const { username, tweet } = body;
    const user = this.usersService.getUserByUsername(username);
    if (!user) throw new Error('User does not exist!');

    return this.tweets.push(new Tweet(user, tweet));
  }

  getTweets(page?: number) {
    let tweets: Tweet[] = [];
    if (page) {
      const { start, end } = this.calculatePageLimits(page);
      tweets = this.tweets.slice(start, end);
    } else {
      tweets = this.tweets.slice(-this.LIMIT);
    }

    return this.formatTweets(tweets);
  }

  getTweetsFromUser(username: string) {
    const tweetsFromUser = this.tweets.filter((tweet) => {
      return tweet.user.username === username;
    });

    return this.formatTweets(tweetsFromUser);
  }

  private formatTweets(tweets: Tweet[]) {
    return tweets.map((tweet) => {
      const { username, avatar } = tweet.user;
      return {
        username,
        avatar,
        tweet: tweet.tweet,
      };
    });
  }

  private calculatePageLimits(page: number): { start: any; end: any } {
    return {
      start: (page - 1) * this.LIMIT,
      end: page * this.LIMIT,
    };
  }

}

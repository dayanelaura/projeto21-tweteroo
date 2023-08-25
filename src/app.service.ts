import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { TweetDTO } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];
  private LIMIT = 15;

  constructor(){
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  login(body: any){
    const {username, avatar} = body;
    return this.users.push(new User(username, avatar));
  }

  createTweet(body: TweetDTO) {
    const { username, tweet } = body;
    const user = this.getUserByUsername(username);
    if (!user) throw new Error('user not found');

    return this.tweets.push(new Tweet(user, tweet));
  }

  private getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getTweets(page?: number) {
    let tweets: Tweet[] = [];

    if (page) {
      const { from, to } = this.calculatePageRange(page);
      tweets = this.tweets.slice(from, to).reverse();
    } else tweets = this.tweets.slice(-this.LIMIT).reverse();

    return this.formatTweets(tweets);
  }

  getTweetsByUser(username: string) {
    const userTweets = this.tweets.filter(tweet => tweet.user.username === username);
    return this.formatTweets(userTweets).reverse();
  }

  private formatTweets(tweets: Tweet[]) {
    return tweets.map((value) => {
      const { username, avatar } = value.user;
      return {
        username,
        avatar,
        tweet: value.tweet,
      };
    });
  }

  private calculatePageRange(page: number): { from: number; to: number } {
    return {
      from: (page - 1) * this.LIMIT,
      to: page * this.LIMIT,
    };
  }
  
}

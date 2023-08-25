export class User {
  private _username: string;
  private _avatar: string;

  constructor(username: string, avatar: string) {
    this._username = username;
    this._avatar = avatar;
  }

  get username() {
    return this._username;
  }

  get avatar() {
    return this._avatar;
  }
}

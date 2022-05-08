export class UserInfo {

  constructor(selectors) {
    this._userName = document.querySelector(selectors.nameSelector);
    this._userAbout = document.querySelector(selectors.aboutSelector);
    this._userAvatar = document.querySelector(selectors.avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      'username': this._userName.textContent,
      'about': this._userAbout.textContent
    }
    return (userInfo);
  }

  setUserInfo(username, about) {
    if(username) this._userName.textContent = username;
    if(about) this._userAbout.textContent = about;
  }

  setUserAvatar(url) {
    this._userAvatar.src = url;
  }

}

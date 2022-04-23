export class UserInfo {

  constructor(selectors) {
    this._userName = document.querySelector(selectors.nameSelector);
    this._userAbout = document.querySelector(selectors.aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      'name': this._userName.textContent,
      'about': this._userAbout.textContent
    }
    return (userInfo);
  }

  setUserInfo(values) {
    this._userName.textContent = values.name;
    this._userAbout.textContent = values.about;
  }

}

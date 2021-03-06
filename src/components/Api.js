export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`,
      {
        method: 'GET',
        headers: this._headers
      })
        .then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`,
    {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`,
    {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  setLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`,
    {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  removeLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`,
    {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`,
    {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResponse);
  }

  updateAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: url
      })
    })
      .then(this._handleResponse);
  }

}
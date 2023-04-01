export class Api {
  constructor(setting) {
    this._url = setting.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  getCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  pushUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then(this._checkResponse);
  }

  pushNewCard({ name, link }) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // setLike(id) {
  //   const token = localStorage.getItem("jwt");
  //   return fetch(`${this._url}/cards/${id}/likes`, {
  //     method: "PUT",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }).then(this._checkResponse);
  // }

  // deleteLike(id) {
  //   const token = localStorage.getItem("jwt");
  //   return fetch(`${this._url}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   }).then(this._checkResponse);
  // }

  // changeLikeCardStatus(id, isLiked) {
  //   if (!isLiked) {
  //     return this.deleteLike(id);
  //   } else {
  //     return this.setLike(id);
  //   }
  // }

  changeLikeCardStatus = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  setUserAvatar(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}

export const tokenCheck = () => {
  const token = localStorage.getItem("jwt");
  fetch(`${this._url}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error);
  });
};

const api = new Api({
  baseUrl: "https://api.mesto.semenenko.nomoredomains.work/",
});

export default api;

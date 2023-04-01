export const BASE_URL = "https://api.mesto.semenenko.nomoredomains.work/";

function handleOriginalResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleOriginalResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(handleOriginalResponse)

    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    })
    .catch((err) => console.log(err));
};

export const getContent = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const tokenCheck = () => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:3000/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleOriginalResponse);
};

import React from "react";

export function login(token, userId, tokenExpiration, role) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function logout() {
  localStorage.removeItem('token')
}


/*
export default React.createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration, role) => {
    localStorage.setItem('token', JSON.stringify(token));
  },
  logout: () => {
    localStorage.removeItem('token')
  },
  currentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
});*/
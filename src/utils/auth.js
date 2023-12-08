/*
 * @Description: auth
 * @Author: Lewis
 * @Date: 2022-06-07 17:57:41
 * @LastEditTime: 2023-12-07 23:19:40
 * @LastEditors: Ian
 */
import Cookies from "js-cookie";
import store from "../store";

const TokenKey = "tokenKey";
const UsernameKey = "usernameKey";
const userIdKey = "userIdKey";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username);
}

export function getUsername() {
  return Cookies.get(UsernameKey);
}

export function removeUsername() {
  return Cookies.remove(UsernameKey);
}

export function setUserId(id) {
  return Cookies.set(userIdKey, id);
}

export function getUserId() {
  return Cookies.get(userIdKey);
}

//set loading data
export function setLoading(payload) {
  store.dispatch("auth/setLoading", payload);
}

//set toast data
export function setToast(payload) {
  store.dispatch("auth/setToast", payload);
}

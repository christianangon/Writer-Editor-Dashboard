/*
 * @Description: auth
 * @Author: Lewis
 * @Date: 2022-06-07 17:57:41
 * @LastEditTime: 2023-12-09 09:56:21
 * @LastEditors: Ian
 */
import Cookies from "js-cookie";
import store from "../store";

const TokenKey = "tokenKey";
const UsernameKey = "usernameKey";
const userIdKey = "userIdKey";
const RolesKey = "rolesKey";
const InfoKey = "infoKey";

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

export function setRoles(roles) {
  return Cookies.set(RolesKey, roles);
}

export function getRoles() {
  return Cookies.get(RolesKey);
}

export function removeRoles() {
  return Cookies.remove(RolesKey);
}

export function setInfos(info) {
  return Cookies.set(InfoKey, info);
}

export function getInfos() {
  return Cookies.get(InfoKey);
}

export function removeInfos() {
  return Cookies.remove(InfoKey);
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

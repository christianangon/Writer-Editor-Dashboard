/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 20:06:41
 * @LastEditTime: 2023-12-08 16:30:26
 * @LastEditors: Ian
 */
import request from "../request";

export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
}

export function logout(data) {
  return request({
    url: "/api/logout",
    method: "post",
    data,
  });
}

export function createUser(data) {
  return request({
    url: "/api/users",
    method: "post",
    data,
  });
}

export function getInfo(params) {
  return request({
    url: "/api/users/all",
    method: "get",
    params,
  });
}

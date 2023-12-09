/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 20:06:41
 * @LastEditTime: 2023-12-09 14:06:39
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
    url: "/api/users/create",
    method: "post",
    data,
  });
}
export function updateUser(data) {
  return request({
    url: "/api/users/edit",
    method: "post",
    data,
  });
}
export function deleteUser(data) {
  return request({
    url: "/api/users/delete",
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

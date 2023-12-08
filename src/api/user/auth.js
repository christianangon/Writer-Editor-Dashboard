/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 20:06:41
 * @LastEditTime: 2023-12-07 20:22:46
 * @LastEditors: Ian
 */
import request from "../request";

export function login(data) {
  return request({
    url: "/auth",
    method: "post",
    data,
  });
}

export function getInfo(params) {
  return request({
    url: "/users/all",
    method: "get",
    params,
  });
}

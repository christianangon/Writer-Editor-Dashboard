/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 20:06:41
 * @LastEditTime: 2023-12-08 17:31:49
 * @LastEditors: Ian
 */
import request from "../request";

export function createArticle(data) {
  return request({
    url: "/api/articles",
    method: "post",
    data,
  });
}

export function getArticle(params) {
  return request({
    url: "/api/articles/all",
    method: "get",
    params,
  });
}

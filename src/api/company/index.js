/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 20:06:41
 * @LastEditTime: 2023-12-08 16:26:41
 * @LastEditors: Ian
 */
import request from "../request";

export function createCompany(data) {
  return request({
    url: "/api/companies",
    method: "post",
    data,
  });
}

export function getCompany(params) {
  return request({
    url: "/api/companies/all",
    method: "get",
    params,
  });
}

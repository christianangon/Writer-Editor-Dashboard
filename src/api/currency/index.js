/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 16:16:45
 * @LastEditTime: 2023-12-07 16:41:55
 * @LastEditors: Ian
 */
import request from "../request";

export function getCurrencies(params) {
  return request({
    url: "articles",
    method: "get",
    params,
  });
}

export function getLatest(params) {
  return request({
    url: "latest.json",
    method: "get",
    params,
  });
}

export function getHistorical(params) {
  return request({
    url: "historical/*.json",
    method: "get",
    params,
  });
}
export function getTimeSeries(params) {
  return request({
    url: "time-series.json",
    method: "get",
    params,
  });
}

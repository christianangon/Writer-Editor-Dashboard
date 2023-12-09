import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "https://christian-json-server-6ra1.vercel.app",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
});

export default service;

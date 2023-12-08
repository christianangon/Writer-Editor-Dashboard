import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL:
    "https://stoplight.io/mocks/christianangon/editorwriterdashboard/288942294",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
});

export default service;

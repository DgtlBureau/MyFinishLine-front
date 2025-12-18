import axios from "axios";

const baseURL = "https://dev.myfinishline.io/api";

const isServer = typeof window === "undefined";

const instance = axios.create({
  baseURL: isServer ? baseURL : "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

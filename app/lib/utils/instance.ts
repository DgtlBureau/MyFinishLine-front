import axios from "axios";

const baseURL = "https://dev.myfinishline.io/back/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

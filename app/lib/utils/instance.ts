import axios from "axios";

const baseURL = "https://dev.myfinishline.io/api";

export default axios.create({
  baseURL,
});

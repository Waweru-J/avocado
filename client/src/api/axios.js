import axios from "axios";
import backend from "../utils/backendUrl.js";
const api = async (method = "GET", endpoint, payload, headers = {}) => {
  try {
    const config = {
      method: method,
      url: backend() + "api/v1/" + endpoint,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
      },
      data: payload,
    };
    const res = await axios(config);
    return res;
  } catch (err) {
    return { ...err.response, status: err.response.status || 400 };
  }
};

export default api;

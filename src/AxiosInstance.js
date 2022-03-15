import axios from "axios";

const AxiosInitialize = () => {
  // axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  return axios;
};

export const AxiosInstance = AxiosInitialize();

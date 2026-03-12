// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-backend-5mxk.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
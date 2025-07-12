import axios from "axios";

// export const API_URL = "http://localhost:5000"
// export const API_URL = "http://192.168.79.93:5000"



export const API_URL = "https://backend-api.fusionphotofilms.com"

// API Client
export default axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imagesApi = axios.create({
    baseURL: API_URL + "/api",
    headers: {
      "Content-type": "application/json",
    },
  }); 
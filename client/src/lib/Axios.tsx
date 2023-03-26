import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5550",
  headers: {
    "Content-Type": "application/json",
  },
});

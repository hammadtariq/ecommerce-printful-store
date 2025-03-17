import axios from "axios";
import { config } from "./env";
import { API_ENDPOINTS } from "../constants";

export const printfulClient = axios.create({
  baseURL: API_ENDPOINTS.PRINTFUL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.printfulApiKey}`,
  },
});

// utils/apiHelper.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL;

// Helper function to construct the final API URL
const getApiUrl = (url, crm = false) => {
  return crm ? `${BASE_URL}${url}` : `${BASE_URL}/v1${url}`;
};

const apiHelper = {
  post: async (url, body, crm = false) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // If the body is FormData, let the browser set the content-type
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    console.log("POST Request Headers:", headers);
    console.log("POST Request Body:", body);

    try {
      const response = await axios.post(getApiUrl(url, crm), body, { headers });
      console.log("POST Response:", response);
      return response;
    } catch (error) {
      console.error("POST Request Error:", error);
      throw error;
    }
  },

  get: async (url, crm = false) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("GET Request Headers:", headers);

    try {
      const response = await axios.get(getApiUrl(url, crm), { headers });
      console.log("GET Response:", response);
      return response;
    } catch (error) {
      console.error("GET Request Error:", error);
      throw error;
    }
  },

  put: async (url, body, crm = false) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("PUT Request Headers:", headers);
    console.log("PUT Request Body:", body);

    try {
      const response = await axios.put(getApiUrl(url, crm), body, { headers });
      console.log("PUT Response:", response);
      return response;
    } catch (error) {
      console.error("PUT Request Error:", error);
      throw error;
    }
  },

  delete: async (url, crm = false) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("DELETE Request Headers:", headers);

    try {
      const response = await axios.delete(getApiUrl(url, crm), { headers });
      console.log("DELETE Response:", response);
      return response;
    } catch (error) {
      console.error("DELETE Request Error:", error);
      throw error;
    }
  },
};

export default apiHelper;

import axios from "axios";

// utils/apiHelper.js
const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const apiHelper = {
  post: async (url, body) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // If the body is FormData, don't set content-type, let the browser set it
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    console.log("POST Request Headers:", headers); // Debugging to check headers
    console.log("POST Request Body:", body); // Debugging to check body

    try {
      const response = await axios.post(`${BASE_URL}${url}`, body, { headers });
      console.log("POST Response:", response); // Debugging response
      return response;
    } catch (error) {
      console.error("POST Request Error:", error);
      throw error;
    }
  },

  get: async (url) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("GET Request Headers:", headers); // Debugging to check headers

    try {
      const response = await axios.get(`${BASE_URL}${url}`, { headers });
      console.log("GET Response:", response); // Debugging response
      return response;
    } catch (error) {
      console.error("GET Request Error:", error);
      throw error;
    }
  },

  put: async (url, body) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("PUT Request Headers:", headers); // Debugging to check headers
    console.log("PUT Request Body:", body); // Debugging to check body

    try {
      const response = await axios.put(`${BASE_URL}${url}`, body, { headers });
      console.log("PUT Response:", response); // Debugging response
      return response;
    } catch (error) {
      console.error("PUT Request Error:", error);
      throw error;
    }
  },

  delete: async (url) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("DELETE Request Headers:", headers); // Debugging to check headers

    try {
      const response = await axios.delete(`${BASE_URL}${url}`, { headers });
      console.log("DELETE Response:", response); // Debugging response
      return response;
    } catch (error) {
      console.error("DELETE Request Error:", error);
      throw error;
    }
  },
};

export default apiHelper;

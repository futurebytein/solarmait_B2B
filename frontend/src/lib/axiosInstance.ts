"use client";
import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

interface CustomAxiosRequestConfig<T = unknown>
  extends InternalAxiosRequestConfig<T> {
  crm?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL!;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function <T>(
    config: InternalAxiosRequestConfig<T>
  ): InternalAxiosRequestConfig<T> | Promise<InternalAxiosRequestConfig<T>> {
    // Cast to our custom config type
    const customConfig = config as CustomAxiosRequestConfig<T>;

    // Ensure headers exists; if not, initialize it as an empty object.
    if (!customConfig.headers) {
      customConfig.headers = {} as AxiosRequestHeaders;
    }

    // Set the Authorization header without replacing the entire headers object.
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token") || "";
      if (token) {
        Object.assign(customConfig.headers, {
          Authorization: `Bearer ${token}`,
        });
      }
    }

    // Check for the custom "crm" flag.
    const isCRM = customConfig.crm === true;
    // Remove the custom property so it isn't sent to the server.
    delete customConfig.crm;

    // If this is not a CRM call, ensure the URL is prefixed with '/v1'.
    if (!isCRM && customConfig.url) {
      if (!customConfig.url.startsWith("/v1")) {
        customConfig.url = `/v1${customConfig.url.startsWith("/") ? "" : "/"}${
          customConfig.url
        }`;
      }
    }

    return customConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

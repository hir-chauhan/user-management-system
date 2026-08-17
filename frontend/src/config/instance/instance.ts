import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
     
      localStorage.removeItem('auth-storage');
    }
    const customError = error.response?.data || {
      statusCode: error.response?.status || 500,
      message: error.message || 'Something went wrong',
    };
    return Promise.reject(customError);
  }
);

interface RequestOptions {
  url: string;
  data?: unknown;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

const instance = {
  get: async <T = any>({ url, config }: { url: string; config?: AxiosRequestConfig }): Promise<T> => {
    return (await axiosInstance.get(url, config)) as unknown as T;
  },

  post: async <T = any>({ url, data, headers, config }: RequestOptions): Promise<T> => {
    return (await axiosInstance.post(url, data, {
      headers,
      ...config,
    })) as unknown as T;
  },

  put: async <T = any>({ url, data, headers, config }: RequestOptions): Promise<T> => {
    return (await axiosInstance.put(url, data, {
      headers,
      ...config,
    })) as unknown as T;
  },

  patch: async <T = any>({ url, data, headers, config }: RequestOptions): Promise<T> => {
    return (await axiosInstance.patch(url, data, {
      headers,
      ...config,
    })) as unknown as T;
  },

  delete: async <T = any>({ url, headers, config }: { url: string; headers?: Record<string, string>; config?: AxiosRequestConfig }): Promise<T> => {
    return (await axiosInstance.delete(url, {
      headers,
      ...config,
    })) as unknown as T;
  },
};

export default instance;

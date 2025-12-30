import axios from "axios";
const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgotpassword",
  "/api/auth/resetpassword",
  "/api/auth/me",
];

const tokenUtils = {
  getToken: () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("authToken");
      }
      return null;
    } catch (error) {
      console.error("Error reading token:", error);
      return null;
    }
  },
  setToken: (token: string) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("authToken", token);
      }
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },
  removeToken: () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};

const axiosInstance = axios.create({
  baseURL: "https://task-app-backend-1-micf.onrender.com/",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();

    // Check if the current route is public
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      config.url?.includes(route)
    );

    // Only add token if available
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.trim()}`,
      } as any;
    } else if (!isPublicRoute && typeof window !== "undefined") {
      // Only redirect if we're in the browser and it's not a public route
      const currentPath = window.location.pathname;
      const authPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/",
      ];

      // Don't redirect if already on an auth page
      if (!authPaths.includes(currentPath)) {
        window.location.href = "/login";
      }
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      "Response Error:",
      error.response?.status,
      error.response?.data
    );

    if (error.response?.status === 401) {
      tokenUtils.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { tokenUtils };
export default axiosInstance;

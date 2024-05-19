// Import the axios library, which is a promise-based HTTP client for making requests to external services
import axios from "axios";

// Add a request interceptor to the axios instance
// Interceptors allow you to alter the request or response entirely (headers, data, etc.)
// or trigger additional actions like logging or setting a loading state in your UI
axios.interceptors.request.use(
  // The first function argument handles the request before it is sent
  (req) => {
    // Retrieve the 'user' object from localStorage, which is a storage in the browser that allows you to save key/value pairs
    const user = localStorage.getItem("user");
    // If the 'user' object exists, parse it from JSON string back to an object and retrieve the token property
    const token = user && JSON.parse(user).token;

    // If a token exists, set it in the request headers
    // The 'access_token' header is commonly used to pass tokens required for authentication
    if (token) {
      req.headers["access_token"] = token;
    }

    // Return the request configuration to proceed with the request
    // This is necessary because the interceptor must return the request or a promise
    return req;
  },
  // The second function argument handles any errors that occur during the request handling
  (error) => {
    // Reject the promise with the error object
    // This will cause the request to fail and the catch block of the request promise will be executed
    return Promise.reject(error);
  },
);

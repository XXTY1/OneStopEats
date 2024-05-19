// Import the axios library for making HTTP requests
import axios from "axios";

// Define and export a function called setLoadingInterceptor
// This function will set up interceptors for axios requests and responses
export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
  // Add a request interceptor to axios
  axios.interceptors.request.use(
    (req) => {
      // Before the request is sent, check if the request data is not an instance of FormData
      // If it's not FormData, it means we can show a loading indicator
      if (!(req.data instanceof FormData)) showLoading();
      // Return the request configuration to proceed with the request
      return req;
    },
    (error) => {
      // If there's an error before sending the request, hide the loading indicator
      hideLoading();
      // Reject the promise with the error to handle it later in the catch block
      return Promise.reject(error);
    },
  );

  // Add a response interceptor to axios
  axios.interceptors.response.use(
    (res) => {
      // After the response is received, hide the loading indicator
      hideLoading();
      // Return the response to proceed with normal processing
      return res;
    },
    (error) => {
      // If there's an error in the response, hide the loading indicator
      hideLoading();
      // Reject the promise with the error to handle it later in the catch block
      return Promise.reject(error);
    },
  );
};

// Export the setLoadingInterceptor function as the default export of this module
export default setLoadingInterceptor;

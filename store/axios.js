import axios from 'axios';
import store from '~/store/store'; // Adjust the path as per your project structure

// Request interceptor
axios.interceptors.request.use(
  config => {
    const headers = config.headers || {};

    // Add the Bearer token header
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    
    // Set Content-Type header
    headers['Content-Type'] = 'application/ld+json';
  
    // Update the configuration with the new headers
    config.headers = headers;
    // Set loading to true before each request
    store.dispatch('setLoading', true);
    return config;
  },
  error => {
    store.dispatch('setLoading', false); // In case of an error, set loading back to false
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => {
    // Set loading back to false after each successful response
    store.dispatch('setLoading', false);
    return response;
  },
  error => {
    store.dispatch('setLoading', false); // In case of an error, set loading back to false
    return Promise.reject(error);
  }
);

export default axios;
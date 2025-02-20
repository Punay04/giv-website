import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/auth';

const handleApiError = (error) => {
  if (error.code === 'ERR_NETWORK') {
    throw new Error('Unable to connect to server. Please check if the server is running.');
  }
  throw error;
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user'); // Clear invalid data
    return null;
  }
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const loginUser = async ({email, password}) => {
  console.log('📤 front loginUser request:', { email, password });
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('📤 front loginuser response:', response.data);

    return response.data;
};

export const registerUser = async ({ username, email, password }) => {
    console.log('📤 front registerUser request:', { username, email, password });
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  console.log('📤 front registeruser request:', response.data);
  return response.data;
};

export const getUserProfile = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;
  console.log('📤 front getUserProfile userInfo:', userInfo);
  console.log('📤 front getUserProfile request:', { token });
  if (!token) {
    throw new Error('No token found, user is not authenticated');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  const response = await axios.get(`${API_URL}/profile`, config);
  console.log('📤 front getUserProfile response:', response.data);
  return response.data;
};


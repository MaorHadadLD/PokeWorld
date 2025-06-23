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
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  const {data} = await axios.get('api/users/profile', config);
  return data;
};


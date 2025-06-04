import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://192.168.1.85:8080';

export const registerUser = async (email: string, password: string, username: string, firstName: string, lastName: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, firstName, lastName }),
  });

    
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Signup failed: ${errorText}`);
  }
};


export const verifyCode = async (email: string, code: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, verificationCode: code}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Signup failed: ${errorText}`);
  }
};

export async function loginUser(email: string, password: string): Promise<{ token: string; expiresIn: number }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  return await response.json(); 
};

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync('userToken', token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('userToken');
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync('userToken');
};





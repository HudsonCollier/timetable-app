const API_BASE_URL = 'http://192.168.1.85:8080';

export const registerUser = async (email: string, password: string, username: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
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
}



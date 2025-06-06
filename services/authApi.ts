import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://192.168.1.85:8080";
// const API_BASE_URL = "http://timetables-backend-production.up.railway.app";

/**
 * Used in order to register a new user
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, firstName, lastName }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Signup failed: ${errorText}`);
  }
};

/**
 * Verifies the code that was sent to the users email upon registration
 * @param email - users email
 * @param code - 6-digit verification code
 */
export const verifyCode = async (
  email: string,
  code: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, verificationCode: code }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Signup failed: ${errorText}`);
  }
};

/**
 * Logs in a user
 * @returns - THe JWT token for the user and the time in which that token will expire
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string; expiresIn: number }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  return await response.json();
}

/**
 * Saves the JWT token that is generated once a user logs in
 *
 * @param token - THe JWT token
 */
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("userToken", token);
};

/**
 * Getter method for the JWT token
 *
 * @returns - The JWT token
 */
export const getToken = async () => {
  return await SecureStore.getItemAsync("userToken");
};

/**
 * Deletes the JWT token
 */
export const deleteToken = async () => {
  await SecureStore.deleteItemAsync("userToken");
};

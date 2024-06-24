import { HotelAdd } from "./types/hotel";
import { UserLogin, UserRegister } from "./types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: UserRegister) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
};

export const login = async (formData: UserLogin) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Token invalid");
  }

  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error during logout");
  }
};

export const addMyHotel = async (data: HotelAdd) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add hotel");
  }

  return res.json();
};

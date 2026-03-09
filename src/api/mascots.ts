import { API_BASE_URL } from "../config/api";

export const getMascots = async () => {
  const res = await fetch(`${API_BASE_URL}/mascots`);
  return res.json();
};

export const getMascotById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/mascots/${id}`);
  return res.json();
};

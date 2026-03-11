import { API_BASE_URL } from "../config/api";

export const getMascots = async (
  searchName: string,
  bornBefore: string,
  bornAfter: string,
) => {
  const res = await fetch(
    `${API_BASE_URL}/mascots?name=${searchName}&bornBefore=${bornBefore}&bornAfter=${bornAfter}`,
  );
  return res.json();
};

export const getMascotById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/mascots/${id}`);
  return res.json();
};

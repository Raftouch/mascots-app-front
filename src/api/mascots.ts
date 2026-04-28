import { API_BASE_URL } from "../config/api";

export const getMascots = async (
  searchName: string,
  bornBefore: string,
  bornAfter: string,
) => {
  const res = await fetch(
    `${API_BASE_URL}/mascots?name=${searchName}&bornBefore=${bornBefore}&bornAfter=${bornAfter}`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

export const getMascotById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

export const createMascot = async (formData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/mascots`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

export const updateMascot = async (id: string, formData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

export const removeMascot = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

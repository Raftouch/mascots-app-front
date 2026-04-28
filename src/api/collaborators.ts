import { API_BASE_URL } from "../config/api";

export const getCollaborators = async () => {
  const res = await fetch(`${API_BASE_URL}/collaborators`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};
export const getCollaboratorById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/collaborators/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};

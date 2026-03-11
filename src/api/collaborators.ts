import { API_BASE_URL } from "../config/api";

export const getCollaborators = async () => {
  const res = await fetch(`${API_BASE_URL}/collaborators`);
  return res.json();
};
export const getCollaboratorById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/collaborators/${id}`);
  return res.json();
};

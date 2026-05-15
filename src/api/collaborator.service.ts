import { API_BASE_URL } from "../config/api";

export default class CollaboratorService {
  static async getAll(searchName: string, page: number) {
    const params = new URLSearchParams({
      name: searchName,
      page: String(page),
    });

    const res = await fetch(`${API_BASE_URL}/collaborators?${params}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }

  static async getById(id: string) {
    const res = await fetch(`${API_BASE_URL}/collaborators/${id}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }
}

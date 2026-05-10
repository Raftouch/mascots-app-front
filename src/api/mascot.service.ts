import { API_BASE_URL } from "../config/api";

export default class MascotService {
  static async getAll(
    searchName: string,
    bornBefore: string,
    bornAfter: string,
  ) {
    const res = await fetch(
      `${API_BASE_URL}/mascots?name=${searchName}&bornBefore=${bornBefore}&bornAfter=${bornAfter}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }

  static async getById(id: string) {
    const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }

  static async create(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/mascots`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }

  static async update(id: string, formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }

  static async remove(id: string) {
    const res = await fetch(`${API_BASE_URL}/mascots/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return res.json();
  }
}

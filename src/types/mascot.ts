import type { Collaborator } from "./collaborator";

export type Mascot = {
  _id: string;
  name: string;
  collaborator: Collaborator;
  breed: string;
  gender: Gender;
  birthDate: string;
  imageName?: string;
  description: string;
  joinedAt: string;
};

export type Gender = "Male" | "Female";

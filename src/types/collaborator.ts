import type { Mascot } from "./mascot";

export type Collaborator = {
  _id: string;
  name: string;
  mascotsByCollaborator: Mascot[];
};

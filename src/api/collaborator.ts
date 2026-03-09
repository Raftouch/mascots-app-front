export const getCollaborators = async () => {
  const res = await fetch("http://localhost:4000/collaborators");
  return res.json();
};
export const getCollaboratorById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/collaborators/${id}`);
  return res.json();
};

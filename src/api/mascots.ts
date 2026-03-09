export const getMascots = async () => {
  const res = await fetch("http://localhost:4000/mascots");
  return res.json();
};

export const getMascotById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/mascots/${id}`);
  return res.json();
};

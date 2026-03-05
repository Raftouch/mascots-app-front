import { useEffect } from "react";

const fetchCollaborators = async () => {
  try {
    const res = await fetch("http://localhost:4000/collaborators");
    const data = await res.json();
    console.log("data : ", data);
  } catch (error) {
    console.error("Error fetching collaborators", error);
  }
};

export default function CollaboratorList() {
  useEffect(() => {
    fetchCollaborators();
  }, []);
  return <div></div>;
}

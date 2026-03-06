import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CollaboratorCard() {
  const { id } = useParams();

  const getCollaboratorDetails = async () => {
    try {
      const res = await fetch(`http://localhost:4000/collaborators/${id}`);
      const data = await res.json();
      console.log("collab id : ", id);
      console.log("data : ", data);
    } catch (error) {
      console.error("Error getting collaborator details", error);
    }
  };

  useEffect(() => {
    getCollaboratorDetails();
  }, [id]);

  return <></>;
}

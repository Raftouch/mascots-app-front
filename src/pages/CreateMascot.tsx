import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Collaborator } from "../types/collaborator";
import { getCollaboratorById } from "../api/collaborators";
import { createMascot } from "../api/mascots";
import type { Gender } from "../types/mascot";

export default function CreateMascot() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  //   const [searchParams] = useSearchParams();
  //   const collaboratorId = searchParams.get("collaborator");
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

  useEffect(() => {
    const getCollaboratorDetails = async (id: string) => {
      try {
        const data = await getCollaboratorById(id);
        console.log("data : ", data.collaborator);
        setCollaborator(data.collaborator);
      } catch (error) {
        console.error("Error getting collaborator details", error);
      }
    };

    if (!id) return;
    getCollaboratorDetails(id);
  }, [id]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate);
    formData.append("description", description);
    formData.append("collaborator", id!);

    console.log(Object.fromEntries(formData));

    try {
      await createMascot(formData);
      console.log("Mascot : ", Object.fromEntries(formData));
      alert("Mascot created");
    } catch (error) {
      console.error("Error creating mascot", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            value={name}
            className="border"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Breed</label>
          <input
            value={breed}
            className="border"
            type="text"
            name="breed"
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            value={gender}
            className="border"
            onChange={(e) => setGender(e.target.value as Gender)}
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Birthdate</label>
          <input
            value={birthDate}
            className="border"
            type="date"
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            className="border"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Collaborator</label>
          <input
            value={collaborator?.name || ""}
            className="border"
            type="text"
            name="collaborator"
            disabled
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

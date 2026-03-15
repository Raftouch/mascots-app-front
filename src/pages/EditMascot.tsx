import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMascotById, updateMascot } from "../api/mascots";
import type { Gender } from "../types/mascot";

export default function EditMascot() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMascotDetails = async (id: string) => {
      try {
        const data = await getMascotById(id);
        console.log("data : ", data.mascot);
        setName(data.mascot.name);
        setBreed(data.mascot.breed);
        setGender(data.mascot.gender);
        setBirthDate(data.mascot.birthDate.split("T")[0]);
        setDescription(data.mascot.description);
        setImage(data.mascot.image);
      } catch (error) {
        console.error("Error getting collaborator details", error);
      }
    };

    if (!id) return;
    getMascotDetails(id);
  }, [id]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate);
    if (image) formData.append("image", image);
    formData.append("description", description);

    console.log(Object.fromEntries(formData));

    try {
      await updateMascot(id!, formData);
      console.log("Mascot : ", Object.fromEntries(formData));
      alert("Mascot updated");
      if (id) navigate(`/mascots/${id}`, { replace: true });
    } catch (error) {
      console.error("Error creating mascot", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Mascot</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            value={name}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Breed
          </label>
          <input
            value={breed}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="breed"
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={gender}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Birthdate
          </label>
          <input
            value={birthDate}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <input
            accept="image/*"
            className="border border-gray-300 rounded-md p-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            type="file"
            name="image"
            onChange={(e) => {
              if (e.target.files) setImage(e.target.files[0]);
              console.log(e.target.files);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            className="border border-gray-300 rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

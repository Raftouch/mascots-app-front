import { useEffect } from "react";

const fetchMascots = async () => {
  try {
    const res = await fetch("http://localhost:4000/");
    const data = await res.json();
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching mascots", error);
  }
};

export default function Dashboard() {
  useEffect(() => {
    fetchMascots();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

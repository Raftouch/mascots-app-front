import { useEffect } from "react";

const fetchMascots = async () => {
  try {
    const res = await fetch("http://localhost:4000/mascots");
    const data = await res.json();
    console.log("data mascots : ", data);
  } catch (error) {
    console.error("Error fetching mascots", error);
  }
};

export default function MascotList() {
  useEffect(() => {
    fetchMascots();
  }, []);
  return <div></div>;
}

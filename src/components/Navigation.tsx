import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="text-xl font-semibold">LOGO</div>
      <div className="flex gap-3 text-sm items-center font-medium">
        <Link to="/">Dashboard</Link>
        <Link to="/collaborators">Collaborators</Link>
        <Link to="/mascots">Mascots</Link>
      </div>
    </div>
  );
}

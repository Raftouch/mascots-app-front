import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Collaborators from "./pages/Collaborators";
import Mascots from "./pages/Mascots";
import CollaboratorCard from "./components/CollaboratorCard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/collaborators/:id" element={<CollaboratorCard />} />
        <Route path="/mascots" element={<Mascots />} />
      </Routes>
    </div>
  );
}

export default App;

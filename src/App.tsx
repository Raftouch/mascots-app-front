import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Collaborators from "./pages/Collaborators";
import Mascots from "./pages/Mascots";
import CollaboratorCard from "./pages/CollaboratorDetails";
import MascotCard from "./pages/MascotDetails";
import Layout from "./components/Layout";
import CreateMascot from "./pages/CreateMascot";
import EditMascot from "./pages/EditMascot";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/collaborators/:id" element={<CollaboratorCard />} />
          <Route path="/mascots/:id" element={<MascotCard />} />
          <Route path="/mascots/:id/edit" element={<EditMascot />} />
          <Route path="/mascots" element={<Mascots />} />
          <Route
            path="/collaborators/:id/mascots/new"
            element={<CreateMascot />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Collaborators from "./pages/Collaborators";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/collaborators" element={<Collaborators />} />
      </Routes>
    </div>
  );
}

export default App;

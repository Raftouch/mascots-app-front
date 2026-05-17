import CollaboratorDetails from "../pages/CollaboratorDetails";
import Collaborators from "../pages/Collaborators";
import CreateMascot from "../pages/CreateMascot";
import Dashboard from "../pages/Dashboard";
import EditMascot from "../pages/EditMascot";
import LoginPage from "../pages/LoginPage";
import MascotDetails from "../pages/MascotDetails";
import Mascots from "../pages/Mascots";
import RegisterPage from "../pages/RegisterPage";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/collaborators", element: <Collaborators /> },
  { path: "/collaborators/:id", element: <CollaboratorDetails /> },
  { path: "/mascots", element: <Mascots /> },
  { path: "/mascots/:id", element: <MascotDetails /> },
  { path: "/mascots/:id/edit", element: <EditMascot /> },
  {
    path: "/collaborators/:id/mascots/new",
    element: <CreateMascot />,
  },
];

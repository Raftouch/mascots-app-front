import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { routes } from "../router";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

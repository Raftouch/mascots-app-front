import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { publicRoutes, privateRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "./UI/Loader/Loader";

export default function AppRouter() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const isAuth = user ? true : false;

  if (authLoading) return <Loader />;

  return (
    <Routes>
      <Route element={<Layout />}>
        {isAuth ? (
          <>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

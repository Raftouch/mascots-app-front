import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}

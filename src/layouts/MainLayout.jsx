import { Outlet } from "react-router-dom";
import Footer from "../sections/Footer";
import Navbar from "../sections/Navbar";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

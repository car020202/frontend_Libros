import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}
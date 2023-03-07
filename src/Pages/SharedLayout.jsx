import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="footer">footer</footer>
    </>
  );
};

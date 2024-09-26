import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Head } from "../components/Head";
import { Dashboard } from "./Dashboard";
import { Aside } from "../components/Aside";
import "../styles/Home.css";
import { AlertModal } from "../utils/AlertModal";
import { useUser } from "../context/UserProvider";

export const Home = ({ onLogout, auth }) => {
  const isAccountPage = useLocation().pathname === "/home";
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {
    console.log(user)
    if (!auth) {
      AlertModal("Ruta restringida", "Tienes que iniciar sesión", "error").then(() => {
        navigate("/login");
      })
    }
  }, [auth]);

  return (
    <>
      <div className={`view-layout`}>
        <Aside />
        <main className="main-content">
          <Head login={true} logout={onLogout} />
          {/* Si vuelvo a /home, vuelvo a mostrar el Dashboard */}
          {isAccountPage && <Dashboard />}
          <Outlet />
        </main>
      </div>
    </>
  );
};

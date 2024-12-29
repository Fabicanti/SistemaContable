import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Head } from "../components/Semantic/Head";
import { Dashboard } from "./Dashboard";
import { Aside } from "../components/Semantic/Aside/Aside";
import { AlertModal } from "../utils/AlertModal";
import "../styles/Home.css";
import { Footer } from "../components/Semantic/Footer";

export const Home = ({ onLogout, auth }) => {
  const isAccountPage = useLocation().pathname === "/";
  const navigate = useNavigate();

  useEffect(() => {
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
        {/* <Footer auth={auth} /> */}
      </div>
    </>
  );
};


import { FcConferenceCall, FcDebt, FcReading, FcCurrencyExchange } from "react-icons/fc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sizeIcon = 96;

export const DashboardMenu = ({ cantUsuarios, cantMov, cantAstos }) => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Inicio"
  }, [])

  return (
    <>
      <div className="dash-menu">
        <div className="dash-element" onClick={() => navigate("/home/users")}>
          <div className="dash-data">
            <h4>Usuarios</h4>
            <h2 className="text-data">{cantUsuarios}</h2>
          </div>
          <FcConferenceCall size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element"  onClick={() => navigate("/home/movements")}>
          <div className="dash-data">
            <h4>Movimientos</h4>
            <h2 className="text-data">{cantMov}</h2>
          </div>
          <FcCurrencyExchange size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element" onClick={() => navigate("/home/books")}>
          <div className="dash-data">
            <h4>Libro Mayor</h4>
          </div>
          <FcReading size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element"  onClick={() => navigate("/home/movements")}>
          <div className="dash-data">
            <h4>Asientos</h4>
            <h2 className="text-data">{cantAstos}</h2>
          </div>
          <FcDebt size={sizeIcon} className="icon-dash" />
        </div>
      </div>
    </>
  );
};

import { FcConferenceCall, FcDebt, FcReading, FcCurrencyExchange } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";

const sizeIcon = 96;

export const DashboardMenu = ({ cantUsuarios, cantMov }) => {

  useEffect(() => {
    document.title = "Inicio"
  }, [])

  return (
    <>
      <div className="dash-menu">
        <div className="dash-element">
          <div className="dash-data">
            <h3>Usuarios</h3>
            <h2 className="text-data">{cantUsuarios}</h2>
          </div>
          <FcConferenceCall size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Movimientos</h3>
            <h2 className="text-data">{cantMov}</h2>
          </div>
          <FcDebt size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Libro Mayor</h3>
          </div>
          <FcReading size={sizeIcon} className="icon-dash" />
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Asientos</h3>
            <h2 className="text-data">{' $1500.00'}</h2>
          </div>
          <FcCurrencyExchange size={sizeIcon} className="icon-dash" />
        </div>
      </div>
    </>
  );
};

import { FcConferenceCall, FcDebt, FcReading, FcCurrencyExchange } from "react-icons/fc";
import { useFetchGET } from "../../hooks/useFetchGET";
import { useEffect } from "react";

// Prueba - Se puede optimizar
// const urlCountUsers = "http://localhost:8080/api/userscount"

export const DashboardMenu = ({cantUsuarios, cantMov}) => {

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
          <FcConferenceCall size={96} />
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Movimientos</h3>
            <h2 className="text-data">{cantMov}</h2>
          </div>
          <FcDebt size={96} />
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Libro Mayor</h3>  
          </div>
          <FcReading size={96}/>
        </div>
        <div className="dash-element">
          <div className="dash-data">
            <h3>Salario</h3>
            <h2 className="text-data">{' $1500.00'}</h2>
          </div>
          <FcCurrencyExchange size={96}/>
        </div>
      </div>
    </>
  );
};

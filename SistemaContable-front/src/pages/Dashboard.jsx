
import "../styles/ArticleHomePage.css";
import { useFetchGET } from "../hooks/useFetchGET";

const urlUsers = "http://localhost:8080/api/usuarios"

export const Dashboard = () => {

  const { state }  = useFetchGET(urlUsers);
  const {data, isLoading, errors } = state;

  return (
    // Otro componente...
    <div className="table-users">
      <h1>Usuarios registrados</h1>
      {isLoading ? (
        <h2>Cargando..</h2>
      ) : errors ? (
        <h2>Error al cargar los usuarios: {errors.message}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Tipo de rol</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <th>{element.id}</th>
                <th>{element.username}</th>
                <th>{element.role}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

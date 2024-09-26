import { useFetchGET } from "../hooks/useFetchGET";
import { DashboardMenu } from "../components/Dashboard/DashboardMenu";
import "../styles/Dashboard.css";

const urlUsers = "http://localhost:8080/api/usuarios";

export const Dashboard = () => {
  const { state } = useFetchGET(urlUsers);
  const { data, isLoading, errors } = state;

  return (
    <div className="dash-container">
      <DashboardMenu />
    </div>
  );
};

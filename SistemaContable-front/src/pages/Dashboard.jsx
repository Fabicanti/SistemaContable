import { DashboardMenu } from "../components/Dashboard/DashboardMenu";
import "../styles/Dashboard.css";
import { useDashboard } from "../hooks/useDashboard";
import { useUser } from "../context/UserProvider";


export const Dashboard = () => {
    const { user } = useUser()
    const { data } = useDashboard(user?.id);

    return (
        <div className="dash-container">
            <DashboardMenu
                cantUsuarios={data?.cantidadTotalUsuarios} 
                cantMov={data?.cantidadMovimientos} 
                cantAstos={data?.cantidadAsientos} />
        </div>
    );
};

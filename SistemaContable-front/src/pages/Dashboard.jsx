
import "../styles/ArticleHomePage.css";
import { useFetchGET } from "../hooks/useFetchGET";

const urlUsers = "http://localhost:8080/api/usuarios"

export const Dashboard = () => {

  const { state }  = useFetchGET(urlUsers);
  const {data, isLoading, errors } = state;

  return (
    <div></div>
  );
};

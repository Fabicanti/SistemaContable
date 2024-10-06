import { useEffect } from "react";
import { AccountMenu } from "../components/Account/AccountMenu";
import { AccountTable } from "../components/Account/AccountTable";
import { useFetchGET } from "../hooks/useFetchGET";
import "../styles/Account.css"

const urlAllAccount = "http://localhost:8080/api/cuentas";

export const Account = () => {

    const { state, fetchGet } = useFetchGET(urlAllAccount);

    useEffect(() => {
        document.title = "Cuentas";
    }, []);

    return (
        <div className="account-container">
            <AccountMenu/>
            <AccountTable datas={state} fetchGet={fetchGet}/>
        </div>
    )
};

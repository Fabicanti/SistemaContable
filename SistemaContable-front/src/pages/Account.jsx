import { useEffect } from "react";
import { AccountMenu } from "../components/Account/AccountMenu";
import { AccountTable } from "../components/Account/AccountTable";
import { useFetchGET } from "../hooks/useFetchGET";
import "../styles/Account.css"
import { useAccount } from "../hooks/useAccount";
import { useUser } from "../context/UserProvider";

const urlAllAccount = "http://localhost:8080/api/cuentas";

export const Account = () => {

    const { user } = useUser()

    const { state, fetchGet } = useFetchGET(urlAllAccount);

    const { handleDeleteAccount } = useAccount();

    useEffect(() => {
        document.title = "Cuentas";
    }, []);

    return (
        <div className="account-container">
            <AccountMenu roles={user?.roleId}/>
            <AccountTable datas={state} fetchGet={fetchGet} onDelete={handleDeleteAccount} roles={user?.roleId}/>
        </div>
    )
};

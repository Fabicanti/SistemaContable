import { useEffect } from "react";
import { AccountMenu } from "../components/Account/AccountMenu";
import { AccountTable } from "../components/Account/AccountTable";
import { useAccount } from "../hooks/useAccount";
import { useUser } from "../context/UserProvider";
import { useAccounts } from "../context/AccountProvider";
import "../styles/Account.css"


export const Account = () => {

    const { user } = useUser()

    const { accounts, fetchGetAccounts, isLoading } = useAccounts();

    const { handleDeleteAccount, handleAddAccount } = useAccount();

    useEffect(() => {
        document.title = "Cuentas";
    }, []);

    return (
        <div className="account-container">
            <AccountMenu roles={user?.roleId} addAccount={handleAddAccount} fetchtable={fetchGetAccounts} accountTable={accounts}/>
            <AccountTable datas={accounts} fetchGet={fetchGetAccounts} onDelete={handleDeleteAccount} roles={user?.roleId} isLoading={isLoading}/>
        </div>
    )
};

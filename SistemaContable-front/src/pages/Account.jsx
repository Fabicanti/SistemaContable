import { useEffect } from "react";
import { AccountMenu } from "../components/Account/AccountMenu";
import "../styles/Account.css"

export const Account = () => {

    useEffect(() => {
        document.title = "Cuentas";
    }, []);

    return (
        <div className="account-container">
            <AccountMenu/>
        </div>
    )
};

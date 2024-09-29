import { useEffect } from "react";

export const Account = () => {

  useEffect(() => {
    document.title = "Cuentas";
    return () => (document.title = "Inicio");
  }, []);

  return <div>Account</div>;
};

import React, { createContext, useContext, useEffect, useState } from 'react'

const AccountsContext = createContext();

const urlAllAccount = "http://localhost:8080/api/cuentas";

export const AccountProvider = ({ children }) => {

  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGetAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(urlAllAccount);
      const data = await response.json();
      setAccounts(data);
      localStorage.setItem("accounts", JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accounts.length === 0) {
      fetchGetAccounts();
    }
  }, []);

  return (
    <AccountsContext.Provider value={{ accounts, fetchGetAccounts, isLoading, error }}>
      {children}
    </AccountsContext.Provider>
  )
}

export const useAccounts = () => useContext(AccountsContext);
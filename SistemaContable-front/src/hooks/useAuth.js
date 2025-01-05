import { useReducer } from "react";
import { loginReducer } from "../reducer/loginReducer"
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useAccounts } from "../context/AccountProvider";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: null
}

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navigate = useNavigate();

  // Contexts.
  const { setUser } = useUser();
  const { fetchGetAccounts } = useAccounts();

  const handleLogin = (user) => {
    dispatch({
      type: 'login',
      payload: user
    });
    sessionStorage.setItem('login', JSON.stringify({
      isAuth: true,
      user
    }));
    setUser(user);
    fetchGetAccounts();
    navigate("/");
  };

  const handleLogout = () => {
    dispatch({
      type: 'logout'
    });
    setUser(null);
    navigate('/login');
    sessionStorage.removeItem('login');
    localStorage.removeItem('accounts');
  };

  return {
    login,
    handleLogin,
    handleLogout
  };
};



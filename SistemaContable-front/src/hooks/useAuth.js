import { useReducer } from "react";
import { loginReducer } from "../reducer/loginReducer"
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: null
}

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const { setUser } = useUser();
  const navigate = useNavigate();

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
    navigate("/home");
  };

  const handleLogout = () => {
    dispatch({
      type: 'logout'
    });
    setUser(null);
    navigate('/login');
    sessionStorage.removeItem('login');
  };

  return {
    login,
    handleLogin,
    handleLogout
  };
};



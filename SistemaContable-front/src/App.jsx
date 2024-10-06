import {
  Route,
  Routes
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Preview } from "./pages/Preview";
import { Home } from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import { Account } from "./pages/Account";
import { Users } from "./pages/Users";
import { Movements } from "./pages/Movements";

export const App = () => {
  const { login, handleLogin, handleLogout } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<Home onLogout={handleLogout} auth={login.isAuth}/>}
        >
          <Route path="account" element={<Account />} />
          <Route path="users" element={<Users />}/>
          <Route path="movements" element={<Movements/>} />
        </Route>
      </Routes>
    </>
  );
};

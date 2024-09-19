import { useForm } from "../hooks/useForm";
import { Head } from "../components/Head";
import { LoginForm } from "../components/Login/LoginForm";
import { useUser } from "../context/UserProvider";
import { LoginAside } from "../components/Login/LoginAside";
import avatar from '../assets/login/avatar-login.svg'
import website from '../assets/login/website-login.svg'
import "../styles/FormLoginRegister.css"

export const Login = ({onLogin}) => {
    return (
        <>
            <Head />
            <div className="containerLogin">
                <LoginAside websiteLogin={website}/>
                <LoginForm avatarLogin={avatar} login={onLogin} form={useForm} user={useUser}/>
            </div>
        </>
    );
};

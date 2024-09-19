import { useForm } from "../hooks/useForm";
import { Head } from "../components/Head";
import { RegisterForm } from "../components/Register/RegisterForm";
import { RegisterAside } from "../components/Register/RegisterAside";
import websiteSign from '../assets/register/website-register.svg'
import avatarSign from '../assets/register/avatar-register.svg'
import "../styles/Register.css"

export const Register = () => {

    return (
        <>
            <Head />
            <div className="containerLogin sign">
                <RegisterForm avatarRegister={avatarSign} form={useForm}/>
                <RegisterAside websiteRegister={websiteSign}/>
            </div>
        </>
    )
}

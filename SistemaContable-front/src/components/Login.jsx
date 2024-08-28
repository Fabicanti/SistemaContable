import { useForm } from "./hooks/useForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css"
import { Head } from "./Head";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const initialForm = {
        username: "",
        password: "",
    };

    const { formState, setFormState, onInputChange } = useForm(initialForm);

    const { username, password } = formState;

    const onSumbit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/usuarios/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });

        if (response.ok){
            navigate('/home');
        }else{
            alert('error en el inicio de sesión');
        }
    };

    return (
        <>
            <Head />
            <div className="componentForm">
                <Form onSubmit={onSumbit}>
                    <h2>Iniciar sesion</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresar nombre de usuario.."
                            required={true}
                            name="username"
                            value={username}
                            onChange={onInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese contraseña.."
                            required={true}
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Recordar usuario" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Iniciar sesion
                    </Button>
                    <p>¿No tienes cuenta? <Link className="abc" to="/register"><b>Registrate</b></Link></p>


                </Form>
            </div>
        </>
    );
};

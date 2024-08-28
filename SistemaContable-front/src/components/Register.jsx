import { useForm } from "./hooks/useForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Head } from "./Head";
import "../styles/Register.css"

export const Register = () => {

    const navigate = useNavigate();

    const initialForm = {
        username: "",
        password: "",
        role: ""
    };

    const { formState, setFormState, onInputChange } = useForm(initialForm);

    const { username, password, role } = formState;

    const onClean = () => {
        setFormState(initialForm);
    }

    const onSumbit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/usuarios/registrar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });

        if (response.ok) {
            navigate('/login');
        } else {
            alert('Error en la registración');
        }
    };

    return (
        <>
            <Head />
            <div className="componentForm">
                <Form onSubmit={onSumbit}>
                    <h2>Registrarse</h2>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de usuario</Form.Label>
                        <Form.Select aria-label="Default select example" name="role" value={role} onChange={onInputChange}>
                            <option value="USER">Usuario</option>
                            <option value="SUPERUSER">Administrador</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" id="submit">
                        <Button variant="dark" type="submit">
                            Registrarse
                        </Button>

                        <Button variant="dark" type="reset" onClick={onClean}>
                            Intentar de nuevo
                        </Button>

                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

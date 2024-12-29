
import { useForm } from '../../hooks/useForm'
import { EmployeersAddPersonal } from './EmployeersAddPersonal';
import { EmployeersAddLabor } from './EmployeersAddLabor';

const initialForm = {
    nombre: "",
    apellido: "",
    fechaIngreso: "",
    cuit: "",
    sexo: "",
    email: "",
    salario: "",
    fechaNacimiento: "",
    puesto: "",
    lugarResidencia: "",
    domicilio: "",
    hijos: "",
    telefono: "",
    estado: "ACTIVO"
}

export const EmployeersAdd = () => {

    const { formState, setFormState, onInputChange } = useForm(initialForm);

    const onSumbit = (event) => {
        event.preventDefault();
        console.log(formState);
    }

    const clearForm = () => {
        setFormState(initialForm);
    }

    return (
        <form onSubmit={onSumbit} className='emp-form-container'>
            <EmployeersAddPersonal formState={formState} onInputChange={onInputChange} />
            <EmployeersAddLabor formState={formState} onInputChange={onInputChange} />
            <div className='emp-btn'>
                <button onClick={clearForm} type='button' className='btn-emp clean'>Limpiar</button>
                <button type='submit' className='btn-emp save'>Guardar</button>
            </div>
        </form>
    )
}

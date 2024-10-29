import React, { useEffect, useState } from 'react'
import { BooksTable } from './BooksTable'
import { useForm } from '../../hooks/useForm';
import { BiSolidFilePdf } from 'react-icons/bi';
import { AlertModal } from '../../utils/AlertModal';

const initialDate = () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    return {
        cuentaId: 0,
        desde: formattedDate,
        hasta: formattedDate
    }
}

export const BooksMenu = ({ dataNameAccountsMov, dataTableBook, downloadPDFBooks }) => {

    const { formState, onInputChange, setFormState } = useForm(initialDate);
    const { desde, hasta, cuentaId } = formState;

    const { state: namesAccountMov, fetchGet: fetchNamesAccountMov } = dataNameAccountsMov();
    const { data: namesAccountData, isLoading } = namesAccountMov;

    const [bookTableAccount, setBookTableAccount] = useState([])

    useEffect(() => {
        console.log(namesAccountData);
    }, [namesAccountData])


    const handleApplyFilters = () => {
        if (cuentaId === 0){
            AlertModal("Error en la selección de cuenta", "Tienes que elegir una cuenta", "error")
            return
        }
        const datos = {
            cuentaId: cuentaId,
            fechaInicio: desde,
            fechaFin: hasta

        }
        // setBookTableAccount(dataTableBook(datos));
        dataTableBook(datos).then((result) => {
            setBookTableAccount(result); // Aquí debería mostrar los datos correctamente
        });
    };

    const handleClearFilters = () => {
        setFormState(initialDate);
    };

    const downloadPDF = () => {
        if (cuentaId === 0){
            AlertModal("Error en la selección de cuenta", "Tienes que elegir una cuenta", "error")
            return
        }
        const datos = {
            cuentaId: cuentaId,
            fechaInicio: desde,
            fechaFin: hasta

        }
        downloadPDFBooks(datos)
    }


    return (
        <div className="content-book">
            <div className="title-book">
                <h3>Libro Mayor</h3>
            </div>
            <div className='options-mov-table'>
                <div className="mov-data-one">
                    <div className='filter-date'>
                        <div className='input-date'>
                            <label htmlFor="desde" className='since'>Desde</label>
                            <input
                                type="date"
                                className='input-sin'
                                disabled={namesAccountData?.length === 0}
                                name='desde'
                                value={desde}
                                onChange={onInputChange} />
                        </div>
                        <div className='input-date'>
                            <label htmlFor="hasta" className='until'>Hasta</label>
                            <input
                                type="date"
                                className='input-unt'
                                disabled={namesAccountData?.length === 0}
                                name='hasta'
                                value={hasta}
                                onChange={onInputChange} />
                        </div>
                    </div>

                    <div className='input-selection'>
                        <label htmlFor="select">Cuenta del Libro Mayor</label>
                        <select name="cuentaId" value={cuentaId} className='select-book' onChange={onInputChange}>
                            <option value={0}>Selecciona una cuenta..</option>
                            {namesAccountData && namesAccountData.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='button-filter'>
                        <button type='button' className='btn-clear' onClick={handleClearFilters}>Limpiar</button>
                        <button
                            type='button'
                            className={`btn-apply`}
                            onClick={handleApplyFilters}>
                            Aplicar cambios
                        </button>
                    </div>
                </div>

                <div className="mov-data-two">
                    <button type='button' className='btn-pdf' onClick={downloadPDF}><BiSolidFilePdf size={36} /></button>
                </div>
            </div>
            <BooksTable datasTable={bookTableAccount}/>
        </div>
    )
}

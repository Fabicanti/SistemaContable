import React, { useEffect } from 'react'

export const BooksTable = ({ datasTable }) => {

    useEffect(() => {
      console.log(datasTable)
    }, [datasTable])
    
    // De timestamp a Date "yyyy-mm-dd"
    const formatFecha = (timestamp) => {
        const date = new Date(timestamp + (24 * 60 * 60 * 1000));
        return date.toLocaleDateString('es-ES');
    };

    return (
        <div className="table-book">
            {datasTable?.length === 0
                ?
                <div className="alert alert-light" role="alert">
                    Sin datos de los movimientos
                </div>
                :
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" className='col-table'>FECHA</th>
                            <th scope="col" className='col-table'>DESCRIPCIÓN</th>
                            <th scope="col" className='col-table'>DEBE</th>
                            <th scope="col" className='col-table'>HABER</th>
                            <th scope="col" className='col-table'>SALDO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasTable.map((element, index) => (
                            <tr key={index}>
                                <td>{formatFecha(element.fecha)}</td>
                                <td>{element.descripcion}</td>
                                <td>{element.debe}</td>
                                <td>{element.haber}</td>
                                <td>{element.saldo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </div>
    )
}

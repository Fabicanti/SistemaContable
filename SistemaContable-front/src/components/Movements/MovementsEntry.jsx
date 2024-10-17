import { Column } from 'primereact/column';
import { CiCircleRemove } from 'react-icons/ci';

export const MovementsEntry = ({ datas = [], onDelete }) => {

    return (
        <div className="custom-table-wrappers">
            {datas.length === 0
                ? <div className="alert alert-light" role="alert">
                    Sin Movimientos
                </div>
                : <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">CUENTA</th>
                            <th scope="col">DEBE</th>
                            <th scope="col">HABER</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((element, index) => (
                            <tr key={index}>
                                <th >{element.cuenta}</th>
                                <th >{element.debe}</th>
                                <th >{element.haber}</th>
                                <td>
                                    <button
                                        type='button'
                                        className='btn-delete'
                                        onClick={() => onDelete(element)}><CiCircleRemove size={36} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </div>
    )
}

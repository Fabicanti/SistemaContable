import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5';
import { MovementsAdd } from './MovementsAdd';


export const MovementsModal = ({ roles, fetchGet, dataNamesAccount, handleAddAsientos, dataAllAccount}) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openAddModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button
                type="button"
                className="btn-add-mov"
                onClick={openAddModal}
            >
                <div className='text-btn'>Registrar Asiento</div>
                <IoAddOutline size={36} className="icon-add" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Registrar Asiento
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <MovementsAdd 
                                    fetchget={fetchGet} 
                                    roles={roles}
                                    dataAllAccount={dataAllAccount}
                                    dataNamesAccount={dataNamesAccount}
                                    handleAddAsientos={handleAddAsientos}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

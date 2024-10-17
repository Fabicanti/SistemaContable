import React, { useState } from 'react'
import { AccountTable } from '../Account/AccountTable';

export const MovementsModalTable = ({ datas, fetchGet, roles}) => {
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
                className='btn-mov-seat'
                onClick={openAddModal}
            >
                <div className='text-btn'>Plan de Cuentas</div>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Plan de Cuentas
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body" style={{backgroundColor: "#f9f9f9", padding: "0"}}>
                                <AccountTable datas={datas} fetchGet={fetchGet} roles={roles} rows={8}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

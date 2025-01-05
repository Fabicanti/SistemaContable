import React, { useEffect } from 'react'
import { MovementsTable } from '../components/Movements/MovementsTable'
import { MovementsMenu } from '../components/Movements/MovementsMenu'
import { useUser } from '../context/UserProvider';
import { useMovements } from '../hooks/useMovements';
import "../styles/Movements.css"
import { useAccounts } from '../context/AccountProvider';

export const Movements = () => {

    const { accounts, fetchGetAccounts, isLoading } = useAccounts();
    const { user } = useUser();

    const {
        // dataNameAccounts, 
        handleAddAsientos, 
        dataAllAsientos, 
        downloadPDFAsientos, 
        dataAllUsers } = useMovements();

    const { state: allAsientosState, fetch: fetchAllAsientos } = dataAllAsientos();

    useEffect(() => {
        document.title = "Asientos y Movimientos";
    }, []);

    return (
        <div className='mov-container'>
            <MovementsMenu 
                roles={user?.roleId}
                fetchGet={fetchAllAsientos} 
                // dataNamesAccount={dataNameAccounts}
                handleAddAsientos={handleAddAsientos}
                dataAllAsientos={dataAllAsientos}
                dataAllAccount={{ accounts, fetchGetAccounts, isLoading }}
                countAsiento={allAsientosState}
            />
            <MovementsTable
                dataAllAsientos={allAsientosState}
                roles={user?.roleId}
                dataAllAccount={{ accounts, fetchGetAccounts, isLoading }}
                downloadPDFAsientos={downloadPDFAsientos}
                dataAllUsers={dataAllUsers}
            />
        </div>
    )
}

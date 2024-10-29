import React, { useEffect } from 'react'
import { MovementsTable } from '../components/Movements/MovementsTable'
import { MovementsMenu } from '../components/Movements/MovementsMenu'
import { useUser } from '../context/UserProvider';
import { useMovements } from '../hooks/useMovements';
import "../styles/Movements.css"

let countAsientos = 10000;

export const Movements = () => {

    const { user } = useUser()

    const { dataAllAccount, dataNameAccounts, handleAddAsientos, dataAllAsientos, downloadPDFAsientos } = useMovements()
    const { state: allAsientosState, fetch: fetchAllAsientos } = dataAllAsientos();
    
    useEffect(() => {
        document.title = "Asientos y Movimientos";
    }, []);

    return (
        <div className='mov-container'>
            <MovementsMenu 
                roles={user?.roleId}
                fetchGet={fetchAllAsientos} 
                dataNamesAccount={dataNameAccounts}
                handleAddAsientos={handleAddAsientos}
                dataAllAsientos={dataAllAsientos}
                dataAllAccount={dataAllAccount}
                countAsiento={allAsientosState}
            />
            <MovementsTable
                dataAllAsientos={allAsientosState}
                roles={user?.roleId}
                dataAllAccount={dataAllAccount}
                downloadPDFAsientos={downloadPDFAsientos}
            />
        </div>
    )
}

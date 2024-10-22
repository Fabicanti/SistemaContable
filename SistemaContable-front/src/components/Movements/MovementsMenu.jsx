import React, { useEffect } from 'react'
import { MovementsModal } from './MovementsModal'

export const MovementsMenu = ({ roles, fetchGet, dataNamesAccount, handleAddAsientos, dataAllAccount }) => {

  return (
    <div className='mov-menu'>
      <div>Datos de los asientos</div>
      <div className='mov-options'>
        <MovementsModal
          roles={roles}
          fetchGet={fetchGet}
          dataNamesAccount={dataNamesAccount}
          handleAddAsientos={handleAddAsientos}
          dataAllAccount={dataAllAccount}
        />
      </div>
    </div>
  )
}
import React, { useState } from 'react'
import { EmployeersAdd } from './EmployeersAdd';

export const EmployeersMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="component-employeers">
      <div className='content-employeers'>
        <h4>Empleados</h4>

        {/* Botón para mostrar/ocultar contenido */}
        <button 
          onClick={toggleContent} 
          className="toggle-buttons"
        >
          {isOpen ? 'Ocultar Formulario' : 'Agregar Empleado'}
        </button>
      </div>


      {/* Contenido colapsable */}
      <div className={`collapsible ${isOpen ? 'open' : ''}`}>
        <div className="form-employeers">
          <EmployeersAdd/>
        </div>
      </div>
    </div>
  );
}

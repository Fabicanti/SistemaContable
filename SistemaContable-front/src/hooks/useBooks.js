import React, { useCallback } from 'react'
import { useFetchGET } from './useFetchGET';
import { AlertModal } from '../utils/AlertModal';

const urlNameAccountsMovements = "http://localhost:8080/api/libros/nombresMov";
const urlBooksAccount = "http://localhost:8080/api/libros/mayor";
const urlPDFBooks = "http://localhost:8080/api/libros/pdf";

export const useBooks = () => {
    const { state: namesAccountMov, fetchGet: fetchNamesAccountMov } = useFetchGET(urlNameAccountsMovements);

    const dataNameAccountsMov = useCallback( () => {
        return {
            state: namesAccountMov, 
            fetchGet: fetchNamesAccountMov
        }

    }, [namesAccountMov, fetchNamesAccountMov]) 

    const downloadPDFBooks = async (data) => {
        try {
            const response = await fetch( urlPDFBooks, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error("Error al generar el PDF");
            }
    
            const blob = await response.blob(); // Convierte la respuesta en un blob
    
            // Crea una URL de descarga desde el blob
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "LibroMayor.pdf"; // Nombre del archivo
            link.click();
    
            // Limpia la URL después de la descarga
            window.URL.revokeObjectURL(url);
        } catch (error) {
            AlertModal("Error", "Hubo un error en el PDF", "error");
        }
    }

    const dataTableBook = async (data) => {
        const response = await fetch(urlBooksAccount, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok){
            const datas = await response.json();
            const arregloConTimestamps = datas.map(item => {
                const [year, month, day] = item.fecha;
                return {
                    ...item,
                    fecha: Date.UTC(year, month - 1, day)
                };
            });
            return arregloConTimestamps;
        }else{
            AlertModal("Error", "Hubo un error en la carga de datos del libro", "error");
            return []
        }
    }

    return {
        dataNameAccountsMov,
        dataTableBook,
        downloadPDFBooks

    }
}

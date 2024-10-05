import React from 'react'
import { useFetchGET } from './useFetchGET'


export const useDashboard = (idUsuario) => {
    
    const urlDashboard = `http://localhost:8080/api/dashboard/${idUsuario}`
    const { state, fetchGet } = useFetchGET(urlDashboard)
    const { data, isLoading, errors} = state

    return {
        data,
        isLoading,
        errors
    }
}

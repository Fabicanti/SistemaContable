
import { useEffect, useState } from 'react'

export const useFetchGET = (urlGet) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        errors: null
    });
    const fetchGet = async () => {
        if (!urlGet) return
        try {
            
                const response = await fetch(urlGet);
                const datas = await response.json();
                setState({ data: datas, isLoading: false, errors: null });
            
        } catch (error) {
            setState({ data: null, isLoading: false, errors: error.message });
        }
    }

    useEffect(() => {
        if (state.data) return;


        fetchGet()
    }, [urlGet])


    return {
        state,
        fetchGet
    }
}

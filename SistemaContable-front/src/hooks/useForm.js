import React, { useState } from 'react'

export const useForm = (intialForm) => {

    const [formState, setFormState] = useState(intialForm);

    const onInputChange = (e) => {
        // Esto es para los Inputs de PrimeReact
        const { name, value } = e.target ? e.target : { name: e.originalEvent.target.name, value: e.value };
    
        setFormState({
            ...formState,
            [name]: value
        });
    };
    

    return {
        formState,
        setFormState,
        onInputChange
    };
};

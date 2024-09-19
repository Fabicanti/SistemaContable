import React, { useState } from 'react'

export const useForm = (intialForm) => {

    const [formState, setFormState] = useState(intialForm);

    const onInputChange = ({target}) => {
        const {name, value} = target;
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

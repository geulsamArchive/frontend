import { useState } from "react"

export const useForms = () => {
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    }

    const resetValue = () => {
        setValue('');
    };

    return [value, onChange, resetValue];
}
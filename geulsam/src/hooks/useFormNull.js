import { useState } from "react"

export const useFormNull = () => {
    const [value, setValue] = useState(null);
    const onChange = (e) => {
        setValue(e.target.value);
    }

    const resetValue = () => {
        setValue(null);
    };

    return [value, onChange, resetValue];
}
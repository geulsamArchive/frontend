import React, { useState } from 'react';
import SignUp from '../../components/Admin/SignUp';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        schoolNum: '',
        phone: '',
        email: '',
        joinedAt: '',
        birthDay: ''
    })

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1)
    }
    return (
        <div>
            회원가입 페이지
            <SignUp />
        </div>
    );
};

export default Signup;
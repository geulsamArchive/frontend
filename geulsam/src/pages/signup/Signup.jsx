import React, { useState } from 'react';
import SignUp from '../../components/Admin/SignUp';
import Signup1 from './Signup1';
import Signup3 from './Signup3';
import Signup4 from './Signup4';
import Signup5 from './Signup5';
import SignupEnd from './SignupEnd';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        schoolNum: '',
        birthDay: '',
        joinedAt: '',
        email: '',
        phone: '',
        keywords: [],

    })

    const nextStep = (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1)
    }

    const SignupSteps = () => {
        switch (step) {
            case 1:
                return <Signup1 nextStep={nextStep} />;
            case 2:
                return <SignUp nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <Signup3 nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <Signup4 nextStep={nextStep} prevStep={prevStep} />;
            case 5:
                return <Signup5 nextStep={nextStep} prevStep={prevStep} />;
            case 6:
                return <SignupEnd formData={formData} />;
            default:
                return <Signup1 nextStep={nextStep} />;
        }
    }
    return (
        <>
            {SignupSteps()}
        </>
    );
};

export default Signup;
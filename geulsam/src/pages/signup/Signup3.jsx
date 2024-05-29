import React from 'react';
import { useForms } from '../../hooks/useForms';
import { Wrapper, Form, Input, Inputs, Button, InputTitle, Silver, FormTop, BackButton, WhiteButtons, LeftAlign } from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png'

const Signup3 = ({ prevStep, nextStep }) => {

    const [email, onChangeEmail] = useForms();
    const [phone, onChangePhone] = useForms();

    const handleNext = () => {
        nextStep({ email, phone })
    }

    return (
        <Wrapper>
            <Form>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        2/4
                    </Silver>
                </FormTop>
                <LeftAlign>
                    <InputTitle>
                        이메일
                    </InputTitle>
                    <Input placeholder='예) abcd@gmail.com' type='text' value={email} onChange={onChangeEmail} />
                    <InputTitle>
                        전화번호
                    </InputTitle>
                    <Input placeholder='예) 010-1234-5678' type='text' value={phone} onChange={onChangePhone} />
                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </Form>
        </Wrapper>
    );
};

export default Signup3;
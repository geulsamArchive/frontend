import React, { useEffect, useState } from 'react';
import { useForms } from '../../hooks/useForms';
import axios from 'axios';
import { ButtonSmall, Wrapper, Form, Input, Inputs, Button, InputTitle, FormTop, Silver, BackButton, LeftAlign, WhiteButtons, ErrorMessage } from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png'
import { normalAPI } from '../../apis/Api';

const SignUp = ({ prevStep, nextStep }) => {
    const [name, onChangeName] = useForms();
    const [schoolNum, onChangeSchoolNum] = useForms();
    const [birthDay, onChangeBirthDay] = useForms();
    const [joinedAt, onChangeJoinedAt] = useForms();

    const [nameError, setNameError] = useState('');
    const [schoolNumError, setSchoolNumError] = useState('');
    const [birthDayError, setBirthDayError] = useState('');
    const [joinedAtError, setJoinedAtError] = useState('');

    const [isSchoolNumChecked, setIsSchoolNumChecked] = useState('');

    //정규표현식
    const nameRegax = /^[가-힣]{1,6}$/;
    const schoolNumRegax = /^[a-zA-Z]\d{6}$/;
    const birthDayRegax = /^\d{6}$/;
    const joinedAtRegax = /^\d{4}$/;

    const handleNext = () => {
        let valid = true;

        //이름 유효성 검사
        if (!nameRegax.test(name)) {
            setNameError('올바른 이름 형식을 입력하세요. (예:김와우)');
            valid = false;
        }
        else {
            setNameError('');
        }

        //학번 유효성 검사 및 중복 확인 여부
        if (!schoolNumRegax.test(schoolNum)) {
            setSchoolNumError('올바른 학번 형식을 입력하세요. (예: A111111)');
            valid = false;
        }
        else if (!isSchoolNumChecked) {
            setSchoolNumError('학번 중복 검사를 해주세요.');
        }
        else {
            setSchoolNumError('');
        }





        //생년 월일 유효성 검사
        // if (!birthDayRegax.test(birthDay)) {
        //     valid = false;
        //     setBirthDayError('올바른 생년월일을 입력하세요. (예: 1111년11월11일');
        // }
        // else {
        //     setBirthDayError('');
        // }

        //가입연도 유효성 검사
        if (!joinedAtRegax.test(joinedAt)) {
            valid = false;
            setJoinedAtError('올바른 가입 연도를 입력하세요. (예: 2000년 ');
        }
        else {
            setJoinedAtError('');
        }
        if (valid) {
            nextStep({ name, schoolNum, birthDay, joinedAt });
        }
    };

    const checkSchoolNum = async () => {
        try {
            const resp = await normalAPI.post(`/user/checkSchoolNum`, { schoolNum });
            if (resp.data.exists) {
                setSchoolNumError('이미 존재하는 학번입니다.');
                setIsSchoolNumChecked(false);
            } else {
                setSchoolNumError('');
                setIsSchoolNumChecked(true);
                alert('사용 가능한 학번입니다.');
            }

        } catch (error) {
            console.error('학번 중복 확인 중 오류가 발생했습니다.', error);
            setSchoolNumError('학번 중복 확인에 실패했습니다.');
            setIsSchoolNumChecked(false);
        }

    }
    return (
        <Wrapper>
            <Form>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        1/4
                    </Silver>
                </FormTop>
                <LeftAlign>
                    <InputTitle>
                        이름
                    </InputTitle>
                    <Input type='text' value={name} onChange={onChangeName} />
                    {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
                    <InputTitle>
                        학번
                    </InputTitle>
                    <Input placeholder='예) C012345' type='text' value={schoolNum} onChange={onChangeSchoolNum} />
                    {schoolNumError && <ErrorMessage>{schoolNumError}</ErrorMessage>}
                    <ButtonSmall type='button' onClick={checkSchoolNum}>중복</ButtonSmall>
                    <InputTitle>
                        생년월일
                    </InputTitle>
                    <Input placeholder='예) 2000.12.31' type='date' value={birthDay} onChange={onChangeBirthDay} />
                    {/* {birthDayError && <ErrorMessage>{birthDayError}</ErrorMessage>} */}
                    <InputTitle>
                        글샘 가입연도
                    </InputTitle>
                    <Input placeholder='예) 2024' type='text' value={joinedAt} onChange={onChangeJoinedAt} />
                    {joinedAtError && <ErrorMessage>{joinedAtError}</ErrorMessage>}
                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
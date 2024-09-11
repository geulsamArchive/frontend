import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    PasswordText, Text,
    PassWordStyle, ButtonSmall, SaveButton, EditButton,
    ButtonContainer, BackButtonAtMyInfoModify, BookTitle, BookInfoContainer, Inputs, InputTitle, B
} from '../../style/StyledComponent';
import { normalAPI } from '../../apis/Api';
import { Left, Right, UserInfos, Input, ErrorMessageInfo } from '../../style/UserInfo';

const MyInfoModify = (logout) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const [userInfo, setUserInfo] = useState({
        name: '',
        schoolNum: '',
        birthDay: '',
        email: '',
        phone: '',
        joinedAt: ''
    });

    // 유효성 검사 상태
    const [nameError, setNameError] = useState('');
    const [schoolNumError, setSchoolNumError] = useState('');
    const [birthDayError, setBirthDayError] = useState('');
    const [joinedAtError, setJoinedAtError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // 정규 표현식
    const nameRegax = /^[가-힣]{1,6}$/;
    const schoolNumRegax = /^[a-zA-Z]\d{6}$/;
    const joinedAtRegax = /^\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/;
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

    // 컴포넌트가 마운트될 때 사용자 정보를 불러오는 useEffect

    const fetchUserInfo = async (navigate, logout) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        try {
            // ID를 이용해 사용자 정보 가져오기
            const response = await normalAPI.get(`/user/one`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            console.log(response)
            setUserInfo(response.data.data);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Access token이 만료된 경우, refresh token을 사용해 새로운 access token을 요청
                try {
                    const response = await normalAPI.get('/user/one', {
                        headers: {
                            'refreshToken': refreshToken
                        }
                    });
                    const newAccessToken = response.headers.accesstoken.replace('Bearer ', '');
                    localStorage.setItem('access', newAccessToken);
                    const newRefreshToken = response.headers.refreshtoken.replace('Bearer ', '');
                    localStorage.setItem('refresh', newRefreshToken);
                    setUserInfo(response.data.data);
                } catch (refreshError) {
                    console.error('토큰 갱신 중 오류가 발생했습니다.', refreshError);
                    alert('로그인이 필요합니다.');
                    navigate('/main'); // 로그인 페이지로 이동
                }
            } else {
                console.error('사용자 정보를 불러오는 중 오류가 발생했습니다.', error);
            }
        }
    };

    useEffect(() => {
        fetchUserInfo(navigate);
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true); // 수정 모드로 전환
    };

    const handleSaveClick = async () => {
        let valid = true;

        // 유효성 검사
        if (!nameRegax.test(userInfo.name)) {
            setNameError('올바른 이름 형식을 입력하세요. (예: 김와우)');
            valid = false;
        } else {
            setNameError('');
        }

        if (!schoolNumRegax.test(userInfo.schoolNum)) {
            setSchoolNumError('올바른 학번 형식을 입력하세요. (예: A111111)');
            valid = false;
        } else if (!userInfo.isSchoolNumChecked) {
            setSchoolNumError('학번 중복 검사를 해주세요.');
            valid = false;
        } else {
            setSchoolNumError('');
        }

        if (!joinedAtRegax.test(userInfo.joinedAt)) {
            setJoinedAtError('올바른 가입 연도를 입력하세요. (예: 2000)');
            valid = false;
        } else {
            setJoinedAtError('');
        }
        if (!emailRegex.test(userInfo.email)) {
            setEmailError('올바른 이메일 형식을 입력하세요. (예: abcd@gmail.com)');
            valid = false;
        } else {
            setEmailError('');
        }

        // 전화번호 유효성 검사
        if (!phoneRegex.test(userInfo.phone)) {
            setPhoneError('올바른 전화번호 형식을 입력하세요. (예: 010-1234-5678)');
            valid = false;
        } else {
            setPhoneError('');
        }

        if (!valid) return;

        // 데이터 전송
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh')
        try {
            await normalAPI.put(`/user`, userInfo, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            setIsEditing(false); // 수정 모드 종료
            alert('정보가 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('정보 수정 중 오류가 발생했습니다.', error);
            if (error.response && error.response.status === 403) {
                try {
                    const response = await normalAPI.put(`/user`, userInfo, {
                        headers: {
                            'refreshToken': refreshToken,
                        }
                    });
                    const newAccessToken = response.headers.accesstoken.replace('Bearer ', '');
                    localStorage.setItem('access', newAccessToken);
                    const newRefreshToken = response.headers.refreshtoken.replace('Bearer ', '');
                    localStorage.setItem('refresh', newRefreshToken);

                    setIsEditing(false);
                    alert('정보가 성공적으로 수정되었습니다.');
                } catch (refreshError) {
                    console.error('토큰 갱신 중 오류가 발생했습니다.', refreshError);
                    alert('정보 수정에 실패했습니다.');
                }
            } else {
                alert('정보 수정에 실패했습니다.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const checkSchoolNum = async () => {
        try {
            const resp = await normalAPI.post(`/user/checkSchoolNum`, { schoolNum: userInfo.schoolNum });
            if (resp.data.exists) {
                setSchoolNumError('이미 존재하는 학번입니다.');
                setUserInfo(prev => ({ ...prev, isSchoolNumChecked: false }));
            } else {
                setSchoolNumError('');
                setUserInfo(prev => ({ ...prev, isSchoolNumChecked: true }));
                alert('사용 가능한 학번입니다.');
            }
        } catch (error) {
            console.error('학번 중복 확인 중 오류가 발생했습니다.', error);
            setSchoolNumError('학번 중복 확인에 실패했습니다.');
            setUserInfo(prev => ({ ...prev, isSchoolNumChecked: false }));
        }
    };

    // 비밀번호 변경 모달로 이동하는 함수
    const openPasswordChangeModal = () => {
        navigate('/PasswordChangeModal'); // PasswordChangeModal로 네비게이트
    };

    return (
        <BookInfoContainer>
            <BookTitle>회원 정보</BookTitle>
            <br />
            <br />
            <Inputs>
                <UserInfos>
                    <Left>이름</Left>
                    {
                        isEditing ? (
                            <>
                                <Input
                                    type='text'
                                    name='name'
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {nameError && <ErrorMessageInfo>{nameError}</ErrorMessageInfo>}
                            </>
                        ) : (
                            <Right>
                                {userInfo.name}
                            </Right>
                        )
                    }
                </UserInfos>
                <UserInfos>
                    <Left>학번</Left>  {
                        isEditing ? (
                            <>
                                <Input
                                    type='text'
                                    name='schoolNum'
                                    value={userInfo.schoolNum}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {schoolNumError && <ErrorMessageInfo>{schoolNumError}</ErrorMessageInfo>}
                                {isEditing && <ButtonSmall type='button' onClick={checkSchoolNum}>중복</ButtonSmall>}
                            </>
                        )
                            : (<Right>
                                {userInfo.schoolNum}
                            </Right>)
                    }
                </UserInfos>   <UserInfos>
                    <Left>생일</Left>
                    {
                        isEditing ? (
                            <>
                                <Input
                                    type='date'
                                    name='birthDay'
                                    value={userInfo.birthDay}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {birthDayError && <ErrorMessageInfo>{birthDayError}</ErrorMessageInfo>}
                            </>

                        ) : (<Right>
                            {userInfo.birthDay}
                        </Right>)
                    }
                </UserInfos>   <UserInfos>
                    <Left>전자우편</Left>
                    {
                        isEditing ? (
                            <>
                                <Input
                                    type='email'
                                    name='email'
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {emailError && <ErrorMessageInfo>{emailError}</ErrorMessageInfo>}
                            </>
                        ) : (<Right>
                            {userInfo.email}
                        </Right>)
                    }
                </UserInfos>  <UserInfos>
                    <Left>전화번호</Left>
                    {
                        isEditing ? (
                            <>
                                <Input
                                    type='text'
                                    name='phone'
                                    value={userInfo.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {phoneError && <ErrorMessageInfo>{phoneError}</ErrorMessageInfo>}
                            </>
                        ) : (<Right>
                            {userInfo.phone}
                        </Right>)
                    }
                </UserInfos>   <UserInfos>
                    <Left>가입년도</Left>
                    {
                        isEditing ? (
                            <>
                                <Input
                                    type='text'
                                    name='joinedAt'
                                    value={userInfo.joinedAt}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                {joinedAtError && <ErrorMessageInfo>{joinedAtError}</ErrorMessageInfo>}
                            </>
                        ) : (<Right>
                            {userInfo.joinedAt}
                        </Right>)
                    }
                </UserInfos>
            </Inputs>
            <ButtonContainer>
                {isEditing ? (<>
                    <BackButtonAtMyInfoModify onClick={() => setIsEditing(false)}>뒤로가기</BackButtonAtMyInfoModify>
                    <EditButton onClick={handleSaveClick}>저장하기</EditButton>
                </>
                ) : (
                    <>
                        <EditButton onClick={handleEditClick}>수정하기</EditButton>
                        <PasswordText onClick={openPasswordChangeModal}>비밀번호 변경</PasswordText>
                    </>
                )}
            </ButtonContainer>
        </BookInfoContainer>
    );
};

export default MyInfoModify;

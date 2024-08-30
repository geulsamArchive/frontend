import React, { useState } from 'react';
import { BookTitle, BookInfoContainer, Inputs, InputUploads, InputTitle, Input, Button } from '../../style/StyledComponent';
import axios from 'axios';
import { normalAPI } from '../../apis/Api';

const MyInfoModify = ({ prevStep }) => {
    // 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        schoolNum: '',
        birthDay: '',
        email: '',
        phone: '',
        joinedAt: ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await normalAPI.put('/user/update', userInfo); // 서버에 수정된 정보를 보냅니다.
            setIsEditing(false);
            alert('정보가 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('정보 수정 중 오류가 발생했습니다.', error);
            alert('정보 수정에 실패했습니다.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    return (
        <BookInfoContainer>
            <BookTitle>회원 정보</BookTitle>
            <br />
            <br />
            <Inputs>
                <InputUploads>
                    <div>
                        <InputTitle>이름</InputTitle>
                        <Input
                            type='text'
                            name='name'
                            value={userInfo.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <InputTitle>학번</InputTitle>
                        <Input
                            type='text'
                            name='schoolNum'
                            value={userInfo.schoolNum}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <InputTitle>생년월일</InputTitle>
                        <Input
                            type='text'
                            name='birthDay'
                            value={userInfo.birthDay}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <InputTitle>이메일</InputTitle>
                        <Input
                            type='email'
                            name='email'
                            value={userInfo.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <InputTitle>전화번호</InputTitle>
                        <Input
                            type='text'
                            name='phone'
                            value={userInfo.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <InputTitle>가입일</InputTitle>
                        <Input
                            type='text'
                            name='joinedAt'
                            value={userInfo.joinedAt}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </InputUploads>
            </Inputs>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {isEditing ? (
                    <Button onClick={handleSaveClick}>저장하기</Button>
                ) : (
                    <Button onClick={handleEditClick}>수정하기</Button>
                )}
                <Button onClick={prevStep}>뒤로가기</Button>
            </div>
        </BookInfoContainer>
    );
};

export default MyInfoModify;

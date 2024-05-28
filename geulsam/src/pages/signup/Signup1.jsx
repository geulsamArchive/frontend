import React, { useState } from 'react';
import { Button, Buttons, Checkbox, Form, Title, Wrapper } from '../../style/StyledComponent';

const Signup1 = () => {
    const [isChecked, SetisChecked] = useState(false)

    const handleCheckboxChange = (e) => {
        SetisChecked(e.target.checked)
    }

    return (
        <Wrapper>
            <Form>
                <Title>회원가입 신청하기</Title>
                <div>
                    글샘문학회에 오신 걸 환영합니다!
                </div>
                <div>
                    본 동아리 웹사이트 가입 절차는
                    해당 학기 동아리 대표자의 안내 이후
                    가입 신청해주시기 바랍니다.
                </div>
                <button>
                    개인정보 이용약관 열기
                </button>
                <div>
                    약관을 충분히 확인 했으며 내용에 동의합니다
                    <Checkbox type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                </div>
                <Buttons>
                    <Button disabled={!isChecked}>시작하기</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default Signup1;
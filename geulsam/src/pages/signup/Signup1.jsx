import React, { useState } from 'react';
import { Button, Buttons, Checkbox, FlexCenter, Form, Highlight, Red, Small, Title, TitleBold, Welcome, WhiteButton, Wrapper } from '../../style/StyledComponent';

const Signup1 = ({ nextStep }) => {
    const [isChecked, SetisChecked] = useState(false)

    const handleCheckboxChange = (e) => {
        SetisChecked(e.target.checked)
    }

    return (
        <Wrapper>
            <Form>
                <div></div>
                <div></div>
                <TitleBold>
                    회원가입 신청하기
                </TitleBold>
                <Welcome>
                    <Highlight>
                        <Red>글샘문학회</Red>에 오신 걸 환영합니다!
                    </Highlight>
                </Welcome>
                <Small>
                    본 동아리 웹사이트 가입 절차는 <br />
                    해당 학기 동아리 대표자의 안내 이후 <br />
                    가입 신청해주시기 바랍니다.
                </Small>
                <WhiteButton>
                    개인정보 이용약관 열기
                </WhiteButton>
                <Small>
                    <FlexCenter>
                        약관을 충분히 확인 했으며 내용에 동의합니다&nbsp;
                        <Checkbox type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                    </FlexCenter>
                </Small>
                <div></div>
                <Buttons>
                    <Button disabled={!isChecked} onClick={nextStep}>시작하기</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default Signup1;
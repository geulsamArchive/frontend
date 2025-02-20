import React from 'react';
import {
  Wrapper,
  Form,
  Button,
  Title,
  FormTopGray,
  TitleBold,
  Small,
  Red,
  WhiteButtons,
  LoginForm,
  RealWhiteButtons,
  Wrapper2,
} from '../../style/StyledComponent';
import { useNavigate } from 'react-router-dom';

const SignupEnd = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/main');
  };
  // formdata post~~~
  // async () => {
  //     const result = await SignUpApi(
  //         name, schoolNum, phone, email, joinedAt, birthDay);
  //     console.log(result)
  //     redirect('/main');
  // <div>
  // {formdata.formData.name}
  // {formdata.formData.info}
  // </div>
  // }
  return (
    <Wrapper2>
      <LoginForm>
        <FormTopGray />
        <TitleBold>가입 신청이 완료되었습니다!</TitleBold>
        <Small>
          동아리 내 <Red>담당자의 승인 절차 이후</Red>
          <br />
          웹사이트의 모든 기능을 이용하실 수 있습니다.
          <br />
          비밀번호는 입력하신 이메일로 보내질 예정입니다. <br />
          그 전까지 게시되어 있는 다른 회원들의 작품을 읽으며
          <br />
          시간을 보내볼까요?
        </Small>
        <RealWhiteButtons>
          <Button onClick={handleOnClick}>메인으로</Button>
        </RealWhiteButtons>
      </LoginForm>
    </Wrapper2>
  );
};

export default SignupEnd;

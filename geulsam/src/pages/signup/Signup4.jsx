import React from 'react';
import { useForms } from '../../hooks/useForms';
import {
  Wrapper,
  Form,
  Inputs,
  Button,
  FormTop,
  BackButton,
  Silver,
  WhiteButtons,
  IntroductionTextarea,
  TextCounter,
  LoginForm,
  LoginInputs,
  Wrapper2,
} from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png';

const Signup4 = ({ prevStep, nextStep }) => {
  const [info, onChangeInfo] = useForms();

  const handleNext = () => {
    nextStep({ info });
  };

  return (
    <Wrapper2>
      <LoginForm>
        <FormTop>
          <BackButton src={Left} onClick={prevStep} />
          <Silver>3/4</Silver>
        </FormTop>
        <LoginInputs>
          <IntroductionTextarea
            maxLength="200"
            placeholder="작가 프로필에 표시될 자기소개를 작성해주세요.(최대 200자)"
            type="text"
            value={info}
            onChange={onChangeInfo}
          />
        </LoginInputs>
        <WhiteButtons>
          <TextCounter length={info.length}>{info.length}/200</TextCounter>
          <Button onClick={handleNext}>다음</Button>
        </WhiteButtons>
      </LoginForm>
    </Wrapper2>
  );
};

export default Signup4;

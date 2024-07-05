import React from 'react';
import { Wrapper, Form, Input, BackButton, Silver, FormTop, Button, InputTitle, Title, Welcome, Red, LeftAlign, MarginLeft, WhiteButtons, WordInput } from '../../style/StyledComponent';
import { useForms } from '../../hooks/useForms';
import Left from '../../assets/images/grayLeft.png'
import { SignUpApi } from '../../apis/SignUpApi';


const Signup5 = ({ prevStep, nextStep, formData }) => {
    const [keyword1, onChangeKeyword1] = useForms();
    const [keyword2, onChangeKeyword2] = useForms();
    const [keyword3, onChangeKeyword3] = useForms();

    const Post =
        async () => {
            const result = await SignUpApi(formData);
            console.log(result)
        }

    const handleNext = (e) => {
        e.preventDefault();
        const keywords = [keyword1, keyword2, keyword3];
        formData.keywords = keywords
        console.log(keywords)
        console.log(formData)
        Post();
        nextStep()

    }

    return (
        <Wrapper>
            <Form>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        4/4
                    </Silver>
                </FormTop>
                <MarginLeft>
                    <LeftAlign>
                        <Welcome>
                            내 작품 스타일을 소개할 <Red>키워드</Red>를 세 개 작성해주세요. (띄어쓰기 불가, 최대 6자)
                        </Welcome>
                    </LeftAlign>
                </MarginLeft>
                <WordInput placeholder='예) 차분한' type='text' value={keyword1} onChange={onChangeKeyword1} maxLength="6" />
                <WordInput placeholder='예) 소설중심의' type='text' value={keyword2} onChange={onChangeKeyword2} maxLength="6" />
                <WordInput placeholder='예) 일상적인' type='text' value={keyword3} onChange={onChangeKeyword3} maxLength="6" />
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </Form>
        </Wrapper>
    );
};

export default Signup5;
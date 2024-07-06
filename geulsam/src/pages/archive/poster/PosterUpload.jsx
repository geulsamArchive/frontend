import { useState } from 'react';
import { useForms } from '../../../hooks/useForms';
import { Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../style/StyledComponent';
import axios from 'axios';

const PosterUpload = () => {
    const [year, onChangeYear] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [plate, onChangePlate] = useForms();
    const [file, setFile] = useState(null)

    const onFileChange = (e) => {

        setFile(e.target.files[0]);
        console.log(file)
    };

    const onClickUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append('image', file)
        formData.append('thumbNail', file)
        formData.append('year', year);
        formData.append('designer', designer);
        formData.append('plate', plate);

        const accessToken = localStorage.getItem('access')

        try {

            const res = await axios.post('http://3.38.162.235:8080/poster', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': accessToken,
                },
            })
            console.log(res)
        } catch (error) {
            console.error(error);
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
        }
    }

    return (
        <BookInfoContainer>
            <BookTitle>

                새 포스터 개시하기
            </BookTitle>
            <br />
            <br />
            <Inputs>
                <InputUploads>
                    <div>
                        <InputTitle>연도</InputTitle>
                        <Input value={year} onChange={onChangeYear} placeholder='예) 2000' />
                    </div>
                    <div>
                        <InputTitle>판형</InputTitle>
                        <Input value={plate} onChange={onChangePlate} placeholder='예) A4' />
                    </div>
                    <div>
                        <InputTitle>제작자</InputTitle>
                        <Input value={designer} onChange={onChangeDesigner} placeholder='예) 정성훈' />
                    </div>
                </InputUploads>
                <Input type='file' onChange={onFileChange} />
            </Inputs>
            <hr />
            <br />
            <RightSubmit>
                <Button type='submit' onClick={onClickUpload}>게시하기</Button>
            </RightSubmit>
            <br />
            <br />
            <br />
            <br />
            <br />
        </BookInfoContainer>
    );
};

export default PosterUpload;
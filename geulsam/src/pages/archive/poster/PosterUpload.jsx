import { useState } from 'react';
import { useForms } from '../../../hooks/useForms';
import { Input, Inputs, Form, InputTitle, Button } from '../../../style/StyledComponent';
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
        <>
            <Form>

                포스터 업로드
                <Inputs>
                    <InputTitle>연도</InputTitle>
                    <Input value={year} onChange={onChangeYear} />
                    <InputTitle>판형</InputTitle>
                    <Input value={plate} onChange={onChangePlate} />
                    <InputTitle>디자이너</InputTitle>
                    <Input value={designer} onChange={onChangeDesigner} />
                    <Input type='file' onChange={onFileChange} />
                </Inputs>
                <Button onClick={onClickUpload}>업로드</Button>
            </Form>
        </>
    );
};

export default PosterUpload;
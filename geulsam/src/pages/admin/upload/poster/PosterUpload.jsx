import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent'
import axios from 'axios';
import Resizer from "react-image-file-resizer"
import { normalAPI } from '../../../../apis/Api';

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            700,
            700,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });

const PosterUpload = () => {
    const [year, onChangeYear] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [file, setFile] = useState(null);
    const [plate, onChangePlate] = useForms();
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    const onFileChange = async (e) => {
        try {
            const selectedFile = e.target.files[0]
            setFile(selectedFile);

            const resized = await resizeFile(selectedFile)
            setThumbnail(resized)

            const reader = new FileReader();
            reader.onload = () => {
                setThumbnailUrl(reader.result);
            };
            reader.readAsDataURL(resized);

            console.log(selectedFile)
            console.log(resized)
        } catch (err) {
            console.log(err)
        }
    };

    const onClickUpload = async (e) => {
        const suppertedFormats = ["image/jpeg", "image/png", "image/svg+xml"]
        e.preventDefault();
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }
        if (!suppertedFormats.includes(file.type)) {
            alert("지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.");
            return;
        }



        const formData = new FormData();
        formData.append('image', file)
        formData.append('thumbNail', thumbnail)
        formData.append('year', year);
        formData.append('designer', designer);
        formData.append('plate', plate);

        const accessToken = localStorage.getItem('access')

        try {
            const refreshToken = localStorage.getItem('refresh');
            const refreshResponse = await normalAPI.post('/auth/refresh',{token: refreshToken});
            //처음으로 업로드시
            let newAccessToken = refreshResponse.data.accessToken;
            newAccessToken = newAccessToken.replace('Bearer','');

            localStorage.setItem('access',newAccessToken);
            const res = await normalAPI.post('/poster', formData, {
                headers: {

                    'Content-Type': 'multipart/form-data',
                    'accessToken': `Bearer ${newAccessToken}`,
                },
            })
            console.log(res)
            alert('게시에 성공했습니다.')
        } catch (error) {
            // 에러 발생
            console.error(error);
            try {
                const refreshToken = localStorage.getItem('refresh');
                const refreshResponse = await normalAPI.post('/auth/refresh', { token: refreshToken });
    
                const newAccessToken = refreshResponse.data.accessToken;
                localStorage.setItem('access', newAccessToken);
    
                // 새로 받은 accessToken을 사용해 원래 요청을 다시 시도합니다.
                const retryRes = await normalAPI.post('/poster', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${newAccessToken}`,
                    },
                });
                
            } catch (err) {
                //그래도 안되면 재로그인 요청
                console.log(err)
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                alert('다시 로그인 해주세요.')
            }
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
                        <InputTitle>제작자</InputTitle>
                        <Input value={designer} onChange={onChangeDesigner} placeholder='예) 정성훈' />
                    </div>
                    <div>
                        <InputTitle>판형</InputTitle>
                        <Input value={plate} onChange={onChangePlate} placeholder='예) B4' />
                    </div>
                </InputUploads>
                <Input type='file' accept='image/*' onChange={onFileChange} />
            </Inputs>
            {thumbnailUrl && (
                <div>
                    <img src={thumbnailUrl} alt="Thumbnail" />
                </div>
            )}
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
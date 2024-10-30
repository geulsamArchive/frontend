import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { PosterUploadRightSubmit, PosterTitle, Input, Inputs, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent'
import axios from 'axios';
import Resizer from "react-image-file-resizer"
import { normalAPI } from '../../../../apis/Api';
import { useAuth } from '../../../../store/Auth';

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
    const { logout } = useAuth();
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
        const refreshToken = localStorage.getItem('refresh');

        try {
            const res = await normalAPI.post('/poster', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': accessToken
                }
            });
            //처음으로 업로드시

            console.log(res)
            alert('게시에 성공했습니다.')
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.post(
                        '/poster',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'refreshToken': refreshToken,
                            }
                        }
                    );
                    console.log(tokenResponse);
                    if (tokenResponse.status === 200) {
                        const accessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                        localStorage.setItem('access', accessToken)
                        if (tokenResponse.headers.refreshtoken) {
                            const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                            localStorage.setItem('refresh', refreshToken);
                        }
                        alert('포스터를 성공적으로 게시했습니다.')
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert('게시 중 문제가 발생했습니다.');
            }
        }
    }

    return (
        <BookInfoContainer>
            <PosterTitle>
                새 포스터 개시하기
            </PosterTitle>
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
            <PosterUploadRightSubmit>
                <Button type='submit' onClick={onClickUpload}>게시하기</Button>
            </PosterUploadRightSubmit>
            <br />
            <br />
            <br />
            <br />
            <br />
        </BookInfoContainer>
    );
};

export default PosterUpload;
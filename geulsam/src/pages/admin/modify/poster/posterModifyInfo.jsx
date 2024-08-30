import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../../../../hooks/useForms';
import { InputRow, Input, Inputs, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
import { normalAPI } from '../../../../apis/Api';


const PosterModify = () => {
    const [year, onChangeYear] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [file, setFile] = useState(null);
    const [thumbNail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [posterData, setPosterData] = useState({});
    const [loading, setLoading] = useState(true);
    const { posterId } = useParams();
    const navigate = useNavigate();
    const [plate, onChangePlate] = useForms();

    const getPosterData = async () => {
        try {
            const resp = await normalAPI.get(`/poster?search=${posterId}`);
            //`/poster?search=${search}
            console.log(resp.data);
            setPosterData(resp.data.data);
            setLoading(false);
        } catch (error) {
            console.error('API fetching error', error);
        }
    };

    useEffect(() => {
        getPosterData();
    }, []);
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

    const onFileChange = async (e) => {
        try {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const resized = await resizeFile(selectedFile);
            setThumbnail(resized);

            const reader = new FileReader();
            reader.onload = () => {
                setThumbnailUrl(reader.result);
            };
            reader.readAsDataURL(resized);

            console.log(selectedFile);
            console.log(resized);
        } catch (error) {
            console.log(error);
        }
    };

    const onClickUpload = async (e) => {
        e.preventDefault();
        if (window.confirm('정말로 수정하시겠습니까?')) {
            console.log(posterId);
            // const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
            // if (!file) {
            //     alert("파일을 선택해주세요.");
            //     return;
            // }
            // if (!supportedFormats.includes(file.type)) {
            //     alert("지원되지 않은 이미지 형식입니다. JPEG, PNG 형식의 이미지를 업로드해주세요.");
            //     return;
            // }

            const formData = new FormData();
            formData.append('image', file);
            formData.append('thumbNail', thumbNail);
            formData.append('year', year);
            formData.append('designer', designer);
            formData.append('plate', plate);

            // "image": "string",
            // "thumbNail": "string",
            // "year": 2024,
            // "designer": "김철수",
            // "plate": "A4"

            const accessToken = localStorage.getItem('access');
            try {
                console.log(posterId);

                // 수정하여 업로드시
                //https://geulsaem.store/poster?search=aaa-bbb-ccc-ddd
                const res = await normalAPI.put(`/poster?search=${posterId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accessToken': accessToken,
                    },
                });
                console.log(res);
                if (res.data.status == 200) {
                    alert('포스터 수정에 성공했습니다');
                }
                else {
                    console.log(res.data.status);
                }
            } catch (error) {
                // 에러 발생
                console.log('첫번째 catch 블럭');
                console.error('API Error:', error.response ? error.response.data : error.message);
                console.log(error);
                try {
                    console.error(error);
                    console.log(error);
                    // 리프레쉬 토큰 포함해서 다시 전송
                    const refreshToken = localStorage.getItem('refresh');
                    const url = `/poster/${posterId}`
                    console.log(url);
                    console.log(posterId);
                    const res = await normalAPI.put(`/poster?search=${posterId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'refreshToken': refreshToken,
                        },
                    });
                    console.log(res);
                } catch (error) {
                    // 그래도 안되면 재로그인 요청
                    console.log('두번째 catch 블럭');
                    console.log(error);
                    alert('에러가 발생했습니다. 다시 로그인 해주세요.');
                }
            }
        };
    }
    const onClickDelete = async () => {
        const accessToken = localStorage.getItem('access');
        if (!window.confirm('정말로 삭제하시겠습니까?'))
            return;

        try {
            await normalAPI.delete(`/poster?search=${posterId}`, {
                headers: {
                    'accessToken': accessToken,
                },
            });
            alert('포스터가 삭제되었습니다.');
            navigate('/poster'); // 페이지 이동
        } catch (error) {
            console.error(error);
            alert('포스터 삭제에 실패했습니다.');
        }
    };

    return (
        <BookInfoContainer>
            <BookTitle>
                포스터 수정하기
            </BookTitle>
            <br />
            <br />
            <Inputs>
                <InputUploads>
                    <div>
                        <InputTitle>연도</InputTitle>
                        <Input value={year} onChange={onChangeYear} placeholder={posterData.year} />
                    </div>
                    <div>
                        <InputTitle>제작자</InputTitle>
                        <Input value={designer} onChange={onChangeDesigner} placeholder={posterData.designer} />
                    </div>
                    <div>
                        <InputTitle>판형</InputTitle>
                        <Input value={plate} onChange={onChangePlate} placeholder={posterData.plate} />
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
                <Button type='submit' onClick={onClickUpload}>수정하기</Button>
                <Button type='button' onClick={onClickDelete}>삭제하기</Button>
            </RightSubmit>
            <br />
            <br />
            <br />
            <br />
            <br />
        </BookInfoContainer>
    );
};

export default PosterModify;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
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

const PosterModify = () => {
    const [year, onChangeYear] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [posterData, setPosterData] = useState({});
    const [loading, setLoading] = useState(true);
    const { posterId } = useParams();
    const navigate = useNavigate();
    const [plate, onChangePlate] = useForms();
    const search = posterId;

    const getPosterData = async () => {
        try {
            const resp = await normalAPI.get(`/poster/${posterId}`);
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
        if (!window.confirm('정말로 수정하시겠습니까?')) {
            const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
            e.preventDefault();
            if (!file) {
                alert("파일이 선택되지 않았습니다. 파일을 선택해주세요.");
                return;
            }
            if (!supportedFormats.includes(file.type)) {
                alert("지원되지 않은 이미지 형식입니다. JPEG, PNG 형식의 이미지를 업로드해주세요.");
                return;
            }

            const formData = new FormData();
            formData.append('image', file);
            formData.append('thumbNail', thumbnail);
            formData.append('year', year);
            formData.append('designer', designer);
            formData.append('plate', plate);

            const accessToken = localStorage.getItem('access');

            try {
                // 처음으로 업로드시
                const res = await normalAPI.put(`/poster?search=${search}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accessToken': accessToken,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                alert("수정에 성공했습니다")
                console.log(res);
            } catch (error) {
                // 에러 발생
                console.error(error);
                try {
                    // 리프레쉬 토큰 포함해서 다시 전송
                    const refreshToken = localStorage.getItem('refresh');
                    const url = `/poster/${posterId}`
                    console.log(url);
                    const res = await normalAPI.put(`/poster?search=${search}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'refreshToken': refreshToken,
                            'Authorization': `Bearer ${res.data.accessToken}`,
                        },
                    });

                    alert("수정에 성공했습니다")
                    console.log(res);
                } catch (error) {
                    // 그래도 안되면 재로그인 요청
                    console.log(error);
                    alert('다시 로그인 해주세요.');
                }
            }
        };
    }
    const onClickDelete = async () => {
        const accessToken = localStorage.getItem('access');
        if (!window.confirm('정말로 삭제하시겠습니까?'))
            return;

        try {
            await normalAPI.delete(`/poster?search=${search}`, {
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

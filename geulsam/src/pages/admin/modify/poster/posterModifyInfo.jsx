import { useState,useEffect } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Resizer from "react-image-file-resizer"
import { normalAPI } from '../../../../apis/Api';
const EndPoint = "http://43.200.215.113:8080/poster"

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
    const [thumbnailUrl,setThumbnailUrl] = useState(null); 
    const [posterData, setPosterData] = useState({})
    const [loading, setLoading] = useState(true)
    const { posterId } = useParams();
    const getPosterData = async () => {
        try {
            const resp = await normalAPI.get(`/poster/${posterId}`)
            console.log(resp.data)
            setPosterData(resp.data.data);
            setLoading(false);
        } catch (error) {
            console.error('api fetching error', error)
        }
    }
    useEffect(() => {
        getPosterData()
    }, []
    )

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

        const accessToken = localStorage.getItem('access')

        try {
            const refreshToken = localStorage.getItem('refresh');

            //처음으로 업로드시
            const res = await axios.put(EndPoint, formData, {
                headers: {

                    'Content-Type': 'multipart/form-data',
                    'accessToken': accessToken,
                },
            })
            console.log(res)
        } catch (error) {
            // 에러 발생
            console.error(error);
            try {
                //리프레쉬 토큰 포함해서 다시 전송
                const refreshToken = localStorage.getItem('refresh');

                const res = await axios.post(EndPoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'refreshToken': refreshToken,
                    },
                })
                console.log(res)
            } catch (err) {
                //그래도 안되면 재로그인 요청
                console.log(err)
                alert('다시 로그인 해주세요.')
            }
        }
    }

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
                        <Input value={year} onChange={onChangeYear} placeholder={posterData.year}/>
                    </div>
                    <div>
                        <InputTitle>제작자</InputTitle>
                        <Input value={designer} onChange={onChangeDesigner} placeholder={posterData.designer} />
                    </div>
                </InputUploads>
                <Input type='file' accept='image/*' onChange={onFileChange} placeholder={posterData.thumbnail}/>
            </Inputs>
            {thumbnailUrl && (
                <div>
                    <img src={thumbnailUrl} alt="Thumbnail"/>
                </div>
            )}
            <hr />
            <br />
            <RightSubmit>
                <Button type='submit' onClick={onClickUpload}>수정하기</Button>
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
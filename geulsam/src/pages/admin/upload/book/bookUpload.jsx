import React from 'react';
import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit,Red} from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer"
import axios from 'axios';
const EndPoint = "http://43.200.215.113:8080/book";

const BookUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [release, onChangeRelease] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [plate, onChangePlate] = useForms();
    const [pageNumber, onChangePageNumber] = useForms();
    const [bookCover, setBookCover] = useState(null);
    const [bookCoverThumbnail,setBookCoverThumbnail] = useState();
    const [bookCoverUrl,setBookCoverUrl] = useState();
    const [backCover,setBackCover] = useState(null);
    const [backCoverUrl,setBackCoverUrl] = useState();
    const [backCoverThumbnail,setBackCoverThumbnail] = useState();
    const [pdf, setPdf] = useState(null);
    const [year, onChangeYear] = useForms();
    

    // {
    //     "bookCover": "string",
    //     "bookCoverThumbnail": "string",
    //     "backCover": "string",
    //     "backCoverThumbnail": "string",
    //     "pdf": "string",
    //     "designer": "string",
    //     "plate": "string",
    //     "pageNumber": 0,
    //     "year": 0,
    //     "release": "2024-08-08",
    //     "title": "string"
    //   }

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

    const onPdfChange = (e) => {
        setPdf(e.target.files[0]);
    }

    const onBookCoverChange = async (e) => {
        try {
            const selectedBookCoverFile = e.target.files[0]
            setBookCover(selectedBookCoverFile);

            const resizedBookCover = await resizeFile(selectedBookCoverFile)
            setBookCoverThumbnail(resizedBookCover)

            const readerBookCover = new FileReader();
            readerBookCover.onload = () => {
                setBookCoverUrl(readerBookCover.result);
            };
            readerBookCover.readAsDataURL(resizedBookCover);

            console.log(selectedBookCoverFile)
            console.log(resizedBookCover)
        } catch (err) {
            console.log(err)
        }
    };
    const onBackCoverChange = async (e) => {
        try {
            const selectedBackCoverFile = e.target.files[0]
            setBackCover(selectedBackCoverFile);

            const resizedBackCover = await resizeFile(selectedBackCoverFile)
            setBackCoverThumbnail(resizedBackCover)

            const readerBackCover = new FileReader();
            readerBackCover.onload = () => {
                setBackCoverUrl(readerBackCover.result);
            };
            readerBackCover.readAsDataURL(resizedBackCover);

            console.log(selectedBackCoverFile)
            console.log(resizedBackCover)
        } catch (err) {
            console.log(err)
        }
    };

    const onClickUpload = async (e) => {
        const suppertedFormats = ["image/jpeg", "image/png", "image/svg+xml"]
        e.preventDefault();
        if (!bookCover||!backCover) {
            alert("파일을 선택해주세요.");
            return;
        }
        if (!suppertedFormats.includes(bookCover.type)||!suppertedFormats.includes(backCover.type)) {
            alert("지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.");
            return;
        }



        const formData = new FormData();
        formData.append('bookCover', bookCover)
        formData.append('bookCoverThumbNail', bookCoverThumbnail)
        formData.append('backCover', backCover);
        formData.append('backCoverThumbNail',backCoverThumbnail);
        formData.append('pdf',pdf);
        formData.append('designer', designer);
        formData.append("plate",plate);
        formData.append("pageNumber",pageNumber);
        formData.append("year",year);
        formData.append("release",release);
        formData.append("title",title);

    // {
    //     "bookCover": "string",
    //     "bookCoverThumbnail": "string",
    //     "backCover": "string",
    //     "backCoverThumbnail": "string",
    //     "pdf": "string",
    //     "designer": "string",
    //     "plate": "string",
    //     "pageNumber": 0,
    //     "year": 0,
    //     "release": "2024-08-08",
    //     "title": "string"
    //   }


        const accessToken = localStorage.getItem('access')

        try {
            const refreshToken = localStorage.getItem('refresh');

            //처음으로 업로드시
            const res = await axios.post(EndPoint, formData, {
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
                새 문집 게시하기
            </BookTitle>
            <Inputs>
                <div>
                    <InputTitle>제목</InputTitle>
                    <Input value={title} onChange={onChangeTitle} placeholder='예)와우문집2024' />
                </div>
                <div>
                    <InputTitle>발간일</InputTitle>
                    <Input value={release} onChange={onChangeRelease} placeholder='예)2024' />
                </div>
                <div>
                    <InputTitle>디자인</InputTitle>
                    <Input value={designer} onChange={onChangeDesigner} placeholder='예) 아이묭' />
                </div>
                <div>
                    <InputTitle>판형</InputTitle>
                    <Input value={plate} onChange={onChangePlate} placeholder='예)B6' />
                </div>
                <div>
                    <InputTitle>쪽수</InputTitle>
                    <Input value={pageNumber} onChange={onChangePageNumber} placeholder='예)370' />
                </div>
                <div>
                    <InputTitle>표지 및 내지 게시</InputTitle>
                    <p>정상적인 문집 게시를 위해 하단의 업로드 가이드라인을 준수해주세요.</p>
                    <Red><p>게시에 성공할 시 하단에 이미지가 표시됩니다. </p></Red>
                    <br/>
                    <InputTitle>앞표지</InputTitle>
                    <Input type='file' onChange={onBookCoverChange} />
                </div>
                {bookCoverUrl && (
                <div>
                    <img src={bookCoverUrl} alt="Thumbnail"/>
                </div>)}
                <div>
                    <br/>
                    <InputTitle>뒷표지</InputTitle>
                    <Input type='file' onChange={onBackCoverChange} />
                </div>
                {backCoverUrl && (
                    <div>
                        <img src={backCoverUrl} alt="Thumbnail"/>
                    </div>
                )}
                <div>
                    <InputTitle>본문</InputTitle>
                    <Input type='file' onChange={setPdf} />
                </div>
            </Inputs>
            <RightSubmit>
                <Button type='submit' onClick={onClickUpload}>게시하기</Button>
            </RightSubmit>
        </BookInfoContainer>
    );
};

export default BookUpload;
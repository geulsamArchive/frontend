import React from 'react';
import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { InputRow, Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit, Red, InputsContainer } from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer"
import axios from 'axios';
import { normalAPI } from '../../../../apis/Api';
import { useAuth } from '../../../../store/Auth';

const BookUpload = () => {
    const { logout } = useAuth();
    const [title, onChangeTitle] = useForms();
    const [release, onChangeRelease] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [plate, onChangePlate] = useForms();
    const [pageNumber, onChangePageNumber] = useForms();
    const [bookCover, setBookCover] = useState(null);
    const [bookCoverThumbnail, setBookCoverThumbnail] = useState();
    const [bookCoverUrl, setBookCoverUrl] = useState();
    const [backCover, setBackCover] = useState(null);
    const [backCoverUrl, setBackCoverUrl] = useState();
    const [backCoverThumbnail, setBackCoverThumbnail] = useState();
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
        if (!bookCover || !backCover) {
            alert("파일을 선택해주세요.");
            return;
        }
        if (!suppertedFormats.includes(bookCover.type) || !suppertedFormats.includes(backCover.type)) {
            alert("지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.");
            return;
        }



        const formData = new FormData();
        if (bookCover !== null) {
            formData.append('bookCover', bookCover);
        }

        if (bookCoverThumbnail !== null) {
            formData.append('bookCoverThumbnail', bookCoverThumbnail);
        }

        if (backCover !== null) {
            formData.append('backCover', backCover);
        }

        if (backCoverThumbnail !== null) {
            formData.append('backCoverThumbnail', backCoverThumbnail);
        }

        if (pdf !== null) {
            formData.append('pdf', pdf);
        }

        if (designer !== null) {
            formData.append('designer', designer);
        }

        if (plate !== null) {
            formData.append('plate', plate);
        }

        if (pageNumber !== null) {
            formData.append('pageNumber', pageNumber);
        }

        if (year !== null) {
            formData.append('year', year);
        }

        if (release !== null) {
            formData.append('release', release);
        }

        if (title !== null) {
            formData.append('title', title);
        }

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
        const refreshToken = localStorage.getItem('refresh');

        try {
            const res = await normalAPI.post('/book', formData, {
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
                        '/book',
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
            <BookTitle>
                새 문집 게시하기
            </BookTitle>
            <Inputs>
                <InputsContainer>
                    <InputRow>
                        <div>
                            <InputTitle>제목</InputTitle>
                            <Input value={title} onChange={onChangeTitle} placeholder='예)와우문집2024' />
                        </div>
                        <div>
                            <InputTitle>발간일</InputTitle>
                            <Input value={release} onChange={onChangeRelease} type='date' />
                        </div>
                        <div>
                            <InputTitle>디자인</InputTitle>
                            <Input value={designer} onChange={onChangeDesigner} placeholder='예) 피카소 ' />
                        </div>
                    </InputRow>
                    <InputRow>
                        <div>
                            <InputTitle>년도</InputTitle>
                            <Input value={year} onChange={onChangeYear} placeholder='예) 2025 ' />
                        </div>
                        <div>
                            <InputTitle>판형</InputTitle>
                            <Input value={plate} onChange={onChangePlate} placeholder='예)B6' />
                        </div>
                        <div>
                            <InputTitle>쪽수</InputTitle>
                            <Input value={pageNumber} onChange={onChangePageNumber} placeholder='예)370' />
                        </div>
                    </InputRow>
                </InputsContainer>
                <div>
                    <InputTitle>표지 및 내지 게시</InputTitle>
                    <p>정상적인 문집 게시를 위해 하단의 업로드 가이드라인을 준수해주세요.</p>
                    <Red><p>게시에 성공할 시 하단에 이미지가 표시됩니다. </p></Red>
                    <br />
                    <InputTitle>앞표지</InputTitle>
                    <Input type='file' accept='image/*' onChange={onBookCoverChange} />
                </div>
                {bookCoverUrl && (
                    <div>
                        <img src={bookCoverUrl} alt="Thumbnail" />
                    </div>)}
                <div>
                    <br />
                    <InputTitle>뒷표지</InputTitle>
                    <Input type='file' accept='image/*' onChange={onBackCoverChange} />
                </div>
                {backCoverUrl && (
                    <div>
                        <img src={backCoverUrl} alt="Thumbnail" />
                    </div>
                )}
                <div>
                    <InputTitle>본문(파일명은 영어 혹은 _ 만 가능)</InputTitle>
                    <Input type='file' accept='.pdf' onChange={onPdfChange} />
                </div>
            </Inputs>
            <RightSubmit>
                <Button type='submit' onClick={onClickUpload}>게시하기</Button>
            </RightSubmit>
        </BookInfoContainer>
    );
};

export default BookUpload;
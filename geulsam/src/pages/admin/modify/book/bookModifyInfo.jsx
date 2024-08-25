import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForms } from '../../../../hooks/useForms';
import { InputsContainer, InputRow, Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit, Red } from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
import { normalAPI } from '../../../../apis/Api';

const BookUpload = () => {
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
    const { bookId, field, search } = useParams();

    const [bookData, setBooktData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getBookData = async () => {
        try {
            const resp = await normalAPI.get(`/book/${bookId}`);
            console.log(resp.data);
            setBooktData(resp.data.data);
            setLoading(false);
        } catch (error) {
            console.error('api fetching error', error);
        }
    };

    useEffect(() => {
        getBookData();
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

    const onBookCoverChange = async (e) => {
        try {
            const selectedBookCoverFile = e.target.files[0];
            setBookCover(selectedBookCoverFile);

            const resizedBookCover = await resizeFile(selectedBookCoverFile);
            setBookCoverThumbnail(resizedBookCover);

            const readerBookCover = new FileReader();
            readerBookCover.onload = () => {
                setBookCoverUrl(readerBookCover.result);
            };
            readerBookCover.readAsDataURL(resizedBookCover);

            console.log(selectedBookCoverFile);
            console.log(resizedBookCover);
        } catch (error) {
            console.log(error);
        }
    };

    const onBackCoverChange = async (e) => {
        try {
            const selectedBackCoverFile = e.target.files[0];
            setBackCover(selectedBackCoverFile);

            const resizedBackCover = await resizeFile(selectedBackCoverFile);
            setBackCoverThumbnail(resizedBackCover);

            const readerBackCover = new FileReader();
            readerBackCover.onload = () => {
                setBackCoverUrl(readerBackCover.result);
            };
            readerBackCover.readAsDataURL(resizedBackCover);

            console.log(selectedBackCoverFile);
            console.log(resizedBackCover);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangePdf = (e) => {
        setPdf(e.target.files[0]);
    }

    const onClickUpload = async (e) => {
        e.preventDefault();

        const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
        if (!bookCover || !backCover) {
            alert("파일을 선택해주세요.");
            return;
        }
        if (!supportedFormats.includes(bookCover.type) || !supportedFormats.includes(backCover.type)) {
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
        const accessToken = localStorage.getItem('access');
        //https://geulsaem.store/book?field=id&search=dssda-sdfasdf-dsafdasf-asdfdsa
        ///book?field=${field}&search=${search}

        try {
            const res = await normalAPI.put(`/book?field=${field}&search=${search}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': accessToken,
                },
            });
            console.log(res);
        } catch (error) {
            console.error(error);
            try {
                const refreshToken = localStorage.getItem('refresh');
                const res = await normalAPI.put(`/book?field=${field}&search=${search}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'refreshToken': refreshToken,
                    },
                });
                console.log(res);
            } catch (error) {
                console.log(error);
                alert('수정에 실패했습니다.');
                alert('다시 로그인하거나 파일을 확인해주세요.');
            }
        }
    };

    const onClickDelete = async () => {
        const accessToken = localStorage.getItem('access');
        if (!window.confirm('정말로 삭제하시겠습니까?'))
            return;

        try {
            await normalAPI.delete(`/book?field=${field}&search=${search}`, {
                headers: {
                    'accessToken': accessToken,
                },
            });
            alert('문집이 삭제되었습니다.');
            navigate('/book'); // 페이지 이동
        } catch (error) {
            console.error(error);
            alert('문집 삭제에 실패했습니다.');
        }
    };

    return (
        <BookInfoContainer>
            <BookTitle>
                문집 수정하기
            </BookTitle>
            <Inputs>
                <InputsContainer>
                    <InputRow>
                        <div>
                            <InputTitle>제목</InputTitle>
                            <Input value={title} onChange={onChangeTitle} placeholder={bookData.title} />
                        </div>
                        <div>
                            <InputTitle>발간일</InputTitle>
                            <Input value={release} onChange={onChangeRelease} placeholder={bookData.release} />
                        </div>
                        <div>
                            <InputTitle>디자인</InputTitle>
                            <Input value={designer} onChange={onChangeDesigner} placeholder={bookData.designer} />
                        </div>
                    </InputRow>
                    <InputRow>
                        <div>
                            <InputTitle>연도</InputTitle>
                            <Input value={year} onChange={onChangeYear} placeholder={bookData.year} />
                        </div>
                        <div>
                            <InputTitle>판형</InputTitle>
                            <Input value={plate} onChange={onChangePlate} placeholder={bookData.plate} />
                        </div>
                        <div>
                            <InputTitle>쪽수</InputTitle>
                            <Input value={pageNumber} onChange={onChangePageNumber} placeholder={bookData.page} />
                        </div>
                    </InputRow>
                </InputsContainer>
                <div>
                    <InputTitle>표지 및 내지 게시</InputTitle>
                    <p>정상적인 문집 게시를 위해 하단의 업로드 가이드라인을 준수해주세요.</p>
                    <Red><p>게시에 성공할 시 하단에 이미지가 표시됩니다. </p></Red>
                    <br />
                    <InputTitle>앞표지(파일명은 영어 혹은 _ 만 가능)</InputTitle>
                    <Input type='file' onChange={onBookCoverChange} />
                </div>
                {bookCoverUrl && (
                    <div>
                        <img src={bookCoverUrl} alt="Thumbnail" placeholder={bookData.thumbNail} />
                    </div>)}
                <div>
                    <br />
                    <InputTitle>뒷표지(파일명은 영어 혹은 _ 만 가능)</InputTitle>
                    <Input type='file' onChange={onBackCoverChange} />
                </div>
                {backCoverUrl && (
                    <div>
                        <img src={backCoverUrl} alt="Thumbnail" />
                    </div>
                )}
                <div>
                    <InputTitle>본문(파일명은 영어 혹은 _ 만 가능)</InputTitle>
                    <Input type='file' onChange={onChangePdf} />
                </div>
            </Inputs>
            <RightSubmit>
                <Button type='submit' onClick={onClickUpload}>수정하기</Button>
                <Button type='button' onClick={onClickDelete}>삭제하기</Button>
            </RightSubmit>
        </BookInfoContainer>
    );
}

export default BookUpload;
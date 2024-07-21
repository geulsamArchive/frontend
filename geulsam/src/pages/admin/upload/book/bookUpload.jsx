import React from 'react';
<<<<<<< Updated upstream

const bookUpload = () => {
    return (
        <div>

        </div>
    );
};

export default bookUpload;
=======
import Resizer from "react-image-file-resizer";
import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit, InputsBookUpload, InputRow } from '../../../../style/StyledComponent';

const BookUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [release, onChangeRelease] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [plate, onChangePlate] = useForms();
    const [pageNumber, onChangePageNumber] = useForms();
    const [bookCover, setBookCover] = useState(null); //앞표지
    const [pdf, setPdf] = useState(null); // 본문
    const [year, onChangeYear] = useForms();
    const [compressedImage, setCompressedImage] = useState(null);
    //const [뒤표지]


    const onBookCoverChange = async (e) => { // 
        const file = e.target.files[0];
        console.log("image incoding before : ", file);
        const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
        if (!e.target.files[0]) {
            return;
        }
        if (!supportedFormats.includes(file.type)) {
            alert(
                "지원되지 않는 이미지 형식입니다. JPEG, PNG 형식의 이미지를 업로드해주세요."
            );
            return;
        }
        try {
            const compressedFile = await (resizeFile(e.target.files[0]));
            console.log("image incoding after : ", compressedFile);
            setCompressedImage(compressedFile);
            //setImagePreview(String(compressedFile));
            //setUploadImage(String(compressedFile));
        }
        catch (error) {
            console.log("file resizing failed");
        }
        setBookCover(e.target.files[0]);
        console.log(bookCover)
    };

    const onPdfChange = (e) => {
        setPdf(e.target.files[0]);
        console.log(pdf);
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                200, // width
                200, // height
                "SVG", // format
                100, // quality
                0, // rotation
                (uri) => {
                    resolve(uri);
                },
                "base64" // output type
            );
        });

    //뒤표지 이벤트 핸들러


    // const onClickUpload = async (e) => {
    //     e.preventDefault();
    //     if (!pdf || !bookCover/*||!뒤표지*/) {
    //         alert("파일을 선택해주세요.");
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('title', title)
    //     formData.append('release', release)
    //     formData.append('designer', designer)
    //     formData.append('plate', plate)
    //     formData.append('bookCover', bookCover)
    //     formData.append('pageNumber', pageNumber)
    //     formData.append('pdf', pdf)
    //     formData.append('year', year)

    //     const accessToken = localStorage.getItem('access')

    //     try {

    //         const res = await axios.post('', formData, {
    //             headers: {

    //             }
    //         })
    //         console.log(res)
    //     } catch (error) {
    //         console.error(error);
    //         formData.forEach((value, key) => {
    //             console.log(`${key}: ${value}`);
    //         })
    //     }
    // }


    return (
        <BookInfoContainer>
            <BookTitle>
                새 문집 게시하기
            </BookTitle>
            <InputsBookUpload>
                <InputRow>
                    <div>
                        <InputTitle>제목</InputTitle>
                        <Input value={title} onChange={onChangeTitle} placeholder='예)와우문집2024' />
                    </div>
                    <div>
                        <InputTitle>발간일</InputTitle>
                        <Input value={release} onChange={onChangeRelease} placeholder='예)2024' />
                    </div>
                </InputRow>
                <InputRow>
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
                </InputRow>
                <div>
                    <InputTitle>표지 및 내지 게시</InputTitle>
                    <p>정상적인 문집 게시를 위해 하단의 업로드 가이드라인을 준수해주세요.</p>
                    <p>게시에 성공할 시 하단에 이미지가 표시됩니다.</p>
                    <Input type="file" id="frontImage" className={StyleSheet.inputImage} accept="image/*"
                        onChange={onBookCoverChange} />
                </div>
                {compressedImage && (
                    <div>
                        <p>미리보기:</p>
                        <img src={compressedImage} alt="Compressed Preview" />
                    </div>
                )}
                <div> // 뒷표지 나오면 짜기.
                    <Input type='file' /*onChange={onFileChange} */ />
                </div>
            </InputsBookUpload>
            <hr />
            <br />
            <br />
            <br />
            <br />
            <br />
            <RightSubmit>
                <Button type='submit' /*onClick={onClickUpload}*/>게시하기</Button>
            </RightSubmit>
        </BookInfoContainer>
    );
};

export default BookUpload; //기본구조 정하기
>>>>>>> Stashed changes

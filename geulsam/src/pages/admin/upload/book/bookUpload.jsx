import React from 'react';
import { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import { Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit } from '../../../../style/StyledComponent';

const BookUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [release, onChangeRelease] = useForms();
    const [designer, onChangeDesigner] = useForms();
    const [plate, onChangePlate] = useForms();
    const [pageNumber, onChangePageNumber] = useForms();
    const [bookCover, setBookCover] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [year, onChangeYear] = useForms();

    const onFileChange = (e) => {

        setBookCover(e.target.files[0]);
        console.log(bookCover)
    };

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
                    <p>게시에 성공할 시 하단에 이미지가 표시됩니다.</p>
                    <Input type='file' onChange={onFileChange} />
                </div>
            </Inputs>
        </BookInfoContainer>
    );
};

export default BookUpload;
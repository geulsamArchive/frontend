import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForms } from '../../../../hooks/useForms';
import { useFormNull } from '../../../../hooks/useFormNull';
import {
    BookButton, BookSubmitModify, BookSubmit, BookTableAddButtonMobile, BookTableAddButton, BookDiv, ConnectBox, ConnectButton, BookStyledTableMobile,
    BookStyledTable, TableHeader, TableRow, TableCell, FlexContainer, Bookp, SmallTableInput, TableInput, Grayp, InputsContainer, InputRow, Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit, Red
} from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
import { normalAPI } from '../../../../apis/Api';

const BookUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [release, onChangeRelease] = useFormNull();
    const [designer, onChangeDesigner] = useFormNull();
    const [plate, onChangePlate] = useFormNull();
    const [pageNumber, onChangePageNumber] = useFormNull();
    const [bookCover, setBookCover] = useState(null);
    const [bookCoverThumbnail, setBookCoverThumbnail] = useState(null);
    const [bookCoverUrl, setBookCoverUrl] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [backCoverUrl, setBackCoverUrl] = useState(null);
    const [backCoverThumbnail, setBackCoverThumbnail] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [year, onChangeYear] = useFormNull();
    const { bookId, id } = useParams();
    const [bookData, setBooktData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 목차 등록하기 테이블 상태
    const [rows, setRows] = useState([{ pageNumber: '', author: '', title: '', error: '', showButton: true, workName: '', workId: '', uuid: ' ' }]);
    const [bookContentList, setBookContentList] = useState([]);


    const addBookContent = (bookContentId, title, name, page) => {
        const contentId = bookContentId[0];
        const newContent = { contentId, title, name, page };
        console.log(contentId, title, name, page);
        console.log(newContent);
        setBookContentList([...bookContentList, newContent]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([...rows, { pageNumber: '', author: '', title: '', error: '', showButton: true, workName: '', workId: '' }]);
    };

    const handleFindWork = async (index, author, title, page) => {
        const accessToken = localStorage.getItem('access');
        setLoading(true);
        try {
            const response = await normalAPI.get('/content/forBook', {
                params: { userName: author, contentTitle: title },
                headers: { 'accessToken': accessToken }
            });
            const id = response.data.data; // Assuming the first ID is used
            console.log(id);

            if (!id) {
                const updatedRows = [...rows];
                updatedRows[index].error = '현재 사이트에 게시되지 않은 작품입니다.';
                updatedRows[index].showButton = false;
                setRows(updatedRows);
            } else {
                const workResponse = await normalAPI.get(`/content/${id}`, {
                    headers: { 'accessToken': accessToken }
                });
                const workData = workResponse.data;
                console.log(workData);
                if (workData) {
                    console.log(id, title, author, page);
                    addBookContent(id, title, author, page); // 데이터 추가
                }
                const updatedRows = [...rows];
                updatedRows[index].workName = workData.title;
                updatedRows[index].workId = id;
                updatedRows[index].showButton = false;
                setRows(updatedRows);
            }
        } catch (error) {
            console.error('Error fetching work:', error);
            const updatedRows = [...rows];
            updatedRows[index].error = '현재 사이트에 게시되지 않은 작품입니다.';
            updatedRows[index].showButton = false;
            setRows(updatedRows);
        }
        setLoading(false);
    };


    const handleRetry = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].error = '';
        updatedRows[index].showButton = true;
        updatedRows[index].workName = '';
        updatedRows[index].workId = '';
        setRows(updatedRows);
    };

    const handleWorkClick = (id) => {
        console.log("작품 id", id);
        navigate(`/work/${id}`); // 작품 페이지로 이동
    }

    const handleDelete = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].workName = '';
        updatedRows[index].workId = '';
        updatedRows[index].showButton = true; // "작품 찾기" 버튼을 다시 표시
        setRows(updatedRows);
    };

    const getBookData = async () => {
        try {
            const resp = await normalAPI.get(`/book/${bookId}`);
            console.log(resp.data);
            setBooktData(resp.data.data);
            const fetchedData = resp.data.data;
            setBooktData(fetchedData);
            if (fetchedData.bookContentResList) {
                const updatedRows = fetchedData.bookContentResList.map((content) => ({
                    page: content.page,
                    author: content.name,
                    title: content.title,
                    workName: content.title,
                    workId: content.contentId,
                    uuid: content.bookContentId,
                    year: content.year,
                    error: '',
                    showButton: false // 이미 연결된 작품이므로 버튼 비활성화
                }));
                setRows(updatedRows);
            }


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
    const [refresh, setRefresh] = useState(false); // 상태 추가

    const onClickUpload = async (e) => {
        e.preventDefault();

        // const supportedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
        // if (!bookCover || !backCover) {
        //     alert("파일을 선택해주세요.");
        //     return;
        // }
        // if (!supportedFormats.includes(bookCover.type) || !supportedFormats.includes(backCover.type)) {
        //     alert("지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.");
        //     return;
        // }

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

        if (designer !== null && designer !== "") {
            formData.append('designer', designer);
        }

        if ((plate !== null) && plate !== "") {
            formData.append('plate', plate);
        }
        if (pageNumber !== null && pageNumber !== "") {
            formData.append('pageNumber', pageNumber);
        }
        if (year !== null && year !== "") {
            formData.append('year', year);
        }
        if (release !== null && release !== "") {
            formData.append('release', release);
        }
        if (title !== null && title !== "") {
            formData.append('title', title);
        }
        const contentListWithUuid = rows.map(row => ({
            uuid: row.uuid ?? null,
            page: row.page ?? null,
            title: row.title ?? null,
            name: row.author ?? null,
            contentId: (Array.isArray(row.workId) ? row.workId[0] : row.workId) ?? null,// 배열일 경우 첫 번째 값만 사용
        }));
        console.log("contentId", contentListWithUuid[4]);
        console.log("uuid가 추가된 list", contentListWithUuid);
        formData.append('bookContentList', JSON.stringify(contentListWithUuid));

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        const accessToken = localStorage.getItem('access');
        //https://geulsaem.store/book?field=id&search=dssda-sdfasdf-dsafdasf-asdfdsa
        ///book?field=${field}&search=${search}

        try {
            const res = await normalAPI.put(`/book?field=${id}&search=${bookId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': accessToken,
                },
            });
            console.log(res);
            if (res.status == 200) {
                alert('문집 수정에 성공했습니다.');
                setRefresh(true); // 상태 변경하여 리렌더링 트리거

            }
        } catch (error) {
            console.error(error);
            try {
                const refreshToken = localStorage.getItem('refresh');
                const res = await normalAPI.put(`/book?field=${id}&search=${bookId}`, formData, {
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
    useEffect(() => {
        if (refresh) {
            window.location.reload(); // 페이지 새로고침
        }
    }, [refresh]);

    const onClickDelete = async () => {
        const accessToken = localStorage.getItem('access');
        if (!window.confirm('정말로 삭제하시겠습니까?'))
            return;

        try {
            await normalAPI.delete(`/book?field=${id}&search=${bookId}`, {
                headers: {
                    'accessToken': accessToken,
                },
            });
            alert('문집이 삭제되었습니다.');
            navigate('/admin/book/modify'); // 페이지 이동
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
                            <Input value={release} onChange={onChangeRelease} placeholder={bookData.release} type='date' />
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
            <hr />
            <br />
            <InputTitle>목차 등록하기</InputTitle>
            <br />
            <p>특정 작가의 작품이 아닌 목차의 경우 작가란을 공란으로 남겨두세요.</p>
            <br />
            <Grayp>(단, 작품 페이지는 작가/제목을 전부 작성해야 연결할 수 있습니다.)</Grayp>
            <BookStyledTable>
                <thead>
                    <TableRow>
                        <TableHeader>쪽수</TableHeader>
                        <TableHeader>작가</TableHeader>
                        <TableHeader>제목</TableHeader>
                        <TableHeader>작품 페이지 연결</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <SmallTableInput
                                    value={row.page}
                                    onChange={(e) => handleInputChange(index, 'page', e.target.value)}
                                    placeholder="쪽수 입력"
                                />
                            </TableCell>
                            <TableCell>
                                <SmallTableInput
                                    value={row.author}
                                    onChange={(e) => handleInputChange(index, 'author', e.target.value)}
                                    placeholder="작가 입력"
                                />
                            </TableCell>
                            <TableCell>
                                <TableInput
                                    value={row.title}
                                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                    placeholder="제목 입력"
                                />
                            </TableCell>
                            <TableCell>
                                {row.showButton ? (
                                    <Button onClick={() => handleFindWork(index, row.author, row.title, row.page)}>
                                        작품 찾기
                                    </Button>
                                ) : (
                                    <>
                                        <FlexContainer>
                                            {row.error ? (
                                                <Red>{row.error}</Red>
                                            ) : (
                                                <Bookp
                                                    onClick={() => handleWorkClick(row.workId)}
                                                >
                                                    {row.author}  &middot; {row.title}
                                                </Bookp>
                                            )}
                                            <Grayp onClick={() => handleRetry(index)}>다시 찾기</Grayp>
                                            <Grayp onClick={() => handleDelete(index)}>연결 끊기</Grayp>
                                        </FlexContainer>
                                    </>

                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </BookStyledTable>
            <BookTableAddButton onClick={addRow}>행 추가</BookTableAddButton>


            {/*모바일 테이블*/}
            <BookStyledTableMobile>
                <tbody>
                    {rows.map((row, index) => (
                        <>
                            <TableRow key={`${index}-page`}>
                                <TableHeader>쪽수</TableHeader>
                                <TableCell>
                                    <TableInput
                                        value={row.page}
                                        onChange={(e) => handleInputChange(index, 'page', e.target.value)}
                                        placeholder="쪽수 입력"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${index}-author`}>
                                <TableHeader>작가</TableHeader>
                                <TableCell>
                                    <TableInput
                                        value={row.author}
                                        onChange={(e) => handleInputChange(index, 'author', e.target.value)}
                                        placeholder="작가 입력"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${index}-title`}>
                                <TableHeader>제목</TableHeader>
                                <TableCell>
                                    <TableInput
                                        value={row.title}
                                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        placeholder="제목 입력"
                                    />
                                </TableCell>
                            </TableRow>
                            {row.showButton ? (
                                <>
                                    <ConnectButton onClick={() => handleFindWork(index, row.author, row.title, row.page)}>
                                        작품 페이지 연결하기
                                    </ConnectButton>
                                    <div><br /><br /></div>
                                </>
                            ) : (
                                <>
                                    <div><br /></div>
                                    <FlexContainer>
                                        {row.error ? (
                                            <>
                                                <div><br /><br /><br /><br /></div>
                                                <Red>{row.error}</Red>
                                            </>
                                        ) : (
                                            <Bookp onClick={() => handleWorkClick(row.workId)}>
                                                {row.author} &middot; {row.title}
                                            </Bookp>
                                        )}
                                        <Grayp onClick={() => handleRetry(index)}>다시 찾기</Grayp>
                                        <Grayp onClick={() => handleDelete(index)}>연결 끊기</Grayp>
                                    </FlexContainer>
                                </>
                            )}<br /><br />
                        </>
                    ))}
                </tbody >
            </BookStyledTableMobile>
            <BookTableAddButtonMobile onClick={addRow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2518 9.52876C18.2518 14.5422 14.1876 18.6063 9.17424 18.6063C4.16082 18.6063 0.0966492 14.5422 0.0966492 9.52876C0.0966492 4.51535 4.16082 0.451172 9.17424 0.451172C14.1876 0.451172 18.2518 4.51535 18.2518 9.52876ZM9.17429 15.5805C8.61724 15.5805 8.16567 15.1289 8.16567 14.5718V10.5379H4.13115C3.5741 10.5379 3.12252 10.0863 3.12252 9.5293C3.12252 8.97225 3.5741 8.52068 4.13115 8.52068H8.16567V4.48564C8.16567 3.92859 8.61724 3.47702 9.17429 3.47702C9.73133 3.47702 10.1829 3.92859 10.1829 4.48564V8.52068H14.2174C14.7744 8.52068 15.226 8.97225 15.226 9.5293C15.226 10.0863 14.7744 10.5379 14.2174 10.5379H10.1829V14.5718C10.1829 15.1289 9.73133 15.5805 9.17429 15.5805Z" fill="#EAE9E3" />
                </svg>
                &nbsp;&nbsp;&nbsp;목차 추가하기
            </BookTableAddButtonMobile>
            <BookSubmitModify>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <BookButton type='submit' onClick={onClickUpload}>수정하기</BookButton>
                <BookButton type='button' onClick={onClickDelete}>삭제하기</BookButton>
            </BookSubmitModify>
            <br />
            <br />
        </BookInfoContainer>
    );
}

export default BookUpload;
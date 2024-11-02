import React, { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import {
  FlexContainer, Bookp, SmallTableInput, TableInput, Grayp, InputRow, Input, Inputs, InputTitle,
  Button, BookInfoContainer, BookTitle, RightSubmit, Red, InputsContainer, StyledTable, TableRow, TableHeader, TableCell
} from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
import { normalAPI } from '../../../../apis/Api';
import { useAuth } from '../../../../store/Auth';
import { useNavigate } from 'react-router-dom';

const BookUpload = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [title, onChangeTitle] = useForms();
  const [release, onChangeRelease] = useForms();
  const [designer, onChangeDesigner] = useForms();
  const [plate, onChangePlate] = useForms();
  const [pageNumber, setPageNumber] = useState(0); // 기본값을 0으로 설정
  const [bookCover, setBookCover] = useState(null);
  const [bookCoverUrl, setBookCoverUrl] = useState();
  const [backCover, setBackCover] = useState(null);
  const [backCoverUrl, setBackCoverUrl] = useState();
  const [pdf, setPdf] = useState(null);
  const [year, setYear] = useState(0); // 기본값을 0으로 설정
  const [rows, setRows] = useState([{ pageNumber: '', author: '', title: '', error: '', showButton: true, workName: '', workId: '' }]);
  const [bookContentList, setBookContentList] = useState([]);

  const addBookContent = (page, title, name, contentId) => {
    const newContent = { page, title, name, contentId };
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

  const handleFindWork = async (index, author, title) => {
    const accessToken = localStorage.getItem('access');
    try {
      const response = await normalAPI.get('/content/forBook', {
        params: { userName: author, contentTitle: title },
        headers: { 'accessToken': accessToken }
      });
      const id = response.data.data;
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
        if (workData) {
          addBookContent(rows[index].pageNumber || 0, workData.title, author, id); // 기본값 0 사용
        }
        const updatedRows = [...rows];
        updatedRows[index].workName = workData.title;
        updatedRows[index].workId = id;
        updatedRows[index].showButton = false;
        setRows(updatedRows);
      }
    } catch (error) {
      const updatedRows = [...rows];
      updatedRows[index].error = '현재 사이트에 게시되지 않은 작품입니다.';
      updatedRows[index].showButton = false;
      setRows(updatedRows);
    }
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
    navigate(`/work/${id}`);
  };

  const handleDelete = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].workName = '';
    updatedRows[index].workId = '';
    updatedRows[index].showButton = true;
    setRows(updatedRows);
  };

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
  };

  const onBookCoverChange = async (e) => {
    const selectedBookCoverFile = e.target.files[0];
    if (selectedBookCoverFile) {
      const reader = new FileReader();
      reader.onload = () => setBookCoverUrl(reader.result);
      reader.readAsDataURL(selectedBookCoverFile);
      setBookCover(selectedBookCoverFile);
    }
  };

  const onBackCoverChange = async (e) => {
    const selectedBackCoverFile = e.target.files[0];
    if (selectedBackCoverFile) {
      const reader = new FileReader();
      reader.onload = () => setBackCoverUrl(reader.result);
      reader.readAsDataURL(selectedBackCoverFile);
      setBackCover(selectedBackCoverFile);
    }
  };

  const onClickUpload = async (e) => {
    e.preventDefault();

    // Prepare data for JSON payload
    const data = {
      title,
      release,
      designer,
      plate,
      pageNumber: pageNumber || 0, // 기본값 0 설정
      year: year || 0, // 기본값 0 설정
      bookContentList: bookContentList.length > 0 ? bookContentList : [],
    };

    // Handle file uploads separately
    const formData = new FormData();
    if (bookCover) formData.append('bookCover', bookCover);
    if (backCover) formData.append('backCover', backCover);
    if (pdf) formData.append('pdf', pdf);

    const accessToken = localStorage.getItem('access');

    try {
      // Upload metadata first
      const res = await normalAPI.post('/book', data, {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': accessToken,
        },
      });

      // Upload files
      await normalAPI.post('/book/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accessToken': accessToken,
        },
      });

      alert('게시에 성공했습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('게시 중 문제가 발생했습니다.');
    }
  };

  return (
    <BookInfoContainer>
      <BookTitle>새 문집 게시하기</BookTitle>
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
              <Input value={designer} onChange={onChangeDesigner} placeholder='예) 피카소' />
            </div>
          </InputRow>
          <InputRow>
            <div>
              <InputTitle>년도</InputTitle>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : 0)}
                placeholder='예) 2025'
              />
            </div>
            <div>
              <InputTitle>판형</InputTitle>
              <Input value={plate} onChange={onChangePlate} placeholder='예) B6' />
            </div>
            <div>
              <InputTitle>쪽수</InputTitle>
              <Input
                type="number"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value ? parseInt(e.target.value, 10) : 0)}
                placeholder='예) 370'
              />
            </div>
          </InputRow>
        </InputsContainer>
        <div>
          <InputTitle>표지 및 내지 게시</InputTitle>
          <p>정상적인 문집 게시를 위해 하단의 업로드 가이드라인을 준수해주세요.</p>
          <Red><p>게시에 성공할 시 하단에 이미지가 표시됩니다.</p></Red>
          <br />
          <InputTitle>앞표지</InputTitle>
          <Input type='file' accept='image/*' onChange={onBookCoverChange} />
        </div>
        {bookCoverUrl && (
          <div>
            <img src={bookCoverUrl} alt="Thumbnail" />
          </div>
        )}
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
      <hr />
      <br />
      <InputTitle>목차 등록하기</InputTitle>
      <br />
      <p>특정 작가의 작품이 아닌 목차의 경우 작가란을 공란으로 남겨두세요.</p>
      <br />
      <Grayp>(단, 작품 페이지는 작가/제목을 전부 작성해야 연결할 수 있습니다.)</Grayp>
      <StyledTable>
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
                  type="number"
                  value={row.pageNumber}
                  onChange={(e) => handleInputChange(index, 'pageNumber', e.target.value ? parseInt(e.target.value, 10) : 0)}
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
                  <Button onClick={() => handleFindWork(index, row.author, row.title)}>
                    작품 찾기
                  </Button>
                ) : (
                  <FlexContainer>
                    {row.error ? (
                      <Red>{row.error}</Red>
                    ) : (
                      <Bookp onClick={() => handleWorkClick(row.workId)}>
                        {row.author} - {row.title}
                      </Bookp>
                    )}
                    <Grayp onClick={() => handleRetry(index)}>다시 찾기</Grayp>
                    <Grayp onClick={() => handleDelete(index)}>연결 끊기</Grayp>
                  </FlexContainer>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <Button onClick={addRow}>행 추가</Button>
      <RightSubmit>
        <Button type='submit' onClick={onClickUpload}>게시하기</Button>
      </RightSubmit>
    </BookInfoContainer>
  );
};

export default BookUpload;

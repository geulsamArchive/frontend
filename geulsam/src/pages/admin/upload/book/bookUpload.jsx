import React, { useState } from 'react';
import { useForms } from '../../../../hooks/useForms';
import {
  BookSubmit, BookTableAddButtonMobile, BookTableAddButton, BookDiv, ConnectBox, ConnectButton, BookStyledTableMobile, FlexContainer, Bookp, SmallTableInput, TableInput, Grayp, InputRow, Input, Inputs, InputTitle,
  Button, BookInfoContainer, BookTitle, RightSubmit, Red, InputsContainer, BookStyledTable, TableRow, TableHeader, TableCell
} from '../../../../style/StyledComponent';
import Resizer from "react-image-file-resizer";
import { normalAPI } from '../../../../apis/Api';
import { useAuth } from '../../../../store/Auth';
import { useNavigate } from 'react-router-dom'; // 라우팅을 위해 추가

const BookUpload = () => {
  const navigate = useNavigate();
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

  // 목차 등록하기 테이블 상태
  const [rows, setRows] = useState([{ pageNumber: '', author: '', title: '', error: '', showButton: true, workName: '', workId: '' }]);
  const [loading, setLoading] = useState(false);
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
    console.log("작품 id 찾기 함수 실행함");
    navigate(`/work/${id}`); // 작품 페이지로 이동
  }

  const handleDelete = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].workName = '';
    updatedRows[index].workId = '';
    updatedRows[index].showButton = true; // "작품 찾기" 버튼을 다시 표시
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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };

  const onClickUpload = async (e) => {
    const suppertedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
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
    if (bookContentList !== null) {
      console.log(bookContentList);
      console.log(JSON.stringify(bookContentList));
      formData.append('bookContentList', JSON.stringify(bookContentList));
    }//JSON.stringify(bookContentList)

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    try {
      const res = await normalAPI.post('/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accessToken': accessToken
        }
      });
      console.log(res);
      alert('게시에 성공했습니다.');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('토큰 재전송');
        try {
          const tokenResponse = await normalAPI.post('/book', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'refreshToken': refreshToken,
            }
          });
          console.log(tokenResponse);
          if (tokenResponse.status === 200) {
            const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '');
            localStorage.setItem('access', newAccessToken);
            if (tokenResponse.headers.refreshtoken) {
              const newRefreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
              localStorage.setItem('refresh', newRefreshToken);
            }
            alert('포스터를 성공적으로 게시했습니다.');
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

      {/* <table class="custom-table">
  <tbody>
    <tr>
      <th>쪽수</th>
      <td>2</td>
    </tr>
    <tr>
      <th>작가</th>
      <td>강승연</td>
    </tr>
    <tr>
      <th>제목</th>
      <td>머리말</td>
    </tr>
  </tbody>
</table> */}
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
                        <BookDiv>
                          <Bookp
                            onClick={() => handleWorkClick(row.workId)}
                          >
                            {row.author}  &middot; {row.title}
                          </Bookp>
                        </BookDiv>
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

      {/* 모바일 테이블 */}

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
      <BookTableAddButton onClick={addRow}>행 추가</BookTableAddButton>
      <BookTableAddButtonMobile onClick={addRow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2518 9.52876C18.2518 14.5422 14.1876 18.6063 9.17424 18.6063C4.16082 18.6063 0.0966492 14.5422 0.0966492 9.52876C0.0966492 4.51535 4.16082 0.451172 9.17424 0.451172C14.1876 0.451172 18.2518 4.51535 18.2518 9.52876ZM9.17429 15.5805C8.61724 15.5805 8.16567 15.1289 8.16567 14.5718V10.5379H4.13115C3.5741 10.5379 3.12252 10.0863 3.12252 9.5293C3.12252 8.97225 3.5741 8.52068 4.13115 8.52068H8.16567V4.48564C8.16567 3.92859 8.61724 3.47702 9.17429 3.47702C9.73133 3.47702 10.1829 3.92859 10.1829 4.48564V8.52068H14.2174C14.7744 8.52068 15.226 8.97225 15.226 9.5293C15.226 10.0863 14.7744 10.5379 14.2174 10.5379H10.1829V14.5718C10.1829 15.1289 9.73133 15.5805 9.17429 15.5805Z" fill="#EAE9E3" />
        </svg>
        &nbsp;&nbsp;&nbsp;목차 추가하기
      </BookTableAddButtonMobile>
      <BookSubmit>
        <Button type='submit' onClick={onClickUpload}>게시하기</Button>
      </BookSubmit>
      <br />
      <br />
    </BookInfoContainer>
  );
};

export default BookUpload;

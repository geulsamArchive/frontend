import React, { useEffect, useState } from 'react';
import {
  AccordionHeader,
  AccordionContainer,
  AccordionContent,
  CommentFooter,
} from '../../style/Accodion';
import { authAPI } from '../../apis/Api';
import { useForms } from '../../hooks/useForms';
import { useAuth } from '../../store/Auth';
import { normalAPI } from '../../apis/Api';
import Pagination from '../Paging/Pagination';
import {
  CommentInput,
  TextCounter,
  CommentInputBottom,
  CommentInputContainer,
  CommentContainer,
  CommentWriter,
  CommentWriting,
  CommentTop,
  CommentCreatedAt,
  CommentDelete,
  CommentsContainer,
  Upload,
  CommentAllContainer,
} from '../../style/Comment';
import {
  AnimatedBookIndexList,
  BookIndexAlign,
  BookIndexButton,
  BookIndexButtonTop,
  BookIndexHeader,
  Button,
  CloseButton,
  Footers,
} from '../../style/StyledComponent';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';
import Footer from '../footer/Footer';

export const Accordion = ({ name, content: ContentComponent, contentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Mobile>
        {!isOpen && (
          <BookIndexButton onClick={toggleAccordion}>{name}</BookIndexButton>
        )}
        {isOpen && (
          <AnimatedBookIndexList isOpen={isOpen}>
            <BookIndexHeader>
              <BookIndexButtonTop onClick={toggleAccordion}>
                {name}
              </BookIndexButtonTop>
              <CloseButton onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    d="M11.5002 21.1752C10.2297 21.1752 8.97156 20.9249 7.79773 20.4387C6.62391 19.9525 5.55734 19.2399 4.65894 18.3415C3.76053 17.443 3.04787 16.3765 2.56166 15.2027C2.07545 14.0288 1.8252 12.7707 1.8252 11.5002C1.8252 10.2297 2.07545 8.97156 2.56166 7.79773C3.04788 6.62391 3.76053 5.55734 4.65894 4.65894C5.55735 3.76053 6.62391 3.04787 7.79773 2.56166C8.97156 2.07545 10.2297 1.8252 11.5002 1.8252C12.7707 1.8252 14.0288 2.07545 15.2027 2.56166C16.3765 3.04788 17.443 3.76053 18.3415 4.65894C19.2399 5.55735 19.9525 6.62391 20.4387 7.79774C20.9249 8.97156 21.1752 10.2297 21.1752 11.5002C21.1752 12.7707 20.9249 14.0288 20.4387 15.2027C19.9525 16.3765 19.2399 17.443 18.3415 18.3415C17.443 19.2399 16.3765 19.9525 15.2027 20.4387C14.0288 20.9249 12.7707 21.1752 11.5002 21.1752L11.5002 21.1752Z"
                    stroke="#81807F"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8.2749 8.2749L14.7249 14.7249"
                    stroke="#81807F"
                    stroke-width="1.86"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.7251 8.2749L8.2751 14.7249"
                    stroke="#81807F"
                    stroke-width="1.86"
                    stroke-linecap="round"
                  />
                </svg>
              </CloseButton>
            </BookIndexHeader>
            <br />
            <br />
            <br />
            <BookIndexAlign>
              <ContentComponent contentId={contentId} />
            </BookIndexAlign>
            <CommentFooter>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
            </CommentFooter>
          </AnimatedBookIndexList>
        )}
      </Mobile>
      <Desktop>
        <AccordionContainer>
          <AccordionHeader onClick={toggleAccordion}>
            {name} &nbsp;{' '}
            {isOpen ? (
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6029 1.23323L19.4299 12.4146C20.7 14.2291 19.4019 16.7224 17.187 16.7224L2.81474 16.7224C0.599817 16.7224 -0.698305 14.2291 0.571871 12.4146L8.39881 1.23323C9.17732 0.121069 10.8244 0.121068 11.6029 1.23323Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.89708 15.767L1.07014 4.58567C-0.200035 2.77114 1.09809 0.277884 3.31302 0.277884L17.6853 0.277884C19.9002 0.277884 21.1983 2.77113 19.9281 4.58567L12.1012 15.767C11.3227 16.8792 9.67559 16.8792 8.89708 15.767Z"
                  fill="white"
                />
              </svg>
            )}
          </AccordionHeader>
          {isOpen && (
            <AccordionContent>
              <ContentComponent contentId={contentId} />
            </AccordionContent>
          )}
        </AccordionContainer>
      </Desktop>
    </>
  );
};

export const GuestBook = ({ contentId }) => {
  const [writing, onChangeWriting, reset] = useForms();
  const [GuestBookList, setGuestBookList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { logout } = useAuth();

  const getGuestBookList = async () => {
    try {
      const response = await normalAPI.get(
        `/guestBook?page=${page}&ownerId=${contentId}`
      );
      console.log('서버 응답:', response.data);
      setGuestBookList(response.data.data.content);
      setTotalPage(response.data.data.pageTotal);
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  const onClickUpload = async () => {
    const accesstoken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    try {
      const response = await normalAPI.post(
        '/guestBook',
        {
          ownerId: contentId,
          writing: writing,
        },
        {
          headers: {
            accessToken: accesstoken,
          },
        }
      );
      console.log('서버 응답:', response.data);
      reset();
      getGuestBookList();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('토큰 재전송');
        try {
          const tokenResponse = await normalAPI.post(
            '/guestBook',
            {
              ownerId: contentId,
              writing: writing,
            },
            {
              headers: {
                refreshToken: refreshToken,
              },
            }
          );
          console.log(tokenResponse);
          const newAccessToken = tokenResponse.headers.accesstoken.replace(
            'Bearer ',
            ''
          );
          localStorage.setItem('access', newAccessToken);
          if (tokenResponse.headers.refreshtoken) {
            const refreshToken = tokenResponse.headers.refreshtoken.replace(
              'Bearer ',
              ''
            );
            localStorage.setItem('refresh', refreshToken);
          }
          getGuestBookList();
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

  const deleteComment = async (id) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      const accesstoken = localStorage.getItem('access');
      const refreshToken = localStorage.getItem('refresh');

      try {
        const response = await normalAPI.delete(`/guestBook?id=${id}`, {
          headers: {
            accessToken: accesstoken,
          },
        });
        console.log('서버 응답:', response.data);
        alert('독자 후기를 성공적으로 삭제했습니다.');
        getGuestBookList();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log('토큰 재전송');
          try {
            const tokenResponse = await normalAPI.delete(
              `/guestBook?id=${id}`,
              {
                headers: {
                  refreshToken: refreshToken,
                },
              }
            );
            console.log(tokenResponse);
            const newAccessToken = tokenResponse.headers.accesstoken.replace(
              'Bearer ',
              ''
            );
            localStorage.setItem('access', newAccessToken);
            if (tokenResponse.headers.refreshtoken) {
              const refreshToken = tokenResponse.headers.refreshtoken.replace(
                'Bearer ',
                ''
              );
              localStorage.setItem('refresh', refreshToken);
            }
            alert('독자 후기를 성공적으로 삭제했습니다.');
            getGuestBookList();
          } catch (err) {
            console.error('Refresh Token Error:', err);
            alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
            logout();
          }
        } else {
          console.error('Error:', error);
          alert('삭제 중 문제가 발생했습니다.');
        }
      }
    }
  };

  useEffect(() => {
    getGuestBookList();
  }, [page]);

  return (
    <CommentAllContainer>
      <CommentInputContainer>
        <CommentInput
          value={writing}
          maxLength="250"
          onChange={onChangeWriting}
        />
        <CommentInputBottom>
          <TextCounter length={writing.length}>
            {writing.length}/250
          </TextCounter>
          <Button onClick={onClickUpload}>게시하기</Button>
        </CommentInputBottom>
        <Mobile>
          <Upload>
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onClickUpload}
            >
              <path
                d="M1.73426 2.99711L1.04635 2.6466H1.04635L1.73426 2.99711ZM1.32673 9.67969V10.4517C1.75313 10.4517 2.09879 10.1061 2.09879 9.67969H1.32673ZM1.32666 9.67969V8.90763C0.900264 8.90763 0.554601 9.25329 0.554601 9.67969H1.32666ZM2.2841 19.9393L2.83003 20.4853L2.83003 20.4853L2.2841 19.9393ZM6.31175 15.9117V15.1396C6.10699 15.1396 5.91062 15.221 5.76583 15.3657L6.31175 15.9117ZM19.2267 15.5041L18.8762 14.8162L19.2267 15.5041ZM20.8607 13.8701L20.1728 13.5196L20.8607 13.8701ZM20.8607 2.99711L20.1728 3.34762V3.34762L20.8607 2.99711ZM19.2267 1.3631L19.5772 0.675186L19.5772 0.675186L19.2267 1.3631ZM3.36828 1.3631L3.01777 0.675186L3.01777 0.675186L3.36828 1.3631ZM2.09879 6.938C2.09879 5.87824 2.09939 5.12985 2.14717 4.54509C2.19421 3.96935 2.28311 3.62055 2.42217 3.34762L1.04635 2.6466C0.777888 3.17349 0.66302 3.74812 0.608178 4.41935C0.554073 5.08157 0.554673 5.90372 0.554673 6.938H2.09879ZM2.09879 9.67969V6.938H0.554673V9.67969H2.09879ZM1.32673 8.90763H1.32666V10.4517H1.32673V8.90763ZM0.554601 9.67969V15.9114H2.09872V9.67969H0.554601ZM0.554601 15.9114V19.5427H2.09872V15.9114H0.554601ZM0.554601 19.5427C0.554601 20.7302 1.99034 21.3249 2.83003 20.4853L1.73817 19.3934C1.87122 19.2604 2.09872 19.3546 2.09872 19.5427H0.554601ZM2.83003 20.4853L6.85768 16.4576L5.76583 15.3657L1.73817 19.3934L2.83003 20.4853ZM15.2858 15.1396H6.31175V16.6837H15.2858V15.1396ZM18.8762 14.8162C18.6032 14.9553 18.2544 15.0442 17.6787 15.0912C17.0939 15.139 16.3455 15.1396 15.2858 15.1396V16.6837C16.32 16.6837 17.1422 16.6843 17.8044 16.6302C18.4757 16.5754 19.0503 16.4605 19.5772 16.192L18.8762 14.8162ZM20.1728 13.5196C19.8883 14.0779 19.4344 14.5318 18.8762 14.8162L19.5772 16.192C20.426 15.7596 21.1161 15.0694 21.5486 14.2206L20.1728 13.5196ZM20.4961 9.92923C20.4961 10.989 20.4955 11.7374 20.4478 12.3221C20.4007 12.8979 20.3118 13.2467 20.1728 13.5196L21.5486 14.2206C21.817 13.6937 21.9319 13.1191 21.9868 12.4479C22.0409 11.7857 22.0403 10.9635 22.0403 9.92923H20.4961ZM20.4961 6.93801V9.92923H22.0403V6.93801H20.4961ZM20.1728 3.34762C20.3118 3.62055 20.4007 3.96935 20.4478 4.54509C20.4955 5.12985 20.4961 5.87824 20.4961 6.93801H22.0403C22.0403 5.90372 22.0409 5.08157 21.9868 4.41935C21.9319 3.74812 21.817 3.17349 21.5486 2.6466L20.1728 3.34762ZM18.8762 2.05101C19.4344 2.33546 19.8883 2.78935 20.1728 3.34762L21.5486 2.6466C21.1161 1.79779 20.426 1.10768 19.5772 0.675186L18.8762 2.05101ZM15.2858 1.72763C16.3455 1.72763 17.0939 1.72823 17.6787 1.776C18.2544 1.82304 18.6032 1.91194 18.8762 2.05101L19.5772 0.675186C19.0503 0.406723 18.4757 0.291855 17.8044 0.237013C17.1422 0.182907 16.32 0.183508 15.2858 0.183508V1.72763ZM7.30917 1.72763H15.2858V0.183508H7.30917V1.72763ZM3.71878 2.05101C3.99171 1.91194 4.34051 1.82304 4.91626 1.776C5.50102 1.72823 6.24941 1.72763 7.30917 1.72763V0.183508C6.27489 0.183508 5.45274 0.182907 4.79052 0.237013C4.11928 0.291855 3.54466 0.406723 3.01777 0.675186L3.71878 2.05101ZM2.42217 3.34762C2.70662 2.78935 3.16051 2.33546 3.71878 2.05101L3.01777 0.675186C2.16895 1.10768 1.47884 1.79779 1.04635 2.6466L2.42217 3.34762Z"
                fill="#ABAAAA"
              />
              <path
                d="M6.31201 5.94043L16.2827 5.94043"
                stroke="#ABAAAA"
                stroke-width="1.85294"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.31201 10.9263L12.5437 10.9263"
                stroke="#ABAAAA"
                stroke-width="1.85294"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Upload>
        </Mobile>
      </CommentInputContainer>
      <CommentsContainer>
        {GuestBookList?.map((comment) => (
          <>
            <CommentContainer>
              <CommentTop>
                <CommentWriter>{comment.writerName}</CommentWriter>
                <CommentDelete
                  onClick={() => deleteComment(comment.guestBookId)}
                >
                  <svg
                    width="22"
                    height="25"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.88477 16.8828L8.88477 12.7742"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.6982 16.8828L13.6982 12.7742"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.67165 6.20064V18.7483C3.67165 20.968 3.67165 22.0779 4.36121 22.7674C5.05078 23.457 6.16062 23.457 8.3803 23.457H13.402C15.6217 23.457 16.7315 23.457 17.4211 22.7674C18.1107 22.0779 18.1107 20.968 18.1107 18.7484V6.20064M0.994141 5.67773H20.9361"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.96724 1.57406C9.10435 1.48669 9.40648 1.4095 9.82676 1.35444C10.247 1.29938 10.762 1.26953 11.2917 1.26953C11.8215 1.26953 12.3364 1.29938 12.7567 1.35444C13.177 1.4095 13.4791 1.48669 13.6162 1.57406"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                  </svg>
                </CommentDelete>
              </CommentTop>
              <br />
              <CommentWriting>{comment.writing}</CommentWriting>
              <br />
              <CommentCreatedAt>{comment.createdAt} 작성</CommentCreatedAt>
            </CommentContainer>
          </>
        ))}
      </CommentsContainer>
      <Pagination
        isDark="inherit"
        page={page}
        totalPage={totalPage}
        onChangePage={setPage}
      />
    </CommentAllContainer>
  );
};

const Comment = ({ contentId }) => {
  const [writing, onChangeWriting, reset] = useForms();
  const [content, setContents] = useState(contentId);
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { logout } = useAuth();

  const onClickUpload = async () => {
    const accesstoken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    try {
      const response = await normalAPI.post(
        '/comment',
        {
          contentId: content,
          writing: writing,
        },
        {
          headers: {
            accessToken: accesstoken,
          },
        }
      );
      console.log('서버 응답:', response.data);
      reset();
      getCommentList();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('토큰 재전송');
        // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
        try {
          const tokenResponse = await normalAPI.post(
            '/comment',
            {
              contentId: content,
              writing: writing,
            },
            {
              headers: {
                refreshToken: refreshToken,
              },
            }
          );
          console.log(tokenResponse);
          const newAccessToken = tokenResponse.headers.accesstoken.replace(
            'Bearer ',
            ''
          );
          localStorage.setItem('access', newAccessToken);
          if (tokenResponse.headers.refreshtoken) {
            const refreshToken = tokenResponse.headers.refreshtoken.replace(
              'Bearer ',
              ''
            );
            localStorage.setItem('refresh', refreshToken);
          }
          getCommentList();
        } catch (err) {
          console.error('Refresh Token Error:', err);
          alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          logout();
        }
      } else {
        console.error('Error:', error);
        alert(error.response.data.message);
      }
    }
  };

  const getCommentList = async () => {
    try {
      const response = await normalAPI.get(
        `/comment?page=${page}&contentId=${content}`
      );
      console.log('서버 응답:', response.data);
      setCommentList(response.data.data.content);
      setTotalPage(response.data.data.pageTotal);
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      const accesstoken = localStorage.getItem('access');
      const refreshToken = localStorage.getItem('refresh');

      try {
        const response = await normalAPI.delete(`/comment?commentId=${id}`, {
          headers: {
            accessToken: accesstoken,
          },
        });
        console.log('서버 응답:', response.data);
        alert('독자 후기를 성공적으로 삭제했습니다.');
        getCommentList();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log('토큰 재전송');
          try {
            const tokenResponse = await normalAPI.delete(
              `/comment?commentId=${id}`,
              {
                headers: {
                  refreshToken: refreshToken,
                },
              }
            );
            console.log(tokenResponse);
            const newAccessToken = tokenResponse.headers.accesstoken.replace(
              'Bearer ',
              ''
            );
            localStorage.setItem('access', newAccessToken);
            if (tokenResponse.headers.refreshtoken) {
              const refreshToken = tokenResponse.headers.refreshtoken.replace(
                'Bearer ',
                ''
              );
              localStorage.setItem('refresh', refreshToken);
            }
            alert('독자 후기를 성공적으로 삭제했습니다.');
            getCommentList();
          } catch (err) {
            console.error('Refresh Token Error:', err);
            alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
            logout();
          }
        } else {
          console.error('Error:', error);
          alert(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    getCommentList();
  }, [page]);
  return (
    <CommentAllContainer>
      <CommentInputContainer>
        <CommentInput
          value={writing}
          maxLength="250"
          onChange={onChangeWriting}
          placeholder="후기 작성하기..."
        />
        <CommentInputBottom>
          <TextCounter length={writing.length}>
            {writing.length}/250
          </TextCounter>
          <Button onClick={onClickUpload}>게시하기</Button>
        </CommentInputBottom>
        <Mobile>
          <Upload>
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onClickUpload}
            >
              <path
                d="M1.73426 2.99711L1.04635 2.6466H1.04635L1.73426 2.99711ZM1.32673 9.67969V10.4517C1.75313 10.4517 2.09879 10.1061 2.09879 9.67969H1.32673ZM1.32666 9.67969V8.90763C0.900264 8.90763 0.554601 9.25329 0.554601 9.67969H1.32666ZM2.2841 19.9393L2.83003 20.4853L2.83003 20.4853L2.2841 19.9393ZM6.31175 15.9117V15.1396C6.10699 15.1396 5.91062 15.221 5.76583 15.3657L6.31175 15.9117ZM19.2267 15.5041L18.8762 14.8162L19.2267 15.5041ZM20.8607 13.8701L20.1728 13.5196L20.8607 13.8701ZM20.8607 2.99711L20.1728 3.34762V3.34762L20.8607 2.99711ZM19.2267 1.3631L19.5772 0.675186L19.5772 0.675186L19.2267 1.3631ZM3.36828 1.3631L3.01777 0.675186L3.01777 0.675186L3.36828 1.3631ZM2.09879 6.938C2.09879 5.87824 2.09939 5.12985 2.14717 4.54509C2.19421 3.96935 2.28311 3.62055 2.42217 3.34762L1.04635 2.6466C0.777888 3.17349 0.66302 3.74812 0.608178 4.41935C0.554073 5.08157 0.554673 5.90372 0.554673 6.938H2.09879ZM2.09879 9.67969V6.938H0.554673V9.67969H2.09879ZM1.32673 8.90763H1.32666V10.4517H1.32673V8.90763ZM0.554601 9.67969V15.9114H2.09872V9.67969H0.554601ZM0.554601 15.9114V19.5427H2.09872V15.9114H0.554601ZM0.554601 19.5427C0.554601 20.7302 1.99034 21.3249 2.83003 20.4853L1.73817 19.3934C1.87122 19.2604 2.09872 19.3546 2.09872 19.5427H0.554601ZM2.83003 20.4853L6.85768 16.4576L5.76583 15.3657L1.73817 19.3934L2.83003 20.4853ZM15.2858 15.1396H6.31175V16.6837H15.2858V15.1396ZM18.8762 14.8162C18.6032 14.9553 18.2544 15.0442 17.6787 15.0912C17.0939 15.139 16.3455 15.1396 15.2858 15.1396V16.6837C16.32 16.6837 17.1422 16.6843 17.8044 16.6302C18.4757 16.5754 19.0503 16.4605 19.5772 16.192L18.8762 14.8162ZM20.1728 13.5196C19.8883 14.0779 19.4344 14.5318 18.8762 14.8162L19.5772 16.192C20.426 15.7596 21.1161 15.0694 21.5486 14.2206L20.1728 13.5196ZM20.4961 9.92923C20.4961 10.989 20.4955 11.7374 20.4478 12.3221C20.4007 12.8979 20.3118 13.2467 20.1728 13.5196L21.5486 14.2206C21.817 13.6937 21.9319 13.1191 21.9868 12.4479C22.0409 11.7857 22.0403 10.9635 22.0403 9.92923H20.4961ZM20.4961 6.93801V9.92923H22.0403V6.93801H20.4961ZM20.1728 3.34762C20.3118 3.62055 20.4007 3.96935 20.4478 4.54509C20.4955 5.12985 20.4961 5.87824 20.4961 6.93801H22.0403C22.0403 5.90372 22.0409 5.08157 21.9868 4.41935C21.9319 3.74812 21.817 3.17349 21.5486 2.6466L20.1728 3.34762ZM18.8762 2.05101C19.4344 2.33546 19.8883 2.78935 20.1728 3.34762L21.5486 2.6466C21.1161 1.79779 20.426 1.10768 19.5772 0.675186L18.8762 2.05101ZM15.2858 1.72763C16.3455 1.72763 17.0939 1.72823 17.6787 1.776C18.2544 1.82304 18.6032 1.91194 18.8762 2.05101L19.5772 0.675186C19.0503 0.406723 18.4757 0.291855 17.8044 0.237013C17.1422 0.182907 16.32 0.183508 15.2858 0.183508V1.72763ZM7.30917 1.72763H15.2858V0.183508H7.30917V1.72763ZM3.71878 2.05101C3.99171 1.91194 4.34051 1.82304 4.91626 1.776C5.50102 1.72823 6.24941 1.72763 7.30917 1.72763V0.183508C6.27489 0.183508 5.45274 0.182907 4.79052 0.237013C4.11928 0.291855 3.54466 0.406723 3.01777 0.675186L3.71878 2.05101ZM2.42217 3.34762C2.70662 2.78935 3.16051 2.33546 3.71878 2.05101L3.01777 0.675186C2.16895 1.10768 1.47884 1.79779 1.04635 2.6466L2.42217 3.34762Z"
                fill="#ABAAAA"
              />
              <path
                d="M6.31201 5.94043L16.2827 5.94043"
                stroke="#ABAAAA"
                stroke-width="1.85294"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.31201 10.9263L12.5437 10.9263"
                stroke="#ABAAAA"
                stroke-width="1.85294"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Upload>
        </Mobile>
      </CommentInputContainer>
      <CommentsContainer>
        {commentList?.map((comment) => (
          <>
            <CommentContainer>
              <CommentTop>
                <CommentWriter>{comment.commenter}</CommentWriter>
                <CommentDelete onClick={() => deleteComment(comment.id)}>
                  <svg
                    width="22"
                    height="25"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.88477 16.8828L8.88477 12.7742"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.6982 16.8828L13.6982 12.7742"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.67165 6.20064V18.7483C3.67165 20.968 3.67165 22.0779 4.36121 22.7674C5.05078 23.457 6.16062 23.457 8.3803 23.457H13.402C15.6217 23.457 16.7315 23.457 17.4211 22.7674C18.1107 22.0779 18.1107 20.968 18.1107 18.7484V6.20064M0.994141 5.67773H20.9361"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.96724 1.57406C9.10435 1.48669 9.40648 1.4095 9.82676 1.35444C10.247 1.29938 10.762 1.26953 11.2917 1.26953C11.8215 1.26953 12.3364 1.29938 12.7567 1.35444C13.177 1.4095 13.4791 1.48669 13.6162 1.57406"
                      stroke="#FF6058"
                      stroke-width="1.77419"
                      stroke-linecap="round"
                    />
                  </svg>
                </CommentDelete>
              </CommentTop>
              <br />
              <CommentWriting>{comment.writing}</CommentWriting>
              <br />
              <CommentCreatedAt>{comment.createdAt} 작성</CommentCreatedAt>
            </CommentContainer>
          </>
        ))}
      </CommentsContainer>
      <Pagination
        isDark="inherit"
        page={page}
        totalPage={totalPage}
        onChangePage={setPage}
      />
    </CommentAllContainer>
  );
};

const Comments = ({ id }) => {
  return (
    <div>
      <Accordion name="독자 후기" content={Comment} contentId={id} />
    </div>
  );
};

export default Comments;

import React, { useEffect, useState } from 'react';
import { AccordionHeader, AccordionContainer, AccordionContent } from '../../style/Accodion';
import { authAPI } from '../../apis/Api';
import { useForms } from '../../hooks/useForms';
import { useAuth } from '../../store/Auth';
import { normalAPI } from '../../apis/Api';
import Pagination from '../Paging/Pagination';
import { CommentInput, TextCounter, CommentInputBottom, CommentInputContainer, CommentContainer, CommentWriter, CommentWriting, CommentTop, CommentCreatedAt, CommentDelete } from '../../style/Comment';
import { Button } from '../../style/StyledComponent';

export const Accordion = ({ name, content: ContentComponent, contentId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <AccordionContainer>
            <AccordionHeader onClick={toggleAccordion}>
                {name} &nbsp; {isOpen ?
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6029 1.23323L19.4299 12.4146C20.7 14.2291 19.4019 16.7224 17.187 16.7224L2.81474 16.7224C0.599817 16.7224 -0.698305 14.2291 0.571871 12.4146L8.39881 1.23323C9.17732 0.121069 10.8244 0.121068 11.6029 1.23323Z" fill="white" />
                    </svg>
                    :
                    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.89708 15.767L1.07014 4.58567C-0.200035 2.77114 1.09809 0.277884 3.31302 0.277884L17.6853 0.277884C19.9002 0.277884 21.1983 2.77113 19.9281 4.58567L12.1012 15.767C11.3227 16.8792 9.67559 16.8792 8.89708 15.767Z" fill="white" />
                    </svg>
                }
            </AccordionHeader>
            {isOpen && (
                <AccordionContent>
                    <ContentComponent contentId={contentId} />
                </AccordionContent>
            )}
        </AccordionContainer>
    )
}

export const GuestBook = ({ contentId }) => {
    const [writing, onChangeWriting, reset] = useForms();
    const [GuestBookList, setGuestBookList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const { logout } = useAuth();

    const getGuestBookList = async () => {
        try {
            const response = await normalAPI.get(`/guestBook?page=${page}&ownerId=${contentId}`);
            console.log('서버 응답:', response.data);
            setGuestBookList(response.data.data.content)
            setTotalPage(response.data.data.pageTotal)
        } catch (error) {
            console.log('에러 발생', error)
        }
    }

    const onClickUpload = async () => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        try {
            const response = await normalAPI.post('/guestBook', {
                "ownerId": contentId,
                "writing": writing,
            }, {
                headers: {
                    'accessToken': accesstoken,
                },
            });
            console.log('서버 응답:', response.data);
            alert('독자 후기를 성공적으로 게시했습니다.')
            reset()
            getGuestBookList();

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                try {
                    const tokenResponse = await normalAPI.post('/guestBook', {
                        "ownerId": contentId,
                        "writing": writing,
                    }, {
                        headers: {
                            'refreshToken': refreshToken,
                        },
                    });
                    console.log(tokenResponse);
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', newAccessToken)
                    if (tokenResponse.headers.refreshtoken) {
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', refreshToken);
                    }
                    alert('독자 후기를 성공적으로 게시했습니다.')
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
    }

    const deleteComment = async (id) => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        try {
            const response = await normalAPI.delete(`/guestBook?id=${id}`, {
                headers: {
                    'accessToken': accesstoken,
                },
            });
            console.log('서버 응답:', response.data);
            alert('독자 후기를 성공적으로 삭제했습니다.')
            getGuestBookList();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                try {
                    const tokenResponse = await normalAPI.delete(`/guestBook?id=${id}`,
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            },
                        });
                    console.log(tokenResponse);
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', newAccessToken)
                    if (tokenResponse.headers.refreshtoken) {
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', refreshToken);
                    }
                    alert('독자 후기를 성공적으로 삭제했습니다.')
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

    useEffect(() => {
        getGuestBookList()
    }, [page])

    return (
        <div>
            <CommentInputContainer>
                <CommentInput value={writing} maxLength="250" onChange={onChangeWriting} />
                <CommentInputBottom>
                    <TextCounter length={writing.length}>
                        {writing.length}/250
                    </TextCounter>
                    <Button onClick={onClickUpload}>게시하기</Button>
                </CommentInputBottom>
            </CommentInputContainer>
            <div>
                {GuestBookList?.map((comment) => (
                    <>
                        <CommentContainer>
                            <CommentTop>
                                <CommentWriter>
                                    {comment.writerName}
                                </CommentWriter>
                                <CommentDelete onClick={() => (deleteComment(comment.guestBookId))}>
                                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.88477 16.8828L8.88477 12.7742" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                        <path d="M13.6982 16.8828L13.6982 12.7742" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                        <path d="M3.67165 6.20064V18.7483C3.67165 20.968 3.67165 22.0779 4.36121 22.7674C5.05078 23.457 6.16062 23.457 8.3803 23.457H13.402C15.6217 23.457 16.7315 23.457 17.4211 22.7674C18.1107 22.0779 18.1107 20.968 18.1107 18.7484V6.20064M0.994141 5.67773H20.9361" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.96724 1.57406C9.10435 1.48669 9.40648 1.4095 9.82676 1.35444C10.247 1.29938 10.762 1.26953 11.2917 1.26953C11.8215 1.26953 12.3364 1.29938 12.7567 1.35444C13.177 1.4095 13.4791 1.48669 13.6162 1.57406" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                    </svg>
                                </CommentDelete>
                            </CommentTop>
                            <br />
                            <CommentWriting>
                                {comment.writing}
                            </CommentWriting>
                            <br />
                            <CommentCreatedAt>
                                {comment.createdAt} 작성
                            </CommentCreatedAt>
                        </CommentContainer>
                    </>
                ))}
            </div>
            <Pagination isDark='true' page={page} totalPage={totalPage} onChangePage={setPage} />

        </div>
    )
}


const Comment = ({ contentId }) => {
    const [writing, onChangeWriting, reset] = useForms();
    const [content, setContents] = useState(contentId);
    const [commentList, setCommentList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const { logout } = useAuth();

    const onClickUpload = async () => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        try {
            const response = await normalAPI.post('/comment', {
                "contentId": content,
                "writing": writing,
            }, {
                headers: {
                    'accessToken': accesstoken,
                },
            });
            console.log('서버 응답:', response.data);
            alert('독자 후기를 성공적으로 게시했습니다.')
            reset()
            getCommentList()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.post('/comment', {
                        "contentId": content,
                        "writing": writing,
                    }, {
                        headers: {
                            'refreshToken': refreshToken,
                        },
                    });
                    console.log(tokenResponse);
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', newAccessToken)
                    if (tokenResponse.headers.refreshtoken) {
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', refreshToken);
                    }
                    alert('독자 후기를 성공적으로 게시했습니다.')
                    getCommentList();
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

    const getCommentList = async () => {
        try {
            const response = await normalAPI.get(`/comment?page=${page}&contentId=${content}`);
            console.log('서버 응답:', response.data);
            setCommentList(response.data.data.content)
            setTotalPage(response.data.data.pageTotal)
        } catch (error) {
            console.log('에러 발생', error)
        }
    }

    const deleteComment = async (id) => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        try {
            const response = await normalAPI.delete(`/comment?commentId=${id}`, {
                headers: {
                    'accessToken': accesstoken,
                },
            });
            console.log('서버 응답:', response.data);
            alert('독자 후기를 성공적으로 삭제했습니다.')
            getCommentList()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                try {
                    const tokenResponse = await normalAPI.delete(`/comment?commentId=${id}`,
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            },
                        });
                    console.log(tokenResponse);
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', newAccessToken)
                    if (tokenResponse.headers.refreshtoken) {
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', refreshToken);
                    }
                    alert('독자 후기를 성공적으로 삭제했습니다.')
                    getCommentList();
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

    useEffect(() => {
        getCommentList();
    }, [page])
    return (

        <div>
            <CommentInputContainer>
                <CommentInput value={writing} maxLength="250" onChange={onChangeWriting} placeholder='후기 작성하기...' />
                <CommentInputBottom>
                    <TextCounter length={writing.length}>
                        {writing.length}/250
                    </TextCounter>
                    <Button onClick={onClickUpload}>게시하기</Button>
                </CommentInputBottom>
            </CommentInputContainer>
            <div>
                {commentList?.map((comment) => (

                    <>
                        <CommentContainer>
                            <CommentTop>
                                <CommentWriter>
                                    {comment.commenter}
                                </CommentWriter>
                                <CommentDelete onClick={() => (deleteComment(comment.id))}>
                                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.88477 16.8828L8.88477 12.7742" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                        <path d="M13.6982 16.8828L13.6982 12.7742" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                        <path d="M3.67165 6.20064V18.7483C3.67165 20.968 3.67165 22.0779 4.36121 22.7674C5.05078 23.457 6.16062 23.457 8.3803 23.457H13.402C15.6217 23.457 16.7315 23.457 17.4211 22.7674C18.1107 22.0779 18.1107 20.968 18.1107 18.7484V6.20064M0.994141 5.67773H20.9361" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.96724 1.57406C9.10435 1.48669 9.40648 1.4095 9.82676 1.35444C10.247 1.29938 10.762 1.26953 11.2917 1.26953C11.8215 1.26953 12.3364 1.29938 12.7567 1.35444C13.177 1.4095 13.4791 1.48669 13.6162 1.57406" stroke="#FF6058" stroke-width="1.77419" stroke-linecap="round" />
                                    </svg>
                                </CommentDelete>
                            </CommentTop>
                            <br />
                            <CommentWriting>
                                {comment.writing}
                            </CommentWriting>
                            <br />
                            <CommentCreatedAt>
                                {comment.createdAt} 작성
                            </CommentCreatedAt>
                        </CommentContainer>
                    </>
                ))}
            </div>
            <Pagination isDark='true' page={page} totalPage={totalPage} onChangePage={setPage} />

        </div>
    )
}

const Comments = ({ id }) => {

    return (
        <div>
            <Accordion name="독자 후기" content={Comment} contentId={id} />
        </div>
    );
};

export default Comments;
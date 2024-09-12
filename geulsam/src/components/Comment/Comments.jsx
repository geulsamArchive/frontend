import React, { useEffect, useState } from 'react';
import { AccordionHeader, AccordionContainer, AccordionContent } from '../../style/Accodion';
import { authAPI } from '../../apis/Api';
import { useForms } from '../../hooks/useForms';
import { useAuth } from '../../store/Auth';
import { normalAPI } from '../../apis/Api';

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

const Comment = ({ contentId }) => {
    const [writing, onChangeWriting] = useForms();
    const [content, setContents] = useState(contentId);
    const [commentList, setCommentList] = useState([])

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
                    const accessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', accessToken)
                    const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '')
                    localStorage.setItem('refresh', refreshToken)
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
            const response = await normalAPI.get(`/comment?contentId=${content}`);
            console.log('서버 응답:', response.data);
            setCommentList(response.data.data)
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
                    const accessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', accessToken)
                    const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '')
                    localStorage.setItem('refresh', refreshToken)
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
    }, [])
    return (

        <div>
            <div>
                <div>
                    <input value={writing} onChange={onChangeWriting} />
                    <button onClick={onClickUpload}>게시하기</button>
                </div>
            </div>
            <div>
                {commentList?.map((comment) => (
                    <>
                        {comment.commenter} <br />
                        {comment.writing} <br />
                        {comment.createdAt}&nbsp;작성<br />
                        <button onClick={() => (deleteComment(comment.id))}>삭제</button>
                        <hr />
                    </>
                ))}
            </div>
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
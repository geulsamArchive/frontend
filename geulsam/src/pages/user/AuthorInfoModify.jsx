import React, { useEffect, useState } from 'react';
import { BookInfoContainer, BookTitle, } from '../../style/StyledComponent';
import { AuthorIntroduceInput, AuthorIntroduceInputContainer, AuthorKewordContainer, AuthorKewordInput, TextCounterContainer, TextCounter, AuthorContainer, LeftWord } from '../../style/UserInfo';
import { useForms } from '../../hooks/useForms';
import { useAuth } from '../../store/Auth';
import { CheckTitleLength } from '../../components/CheckLength';
import { normalAPI } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { AuthorWorkContainer, AuthorWorkInfo, Margin, ModifyButtons, Trash, WorkButtons, WorkCreatedAt, WorkInfo, WorkInfoModify, WorkInfoRight, WorkLink, WorkTitle, WorkTitleType, WorkType } from '../../style/Works';
import Pagination from '../../components/Paging/Pagination';
import trashcan from '../../assets/images/trashcan.png'
import lock from '../../assets/images/locked.svg'

const AuthorInfoModify = () => {




    const checkVisible = (isVisible) => {
        switch (isVisible) {
            case 'PRIVATE':
                return <>

                    <img src={lock} alt="lock icon" />
                    &nbsp;
                </>
            default:
                return '';
        }
    }

    const translateType = (type) => {
        switch (type) {
            case 'NOVEL':
                return '소설';
            case 'ESSAY':
                return '수필';
            case 'POEM':
                return '시';
            default:
                return type;
        }
    };
    const [introduce, onChangeIntroduce] = useForms();
    const [keword0, onChangeKeyword0] = useForms()
    const [keword1, onChangeKeyword1] = useForms()
    const [keword2, onChangeKeyword2] = useForms()

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [works, setWorks] = useState([])

    const { logout } = useAuth()
    const navigate = useNavigate()
    const [authorInfo, setAuthorInfo] = useState({
        introduce: '',
        keyword: [],
    })

    const getAuthorInfo = async () => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        try {
            // ID를 이용해 사용자 정보 가져오기
            const response = await normalAPI.get(`/user/one`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            console.log(response)
            setAuthorInfo(response.data.data);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Access token이 만료된 경우, refresh token을 사용해 새로운 access token을 요청
                try {
                    const response = await normalAPI.get('/user/one', {
                        headers: {
                            'refreshToken': refreshToken
                        }
                    });
                    const newAccessToken = response.headers.accesstoken.replace('Bearer ', '');
                    localStorage.setItem('access', newAccessToken);
                    if (response.headers.refreshtoken) {
                        const newRefreshToken = response.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', newRefreshToken);
                    }
                    setAuthorInfo(response.data.data);
                    setTotalPage(response.data.data.totalPage)
                } catch (refreshError) {
                    console.error('토큰 갱신 중 오류가 발생했습니다.', refreshError);
                    alert('로그인이 필요합니다.');
                    logout();
                    navigate('/main'); // 로그인 페이지로 이동
                }
            } else {
                console.error('사용자 정보를 불러오는 중 오류가 발생했습니다.', error);
            }
        }
    }

    const getAuthorWork = async () => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        try {
            // ID를 이용해 사용자 정보 가져오기
            const response = await normalAPI.get(`/content/mine?page=${page}`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            console.log(response)
            setWorks(response.data.data.content);
            setTotalPage(response.data.data.pageTotal)
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Access token이 만료된 경우, refresh token을 사용해 새로운 access token을 요청
                try {
                    const response = await normalAPI.get(`/content/mine?page=${page}`, {
                        headers: {
                            'refreshToken': refreshToken
                        }
                    });
                    const newAccessToken = response.headers.accesstoken.replace('Bearer ', '');
                    localStorage.setItem('access', newAccessToken);
                    if (response.headers.refreshtoken) {
                        const newRefreshToken = response.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', newRefreshToken);
                    }
                    setWorks(response.data.data.content);
                    setTotalPage(response.data.data.pageTotal)
                } catch (refreshError) {
                    console.error('토큰 갱신 중 오류가 발생했습니다.', refreshError);
                    alert('로그인이 필요합니다.');
                    logout();
                    navigate('/main'); // 로그인 페이지로 이동
                }
            } else {
                console.error('사용자 작품 정보를 불러오는 중 오류가 발생했습니다.', error);
            }
        }
    }

    const deleteWork = async (id) => {
        if (window.confirm('정말 글을 삭제하시겠습니까?')) {

            const accesstoken = localStorage.getItem('access')
            const refreshToken = localStorage.getItem('refresh')

            try {
                const response = await normalAPI.delete(`/content?id=${id}`, {
                    headers: {
                        'accessToken': accesstoken,
                    },
                });
                console.log('서버 응답:', response.data);
                alert('글을 성공적으로 삭제했습니다.')
                getAuthorWork()
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.log('토큰 재전송');
                    try {
                        const tokenResponse = await normalAPI.delete(`/content?id=${id}`,
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
                        alert('글을 성공적으로 삭제했습니다.')
                        getAuthorWork();
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
    }

    useEffect(() => {
        getAuthorInfo()
        getAuthorWork()
    }, [page])

    return (
        <>
            <BookInfoContainer>
                <BookTitle>작가 페이지 관리</BookTitle>
                <AuthorContainer>
                    <LeftWord>
                        자기소개
                    </LeftWord>
                    <AuthorIntroduceInputContainer>
                        <AuthorIntroduceInput value={introduce} onChange={onChangeIntroduce} maxLength={200} placeholder={authorInfo.introduce} />
                        <TextCounterContainer>
                            <TextCounter length={introduce.length}>
                                {introduce.length}/200
                            </TextCounter>
                        </TextCounterContainer>
                    </AuthorIntroduceInputContainer>
                </AuthorContainer>
                <AuthorContainer>
                    <LeftWord>
                        키워드
                    </LeftWord>
                    <AuthorKewordContainer>
                        <AuthorKewordInput value={keword0} onChange={onChangeKeyword0} placeholder={authorInfo.keyword[0]} maxLength='6' />
                        <AuthorKewordInput value={keword1} onChange={onChangeKeyword1} placeholder={authorInfo.keyword[1]} maxLength='6' />
                        <AuthorKewordInput value={keword2} onChange={onChangeKeyword2} placeholder={authorInfo.keyword[2]} maxLength='6' />
                    </AuthorKewordContainer>
                </AuthorContainer>
                <AuthorWorkContainer>
                    {works.map((w) => (
                        <>
                            <WorkLink to={`/work/${w.contentId}`}>
                                <WorkInfoModify>
                                    <WorkTitleType>
                                        <WorkType>
                                            {translateType(w.type)}
                                        </WorkType>
                                        {checkVisible(w.isVisible)}
                                        <WorkTitle>
                                            {CheckTitleLength(w.title, 25)}
                                        </WorkTitle>
                                    </WorkTitleType>
                                    <WorkInfoRight>
                                        <WorkCreatedAt>
                                            {w.createdAt}
                                        </WorkCreatedAt>
                                        <ModifyButtons>
                                            <svg width="20" height="22" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => deleteWork(w.contentId)}>
                                                <path d="M8.92993 16.8828L8.92993 12.7742" stroke="#575655" stroke-width="1.77419" stroke-linecap="round" />
                                                <path d="M13.7429 16.8828L13.7429 12.7742" stroke="#575655" stroke-width="1.77419" stroke-linecap="round" />
                                                <path d="M3.71584 6.20064V18.7483C3.71584 20.968 3.71584 22.0779 4.4054 22.7674C5.09497 23.457 6.20481 23.457 8.42449 23.457H13.4462C15.6659 23.457 16.7757 23.457 17.4653 22.7674C18.1548 22.0779 18.1548 20.968 18.1548 18.7484V6.20064M1.03833 5.67773H20.9803" stroke="#575655" stroke-width="1.77419" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9.01192 1.57406C9.14903 1.48669 9.45115 1.4095 9.87143 1.35444C10.2917 1.29938 10.8067 1.26953 11.3364 1.26953C11.8662 1.26953 12.3811 1.29938 12.8014 1.35444C13.2217 1.4095 13.5238 1.48669 13.6609 1.57406" stroke="#575655" stroke-width="1.77419" stroke-linecap="round" />
                                            </svg>
                                        </ModifyButtons>
                                    </WorkInfoRight>
                                </WorkInfoModify>
                            </WorkLink>
                        </>
                    ))}
                </AuthorWorkContainer>
            </BookInfoContainer>
            <Margin>
                <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
            </Margin>
        </>
    );
};

export default AuthorInfoModify;
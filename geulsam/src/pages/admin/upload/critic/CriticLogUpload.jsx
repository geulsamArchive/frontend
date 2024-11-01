import React from 'react';
import { useForms } from '../../../../hooks/useForms';
import { normalAPI } from '../../../../apis/Api';
import { BookInfoContainer, BookTitle, Button, LoginInput } from '../../../../style/StyledComponent';
import { VisibleSelect } from '../../../../style/WokrUpload';
import { CriticLogUploads, CriticLogUploadsSecondLine } from '../../../../style/admin/critic';
import { useAuth } from '../../../../store/Auth';


const CriticLogUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [date, onChangeDate] = useForms();
    const [name, onChangeName] = useForms();
    const [genre, onChangeGenre] = useForms();
    const [url, onChangeUrl] = useForms();
    const [pw, onChangePw] = useForms();

    const { logout } = useAuth();

    const isFormComplete = title && date && name && url && pw;

    const onClickUpload = async () => {
        const accessToken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        try {
            const res = await normalAPI.post(
                `/criticismLog`,
                {
                    "contentTitle": title,
                    "localDate": date,
                    "userName": name,
                    "genre": genre,
                    "cloverNoteUrl": url,
                    "cloverNotePassword": pw
                }, {
                headers: {
                    'accessToken': accessToken
                }
            })
            alert('합평회 기록 등록에 성공했습니다.')
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.post(
                        `/criticismLog`,
                        {
                            "contentTitle": title,
                            "localDate": date,
                            "userName": name,
                            "genre": genre,
                            "cloverNoteUrl": url,
                            "cloverNotePassword": pw
                        },
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            }
                        }
                    );
                    console.log(tokenResponse);
                    if (tokenResponse.status === 200) {
                        const accessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                        localStorage.setItem('access', accessToken)
                        if (tokenResponse.headers.refreshtoken) {
                            const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                            localStorage.setItem('refresh', refreshToken);
                        }
                        alert('합평회 기록 등록에 성공했습니다.')
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert('등록 중 문제가 발생했습니다.');
            }
        }



    }

    return (
        <BookInfoContainer>
            <BookTitle>
                합평회 기록 등록
            </BookTitle>
            <br />
            <br />
            <CriticLogUploads>
                <div>
                    작품명<br />
                    <LoginInput onChange={onChangeTitle} value={title} />
                </div>
                <CriticLogUploadsSecondLine>
                    <div>

                        작가 이름 <br />
                        <LoginInput onChange={onChangeName} value={name} />
                    </div>
                    <div>
                        합평 진행 날짜
                        <br />
                        <LoginInput type='date' onChange={onChangeDate} value={date} />
                    </div>
                    <div>
                        장르
                        <br />
                        <VisibleSelect onChange={onChangeGenre} value={genre}>
                            <option value='NOVEL'>소설</option>
                            <option value='ESSAY'>수필</option>
                            <option value='POEM'>시</option>
                        </VisibleSelect>
                    </div>
                </CriticLogUploadsSecondLine>
                <div>
                    합평회 접속 링크 <br />
                    <LoginInput onChange={onChangeUrl} value={url} />
                </div>
                <div>
                    링크 비밀번호 <br />
                    <LoginInput onChange={onChangePw} value={pw} />
                </div>
                <Button disabled={!isFormComplete} onClick={onClickUpload}>등록하기</Button>
            </CriticLogUploads>
            <br />
            <br />  <br />
            <br />  <br />
            <br />
        </BookInfoContainer>
    );
};

export default CriticLogUpload;

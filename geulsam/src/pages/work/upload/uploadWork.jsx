import { B, CalendarTitle } from '../../../style/StyledComponent';
import { Container, EditorContainer, FileInput, GenreButton, GenreContainer, SentenceContainer, SentenceInput, TitleInput, UploadButton } from '../../../style/WokrUpload';
import { useForms } from '../../../hooks/useForms';
import { useRef, useState, useEffect } from 'react';
import Editor from '../../../components/Editor/CKEditor';
import { normalAPI } from '../../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/Auth';

const UploadWork = () => {
    const [title, onChangeTitle] = useForms();
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const [sentence, onChangeSentence] = useForms();
    const [htmlContent, setHtmlContent] = useState(''); // CKEditor의 HTML 내용을 저장할 상태
    const inputRef = useRef(null);

    const { logout } = useAuth();

    const navigate = useNavigate();

    //업로드 성공 시 workId를 저장해 해당 페이지로 리다이렉트
    const [workId, setWorkId] = useState('')

    useEffect(() => {
        if (workId) {
            navigate(`/work/${workId}`);
        }
    }, [workId, navigate]);

    const handleEditorChange = (data) => {
        // HTML 문자열에 <meta charset="UTF-8"> 추가하기
        const htmlContentWithMeta = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                ${data}
            </body>
            </html>
        `;
        setHtmlContent(htmlContentWithMeta);
    };

    const handleSentenceContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleGenre = (genre) => {
        setGenre(genre);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleSubmit = async () => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')

        if (!file) {
            alert('PDF 파일을 선택해주세요.');
            return;
        }

        const htmlBlob = new Blob([new TextEncoder().encode(htmlContent)], { type: 'text/html; charset=UTF-8' });

        // Blob 객체를 File 객체로 변환
        const htmlFile = new File([htmlBlob], 'content.html', { type: 'text/html; charset=UTF-8' });

        const formData = new FormData();
        formData.append('name', title);
        formData.append('pdf', file);
        formData.append('html', htmlFile); // .html 파일로 변환된 HTML 내용 추가
        formData.append('genre', genre);
        formData.append('isVisible', 'EVERY'); // 예시로 'EVERY' 값을 사용
        formData.append('bookPage', 1); // 예시로 1페이지로 설정
        formData.append('sentence', sentence);

        try {
            const response = await normalAPI.post('/content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accessToken': accesstoken,
                },
            });
            console.log('서버 응답:', response.data);
            if (response.data.status === 200) {
                setWorkId(response.data.data)
                alert('글을 성공적으로 게시했습니다.')
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.post(
                        '/content',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
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
                        setWorkId(tokenResponse.data.data)
                        alert('글을 성공적으로 게시했습니다.')
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
        <>
            <CalendarTitle>작품 게시하기</CalendarTitle>
            <Container>
                <TitleInput value={title} onChange={onChangeTitle} placeholder="제목" />
                <GenreContainer>
                    작품의 장르와 키워드를 선택합니다.
                    <br />
                    <GenreButton onClick={() => handleGenre('NOVEL')} disabled={genre === 'NOVEL'}>
                        소설
                    </GenreButton>
                    <GenreButton onClick={() => handleGenre('POEM')} disabled={genre === 'POEM'}>
                        시
                    </GenreButton>
                    <GenreButton onClick={() => handleGenre('ESSAY')} disabled={genre === 'ESSAY'}>
                        수필
                    </GenreButton>
                </GenreContainer>
                <GenreContainer>
                    <B>PDF 파일</B>
                    <br />
                    <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <FileInput onClick={handleButtonClick}>파일 찾기</FileInput>
                    {file && <B>{file.name}</B>}
                </GenreContainer>
                <SentenceContainer onClick={handleSentenceContainerClick}>
                    <SentenceInput
                        ref={inputRef}
                        rows="2"
                        cols="40"
                        value={sentence}
                        onChange={onChangeSentence}
                        placeholder="작품 미리보기 분량을 입력해주세요. (최대 130자)"
                        maxLength="130"
                    />
                </SentenceContainer>
                <EditorContainer>
                    <Editor onChange={handleEditorChange} /> {/* Editor의 onChange 핸들러에 상태 업데이트 함수 연결 */}
                </EditorContainer>
                <UploadButton onClick={handleSubmit}>게시하기</UploadButton>
            </Container>
        </>
    );
};

export default UploadWork;

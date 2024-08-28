import { B, CalendarTitle } from '../../../style/StyledComponent';
import { Container, EditorContainer, FileInput, GenreButton, GenreContainer, SentenceContainer, SentenceInput, TitleInput } from '../../../style/WokrUpload';
import { useForms } from '../../../hooks/useForms';
import { useRef, useState } from 'react';
import Editor from '../../../components/Editor/CKEditor';
import { Button } from '../../../style/Carousel';
import { normalAPI } from '../../../apis/Api';

const UploadWork = () => {
    const [title, onChangeTitle] = useForms();
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const [sentence, onChangeSentence] = useForms();
    const [htmlContent, setHtmlContent] = useState(''); // CKEditor의 HTML 내용을 저장할 상태
    const inputRef = useRef(null);

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
        if (!file) {
            alert('PDF 파일을 선택해주세요.');
            return;
        }

        // HTML 문자열을 Blob 객체로 변환
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });

        // Blob 객체를 File 객체로 변환
        const htmlFile = new File([htmlBlob], 'content.html', { type: 'text/html' });

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
        } catch (error) {
            console.error('업로드 실패:', error);
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
                    <Editor onChange={setHtmlContent} /> {/* Editor의 onChange 핸들러에 상태 업데이트 함수 연결 */}
                </EditorContainer>
                <Button onClick={handleSubmit}>게시하기</Button>
            </Container>
        </>
    );
};

export default UploadWork;

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Italic, Undo, Heading, Link, List, BlockQuote, Indent } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { B, CalendarTitle } from '../../../style/StyledComponent';
import { Container, EditorContainer, FileInput, GenreButton, GenreContainer, SentenceContainer, SentenceInput, TitleInput } from '../../../style/WokrUpload';
import { useForms } from '../../../hooks/useForms';
import { useRef, useState } from 'react';

const editorConfiguration = {
    plugins: [Heading, Bold, Italic, Link, List, BlockQuote, Undo, Indent],
    toolbar: {
        items: [

            'bold', 'italic',
            'undo', 'redo', 'outdent', 'indent'
        ],
        shouldNotGroupWhenFull: true,
    },
};

const UploadWork = () => {
    const [title, onChangeTitle] = useForms();
    const [genre, setGenre] = useState('')
    const [file, setFile] = useState(null)
    const [sentence, onChangeSentence] = useForms()
    const inputRef = useRef(null)
    const handleSentenceContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleGenre = (genre) => {
        setGenre(genre)
    }

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file)
        }
    };

    return (
        <>
            <CalendarTitle>
                작품 게시하기
            </CalendarTitle>
            <Container>
                <TitleInput value={title} onChange={onChangeTitle} placeholder='제목' />
                <GenreContainer>
                    작품의 장르와 키워드를 선택합니다.<br />
                    <GenreButton
                        onClick={() => handleGenre('NOVEL')}
                        disabled={genre === 'NOVEL'}>
                        소설
                    </GenreButton>
                    <GenreButton
                        onClick={() => handleGenre('POEM')}
                        disabled={genre === 'POEM'}>
                        시
                    </GenreButton>
                    <GenreButton
                        onClick={() => handleGenre('ESSAY')}
                        disabled={genre === 'ESSAY'}>
                        수필
                    </GenreButton>
                </GenreContainer>
                <GenreContainer>
                    <B>PDF 파일</B><br />
                    <input id="fileInput" type="file" accept=".pdf" onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <FileInput
                        onClick={handleButtonClick}>
                        파일 찾기
                    </FileInput>
                    {file &&
                        <B>
                            {file.name}
                        </B>
                    }
                </GenreContainer>
                <SentenceContainer onClick={handleSentenceContainerClick}>
                    <SentenceInput
                        ref={inputRef}
                        rows="2"
                        cols="40"
                        value={sentence} onChange={onChangeSentence}
                        placeholder='작품 미리보기 분량을 입력해주세요. (최대 130자)'
                        maxLength="130" />
                </SentenceContainer>
                <EditorContainer>
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data="본문을 입력해주세요."
                    />
                </EditorContainer>
            </Container>
        </>
    );
};

export default UploadWork;
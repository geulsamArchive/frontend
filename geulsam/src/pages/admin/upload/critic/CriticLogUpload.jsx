import React from 'react';
import { useForms } from '../../../../hooks/useForms';
import { normalAPI } from '../../../../apis/Api';

const CriticLogUpload = () => {
    const [title, onChangeTitle] = useForms();
    const [date, onChangeDate] = useForms();
    const [name, onChangeName] = useForms();
    const [genre, onChangeGenre] = useForms();
    const [url, onChangeUrl] = useForms();
    const [pw, onChangePw] = useForms();


    const onClickUpload = async () => {
        const accessToken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')
        console.log(genre)

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
            console.log(genre)
            console.log(res)
        } catch (err) {
            console.log(err)
        }



    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            제목
            <input onChange={onChangeTitle} value={title} />
            날짜
            <input type='date' onChange={onChangeDate} value={date} />
            작가
            <input onChange={onChangeName} value={name} />
            <select onChange={onChangeGenre} value={genre}>
                <option value='NOVEL'>소설</option>
                <option value='ESSAY'>수필</option>
                <option value='POEM'>시</option>
            </select>
            클로버url
            <input onChange={onChangeUrl} value={url} />
            클로버 비번
            <input onChange={onChangePw} value={pw} />
            <button onClick={onClickUpload}>등록하기</button>
        </div>
    );
};

export default CriticLogUpload;

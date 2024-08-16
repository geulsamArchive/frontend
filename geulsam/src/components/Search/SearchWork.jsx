import React from 'react';
import { useForms } from '../../hooks/useForms';
import { SearchBox, SearchButton, SearchInput } from '../../style/Search';

const SearchWork = ({ onSearch }) => {
    const [inputValue, onChangeValue] = useForms()

    const handleSearchClick = (event) => {
        if (event) {
            event.preventDefault(); // 기본 동작 막기
        }
        onSearch(inputValue);  // 상위 컴포넌트에 검색어 전달
        console.log(inputValue);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작 막기
            handleSearchClick(); // 엔터 키를 눌렀을 때 검색
        }
    };
    return (
        <div>
            <br />
            <br />

            <SearchBox>
                <SearchInput type='text' value={inputValue} onKeyDown={handleKeyDown} onChange={onChangeValue} placeholder='찾으시는 작품의 제목이나 작가명을 적어주세요.' />
                <SearchButton type='button' onClick={handleSearchClick}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11.5108" cy="11.5112" r="9.82426" stroke="#575655" stroke-width="2.7" />
                        <path d="M11.5112 7.30072C10.9583 7.30072 10.4108 7.40963 9.89993 7.62122C9.3891 7.83281 8.92495 8.14295 8.53398 8.53392C8.14301 8.92489 7.83287 9.38904 7.62128 9.89987C7.40969 10.4107 7.30078 10.9582 7.30078 11.5111" stroke="#575655" stroke-width="3" stroke-linecap="round" />
                        <path d="M24.142 24.1424L19.9316 19.932" stroke="#575655" stroke-width="3.34673" stroke-linecap="round" />
                    </svg>
                </SearchButton>
            </SearchBox>
        </div>
    );
};

export default SearchWork;
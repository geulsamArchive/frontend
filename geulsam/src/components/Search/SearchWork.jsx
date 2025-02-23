import React from 'react';
import { useForms } from '../../hooks/useForms';
import { SearchBox, SearchButton, SearchInput } from '../../style/Search';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';

const SearchWork = ({ onSearch, placeholder }) => {
  const [inputValue, onChangeValue] = useForms();

  const handleSearchClick = (event) => {
    if (event) {
      event.preventDefault(); // 기본 동작 막기
    }
    onSearch(inputValue); // 상위 컴포넌트에 검색어 전달
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
      <Desktop>
        <br />
      </Desktop>
      <SearchBox>
        <SearchInput
          type="text"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={onChangeValue}
          placeholder={placeholder}
        />
        <SearchButton type="button" onClick={handleSearchClick}>
          <Mobile>
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.50752"
                cy="8.34101"
                r="6.54951"
                stroke="#575655"
                stroke-width="1.8"
              />
              <path
                d="M8.50749 5.53369C8.13888 5.53369 7.77388 5.60629 7.43333 5.74736C7.09277 5.88842 6.78334 6.09518 6.52269 6.35582C6.26204 6.61647 6.05529 6.9259 5.91423 7.26646C5.77316 7.60701 5.70056 7.97201 5.70056 8.34062"
                stroke="#575655"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M16.9284 16.7615L14.1215 13.9546"
                stroke="#575655"
                stroke-width="2.23115"
                stroke-linecap="round"
              />
            </svg>
          </Mobile>
          <Desktop>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11.5108"
                cy="11.5112"
                r="9.82426"
                stroke="#575655"
                stroke-width="2.7"
              />
              <path
                d="M11.5112 7.30072C10.9583 7.30072 10.4108 7.40963 9.89993 7.62122C9.3891 7.83281 8.92495 8.14295 8.53398 8.53392C8.14301 8.92489 7.83287 9.38904 7.62128 9.89987C7.40969 10.4107 7.30078 10.9582 7.30078 11.5111"
                stroke="#575655"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M24.142 24.1424L19.9316 19.932"
                stroke="#575655"
                stroke-width="3.34673"
                stroke-linecap="round"
              />
            </svg>
          </Desktop>
        </SearchButton>
      </SearchBox>
    </div>
  );
};

export default SearchWork;

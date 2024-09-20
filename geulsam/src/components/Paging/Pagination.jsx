import React from 'react';
import { Paging, PageButton } from '../../style/StyledComponent';

// const [page, setPage] = useState(1); 시작 페이지 값
// const [pageTotal, setPageTotal] = useState(1); 전체 페이지 수(백엔드에서 제공)
// onChangePage -> 페이지가 바뀔 때마다 setPage로 바뀐 페이지 저장

const Pagination = ({ page, totalPage, onChangePage, isDark }) => {

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPage) return;
        onChangePage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <PageButton key={i} onClick={() => handlePageChange(i)} disabled={i === page}>
                    {i}
                </PageButton>
            );
        }
        return pages;
    };

    return (
        <Paging isDark={isDark}>
            {renderPageNumbers()}
            <PageButton isDark={isDark} onClick={() => handlePageChange(page + 1)}>
                <svg width="10" height="14" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.12565 2.6665L8.45898 9.39567L2.12565 16.1248" stroke="#999999" strokeWidth="3.62353" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </PageButton>
        </Paging>
    );
};

export default Pagination;
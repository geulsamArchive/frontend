import React, { useEffect, useState, useRef } from 'react';

const NovelViewer = ({ novelHTML }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fontSize, setFontSize] = useState(16);
    const [lineheight, setLineheight] = useState(100);
    const [pages, setPages] = useState([]);
    const viewerRef = useRef(null);

    const increaseLineheight = () => {
        setLineheight(prev => prev + 15);
    };

    const decreaseLineheight = () => {
        setLineheight(prev => prev - 15);
    };

    const increaseFontSize = () => {
        setFontSize(prevSize => Math.min(prevSize + 2, 32));
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(prevSize - 2, 8));
    };

    const calculatePages = () => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const words = novelHTML.split(' ');
        const tempPages = [];
        let tempText = '';

        words.forEach(word => {
            viewer.innerHTML = tempText + word + ' ';
            if (viewer.scrollHeight > viewer.clientHeight) {
                tempPages.push(tempText.trim());
                tempText = word + ' ';
            } else {
                tempText += word + ' ';
            }
        });

        if (tempText) {
            tempPages.push(tempText.trim());
        }

        setPages(tempPages);
        if (currentPage > tempPages.length) {
            setCurrentPage(tempPages.length);
        }
    };

    useEffect(() => {
        calculatePages();
    }, [novelHTML, fontSize, lineheight]);

    useEffect(() => {
        const handleResize = () => {
            calculatePages();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevPage();
        } else if (e.key === 'ArrowRight') {
            goToNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPage]);

    const handlePageInput = (e) => {
        const page = Number(e.target.value);
        if (page >= 1 && page <= pages.length) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div
                ref={viewerRef}
                style={{
                    fontFamily: 'MaruBuri-Regular',
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineheight}%`,
                    height: '400px',
                    overflow: 'hidden'
                }}
                dangerouslySetInnerHTML={{ __html: pages[currentPage - 1] }}
            />
            <div>
                <button onClick={goToPrevPage}>이전 페이지</button>
                <button onClick={goToNextPage}>다음 페이지</button>
            </div>
            <div>
                폰트
                <button onClick={increaseFontSize}>+</button>
                <button onClick={decreaseFontSize}>-</button>
            </div>
            <div>
                줄간격
                <button onClick={increaseLineheight}>+</button>
                <button onClick={decreaseLineheight}>-</button>
            </div>
            <div>
                <input
                    type="number"
                    value={currentPage}
                    onChange={handlePageInput}
                    min="1"
                    max={pages.length}
                />
                <span> / {pages.length}</span>
            </div>
        </div>
    );
};

export default NovelViewer;

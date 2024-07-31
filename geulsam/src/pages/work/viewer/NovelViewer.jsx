import React, { useEffect, useState, useRef } from 'react';
import { Button, Background, ViewerContainer, Page, ControlPanel, ControlPanelRight, PageInput, ScrollBar, PageButtons, RoundBorder, PannelIcon } from '../../../style/NovelView';


const NovelViewer = ({ novelHTML, title }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [pages, setPages] = useState([]);
    const [inputValue, setInputValue] = useState(1);
    const viewerRef = useRef(null);

    const increaseLineHeight = () => setLineHeight(prev => Math.min(parseFloat((prev + 0.1).toFixed(1)), 3));
    const decreaseLineHeight = () => setLineHeight(prev => Math.max(parseFloat((prev - 0.1).toFixed(1)), 1));
    const increaseFontSize = () => setFontSize(prevSize => Math.min(prevSize + 2, 32));
    const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 8));

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
        if (currentPage >= tempPages.length) {
            setCurrentPage(tempPages.length - 1);
        }
    };

    useEffect(() => {
        calculatePages();
    }, [novelHTML, fontSize, lineHeight]);

    useEffect(() => {
        const handleResize = () => calculatePages();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setInputValue((currentPage + 1).toString());
    }, [currentPage]);

    const goToPrevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 2, 0));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 2, pages.length - 1));

    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') goToPrevPage();
        if (e.key === 'ArrowRight') goToNextPage();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentPage]);

    const handlePageInput = (e) => {
        setInputValue(e.target.value);
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            const page = Number(inputValue) - 1;
            if (page >= 0 && page < pages.length) {
                setCurrentPage(page);
            }
        }
    };
    const handleScrollBar = (e) => {
        const page = Number(e.target.value) - 1;
        setCurrentPage(page);
    };
    return (
        <Background>
            <ViewerContainer>
                <Page
                    ref={viewerRef}
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    borderRight
                    dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
                    onClick={goToPrevPage}
                />
                <Page
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    dangerouslySetInnerHTML={{ __html: pages[currentPage + 1] }}
                    onClick={goToNextPage}
                />
            </ViewerContainer>
            <ControlPanel>
                <div>
                    {title}
                </div>
                <ScrollBar
                    type="range"
                    min="1"
                    max={pages.length}
                    value={currentPage + 1}
                    onChange={handleScrollBar}
                />
                <PageButtons>
                    <Button onClick={goToPrevPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none">
                            <path d="M9.6839 15.9473L2.8418 9.10516L9.6839 2.26305" stroke="#D5D5D4" stroke-width="4" stroke-linecap="round" />
                        </svg>
                    </Button>
                    <div>
                        <PageInput
                            value={inputValue}
                            onChange={handlePageInput}
                            onKeyDown={handlePageInputKeyDown}
                            min="1"
                            max={pages.length}
                        />
                        / {pages.length}
                    </div>
                    <Button onClick={goToNextPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none">
                            <path d="M2.3161 15.9473L9.1582 9.10516L2.3161 2.26305" stroke="#D5D5D4" stroke-width="4" stroke-linecap="round" />
                        </svg>
                    </Button>
                </PageButtons>
            </ControlPanel>
            <ControlPanelRight>
                <PannelIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="19" viewBox="0 0 29 19" fill="none">
                        <path d="M0.417271 6.65932C0.663497 6.71208 1.03283 6.74725 1.34941 6.74725L9.72108 6.74725C10.0377 6.74725 10.407 6.71208 10.6532 6.65932L10.8467 9.66679C10.6708 9.75472 10.1432 9.86025 9.91454 9.86025C9.8266 9.86025 9.42209 8.64671 9.22863 8.04873H7.90956L6.50256 7.94321L6.50256 17.4053C7.10053 17.5108 7.8568 17.6691 7.8568 17.7219C7.8568 17.8802 7.83921 18.5133 7.75127 18.7068H3.21369C3.14334 18.5133 3.12575 17.7922 3.21369 17.6867C3.26645 17.6164 3.98754 17.4581 4.19859 17.4229C4.37447 17.3877 4.49758 17.335 4.51517 17.2118C4.55034 16.737 4.56793 15.9455 4.56793 15.5234L4.56793 7.94321L3.17851 8.04873H1.84186C1.6484 8.64671 1.24389 9.86025 1.15595 9.86025C0.92731 9.86025 0.399684 9.75472 0.223808 9.66679L0.417271 6.65932ZM12.1387 0.319861C12.5194 0.40144 13.0904 0.455825 13.5799 0.455825L26.5236 0.455825C27.0131 0.455825 27.5842 0.40144 27.9649 0.319861L28.264 4.96982C27.992 5.10579 27.1763 5.26895 26.8228 5.26895C26.6868 5.26895 26.0614 3.39264 25.7622 2.46809H23.7228L21.5474 2.30493L21.5474 16.9346C22.4719 17.0978 23.6412 17.3425 23.6412 17.4241C23.6412 17.6688 23.614 18.6478 23.478 18.9469H16.4623C16.3535 18.6478 16.3263 17.5329 16.4623 17.3697C16.5439 17.261 17.6588 17.0162 17.9851 16.9618C18.257 16.9075 18.4474 16.8259 18.4746 16.6355C18.529 15.9013 18.5562 14.6776 18.5562 14.025L18.5562 2.30493L16.4079 2.46809L14.3413 2.46809C14.0422 3.39264 13.4167 5.26895 13.2808 5.26895C12.9273 5.26895 12.1115 5.10579 11.8395 4.96982L12.1387 0.319861Z" fill="white" />
                    </svg>
                </PannelIcon>
                <RoundBorder>
                    <Button onClick={increaseFontSize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52326 17.1825C3.81903 17.1825 0.00549747 13.369 0.00549767 8.66473C0.00549788 3.9605 3.81903 0.146972 8.52326 0.146972C13.2275 0.146972 17.041 3.9605 17.041 8.66473C17.041 13.369 13.2275 17.1825 8.52326 17.1825ZM2.72161 8.66487C2.72161 8.07428 3.20037 7.59552 3.79096 7.59552L7.45327 7.59552L7.45327 3.9327C7.45327 3.34212 7.93203 2.86335 8.52262 2.86335C9.1132 2.86335 9.59197 3.34212 9.59197 3.9327L9.59197 7.59552L13.2551 7.59552C13.8457 7.59552 14.3245 8.07428 14.3245 8.66487C14.3245 9.25545 13.8457 9.73422 13.2551 9.73422L9.59197 9.73422L9.59197 13.3969C9.59197 13.9875 9.1132 14.4662 8.52262 14.4662C7.93203 14.4662 7.45327 13.9875 7.45327 13.3969L7.45327 9.73422L3.79096 9.73422C3.20037 9.73422 2.72161 9.25545 2.72161 8.66487Z" fill="white" />
                        </svg>
                    </Button>
                    <div>
                        {fontSize}
                    </div>
                    <Button onClick={decreaseFontSize}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.51971 17.8824C13.2239 17.8824 17.0375 14.0689 17.0375 9.36468C17.0375 4.66045 13.2239 0.846924 8.51971 0.846924C3.81548 0.846924 0.00195313 4.66045 0.00195313 9.36468C0.00195313 14.0689 3.81548 17.8824 8.51971 17.8824ZM3.78768 8.29534C3.1971 8.29534 2.71833 8.77411 2.71833 9.36469C2.71833 9.95528 3.1971 10.434 3.78768 10.434L13.2519 10.434C13.8424 10.434 14.3212 9.95528 14.3212 9.36469C14.3212 8.77411 13.8424 8.29534 13.2519 8.29534L3.78768 8.29534Z" fill="white" />
                        </svg>
                    </Button>
                </RoundBorder>
                <br />
                <PannelIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="33" viewBox="0 0 27 33" fill="none">
                        <path d="M1.57617 5.68262L25.1355 5.67911" stroke="#F9F9F6" stroke-width="2.12034" stroke-linecap="round" />
                        <path d="M1.57617 28.4568H25.1356" stroke="#F9F9F6" stroke-width="2.12034" stroke-linecap="round" />
                        <path d="M3.11221 10.4104C3.37864 10.4675 3.77829 10.5056 4.12084 10.5056L13.1795 10.5056C13.522 10.5056 13.9217 10.4675 14.1881 10.4104L14.3975 13.6647C14.2071 13.7598 13.6362 13.874 13.3888 13.874C13.2937 13.874 12.856 12.5609 12.6466 11.9138H11.2193L9.69686 11.7996L9.69686 22.0382C10.3439 22.1524 11.1622 22.3237 11.1622 22.3807C11.1622 22.552 11.1432 23.2371 11.048 23.4465H6.1381C6.06198 23.2371 6.04295 22.4569 6.1381 22.3427C6.1952 22.2666 6.97546 22.0953 7.20383 22.0572C7.39413 22.0192 7.52735 21.9621 7.54638 21.8289C7.58444 21.315 7.60347 20.4586 7.60347 20.0019L7.60347 11.7996L6.10004 11.9138H4.6537C4.44437 12.5609 4.00666 13.874 3.9115 13.874C3.6641 13.874 3.09318 13.7598 2.90287 13.6647L3.11221 10.4104ZM15.0909 15.2632C14.9957 15.2632 14.8625 14.1595 14.9577 14.0072C15.2051 13.855 16.1566 13.6837 16.5753 13.6456C16.8227 12.9034 17.2033 12.009 17.5459 11.419H18.7448L18.7448 13.7408L21.5614 13.7408V15.13C21.5614 15.2062 21.5043 15.2632 21.4281 15.2632L18.7448 15.2632V21.315C18.7448 22.0572 19.3157 22.2285 19.8105 22.2285C20.3814 22.2285 21.1236 22.0763 21.5614 21.905C21.6375 22.0763 21.7326 22.8946 21.7326 23.1039C20.9143 23.6558 19.7915 23.8271 19.1444 23.8271C17.9074 23.8271 16.6895 23.7129 16.6895 21.7908L16.6895 15.2632H15.0909Z" fill="white" />
                    </svg>
                </PannelIcon>
                <RoundBorder>
                    <Button onClick={increaseLineHeight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52326 17.1825C3.81903 17.1825 0.00549747 13.369 0.00549767 8.66473C0.00549788 3.9605 3.81903 0.146972 8.52326 0.146972C13.2275 0.146972 17.041 3.9605 17.041 8.66473C17.041 13.369 13.2275 17.1825 8.52326 17.1825ZM2.72161 8.66487C2.72161 8.07428 3.20037 7.59552 3.79096 7.59552L7.45327 7.59552L7.45327 3.9327C7.45327 3.34212 7.93203 2.86335 8.52262 2.86335C9.1132 2.86335 9.59197 3.34212 9.59197 3.9327L9.59197 7.59552L13.2551 7.59552C13.8457 7.59552 14.3245 8.07428 14.3245 8.66487C14.3245 9.25545 13.8457 9.73422 13.2551 9.73422L9.59197 9.73422L9.59197 13.3969C9.59197 13.9875 9.1132 14.4662 8.52262 14.4662C7.93203 14.4662 7.45327 13.9875 7.45327 13.3969L7.45327 9.73422L3.79096 9.73422C3.20037 9.73422 2.72161 9.25545 2.72161 8.66487Z" fill="white" />
                        </svg>
                    </Button>
                    <div>
                        x {lineHeight}
                    </div>
                    <Button onClick={decreaseLineHeight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.51971 17.8824C13.2239 17.8824 17.0375 14.0689 17.0375 9.36468C17.0375 4.66045 13.2239 0.846924 8.51971 0.846924C3.81548 0.846924 0.00195313 4.66045 0.00195313 9.36468C0.00195313 14.0689 3.81548 17.8824 8.51971 17.8824ZM3.78768 8.29534C3.1971 8.29534 2.71833 8.77411 2.71833 9.36469C2.71833 9.95528 3.1971 10.434 3.78768 10.434L13.2519 10.434C13.8424 10.434 14.3212 9.95528 14.3212 9.36469C14.3212 8.77411 13.8424 8.29534 13.2519 8.29534L3.78768 8.29534Z" fill="white" />
                        </svg>
                    </Button>


                </RoundBorder>

            </ControlPanelRight>
        </Background>
    );
};

export default NovelViewer;

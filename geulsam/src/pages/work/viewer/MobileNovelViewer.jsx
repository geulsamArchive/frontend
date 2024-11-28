import React, { useState } from 'react';
import {
  BottomButton,
  Button,
  MobileNovelViewerContainer,
  NovelText,
  SidebarButtonBorder,
  SidebarContainer,
  SidebarOpenContainer,
} from '../../../style/NovelView';

export default function MobileNovelViewer({ novelHTML, isOpen }) {
  const [fontSize, setFontSize] = useState(15);
  const [lineHeight, setLineHeight] = useState(2.0);

  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);

  const increaseLineHeight = () =>
    setLineHeight((prev) => Math.min(parseFloat((prev + 0.1).toFixed(1)), 3));
  const decreaseLineHeight = () =>
    setLineHeight((prev) => Math.max(parseFloat((prev - 0.1).toFixed(1)), 1));
  const increaseFontSize = () =>
    setFontSize((prevSize) => Math.min(prevSize + 2, 32));
  const decreaseFontSize = () =>
    setFontSize((prevSize) => Math.max(prevSize - 2, 8));

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (!isOpen) return null;

  const Sidebar = () => {
    return (
      <SidebarContainer>
        {IsSidebarOpen && (
          <SidebarOpenContainer>
            <svg
              width="31"
              height="20"
              viewBox="0 0 31 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.41776 6.65688C1.66399 6.70964 2.03332 6.74481 2.3499 6.74481L10.7216 6.74481C11.0381 6.74481 11.4075 6.70964 11.6537 6.65688L11.8472 9.66434C11.6713 9.75228 11.1437 9.85781 10.915 9.85781C10.8271 9.85781 10.4226 8.64427 10.2291 8.04629H8.91005L7.50305 7.94077L7.50305 17.4029C8.10102 17.5084 8.85729 17.6667 8.85729 17.7194C8.85729 17.8777 8.8397 18.5109 8.75176 18.7043H4.21418C4.14383 18.5109 4.12624 17.7898 4.21418 17.6843C4.26694 17.6139 4.98803 17.4556 5.19908 17.4204C5.37495 17.3853 5.49807 17.3325 5.51565 17.2094C5.55083 16.7345 5.56842 15.9431 5.56842 15.521L5.56842 7.94077L4.179 8.04629H2.84235C2.64889 8.64427 2.24437 9.85781 2.15644 9.85781C1.9278 9.85781 1.40017 9.75228 1.2243 9.66434L1.41776 6.65688ZM13.1391 0.31742C13.5198 0.398998 14.0909 0.453383 14.5804 0.453383L27.5241 0.453383C28.0136 0.453383 28.5846 0.398998 28.9653 0.31742L29.2645 4.96738C28.9925 5.10335 28.1768 5.2665 27.8232 5.2665C27.6873 5.2665 27.0618 3.3902 26.7627 2.46565H24.7233L22.5478 2.30249L22.5478 16.9322C23.4724 17.0954 24.6417 17.3401 24.6417 17.4217C24.6417 17.6664 24.6145 18.6453 24.4785 18.9445H17.4628C17.354 18.6453 17.3268 17.5304 17.4628 17.3673C17.5444 17.2585 18.6593 17.0138 18.9856 16.9594C19.2575 16.905 19.4479 16.8234 19.4751 16.6331C19.5294 15.8989 19.5566 14.6752 19.5566 14.0226L19.5566 2.30249L17.4084 2.46565L15.3418 2.46565C15.0426 3.3902 14.4172 5.2665 14.2812 5.2665C13.9277 5.2665 13.112 5.10335 12.84 4.96738L13.1391 0.31742Z"
                fill="#1D1C1C"
              />
            </svg>
            <SidebarButtonBorder>
              <Button onClick={increaseFontSize}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5213 17.1805C3.81708 17.1805 0.00354456 13.367 0.00354477 8.66278C0.00354498 3.95855 3.81708 0.145019 8.5213 0.145019C13.2255 0.145019 17.0391 3.95855 17.0391 8.66278C17.0391 13.367 13.2255 17.1805 8.5213 17.1805ZM2.71991 8.66266C2.71991 8.07207 3.19867 7.59331 3.78926 7.59331L7.45207 7.59331L7.45207 3.93075C7.45207 3.34016 7.93083 2.8614 8.52142 2.8614C9.11201 2.8614 9.59077 3.34016 9.59077 3.93075L9.59077 7.59331L13.2534 7.59331C13.844 7.59331 14.3228 8.07208 14.3228 8.66266C14.3228 9.25325 13.844 9.73201 13.2534 9.73201L9.59077 9.73201L9.59077 13.3949C9.59077 13.9855 9.11201 14.4643 8.52142 14.4643C7.93083 14.4643 7.45207 13.9855 7.45207 13.3949L7.45207 9.73201L3.78926 9.73201C3.19867 9.73201 2.71991 9.25325 2.71991 8.66266Z"
                    fill="#1D1C1C"
                  />
                </svg>
              </Button>
              x {fontSize}
              <Button onClick={decreaseFontSize}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.52166 17.8802C13.2259 17.8802 17.0394 14.0667 17.0394 9.36248C17.0394 4.65826 13.2259 0.844727 8.52166 0.844727C3.81744 0.844727 0.00390625 4.65826 0.00390625 9.36248C0.00390625 14.0667 3.81744 17.8802 8.52166 17.8802ZM3.78964 8.29302C3.19905 8.29302 2.72029 8.77178 2.72029 9.36237C2.72029 9.95295 3.19905 10.4317 3.78964 10.4317L13.2538 10.4317C13.8444 10.4317 14.3232 9.95295 14.3232 9.36237C14.3232 8.77178 13.8444 8.29302 13.2538 8.29302L3.78964 8.29302Z"
                    fill="#1D1C1C"
                  />
                </svg>
              </Button>
            </SidebarButtonBorder>
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.57617 1.67969L25.1355 1.67618"
                stroke="#1D1C1C"
                stroke-width="2.12034"
                stroke-linecap="round"
              />
              <path
                d="M1.57617 24.4541H25.1356"
                stroke="#1D1C1C"
                stroke-width="2.12034"
                stroke-linecap="round"
              />
              <path
                d="M3.11172 6.40796C3.37815 6.46505 3.7778 6.50311 4.12035 6.50311L13.179 6.50311C13.5216 6.50311 13.9212 6.46505 14.1876 6.40796L14.397 9.66222C14.2067 9.75737 13.6357 9.87156 13.3883 9.87156C13.2932 9.87156 12.8555 8.55843 12.6461 7.91139H11.2188L9.69637 7.7972L9.69637 18.0358C10.3434 18.1499 11.1617 18.3212 11.1617 18.3783C11.1617 18.5496 11.1427 19.2347 11.0476 19.444H6.13762C6.06149 19.2347 6.04246 18.4544 6.13762 18.3402C6.19471 18.2641 6.97497 18.0928 7.20334 18.0548C7.39365 18.0167 7.52686 17.9596 7.54589 17.8264C7.58395 17.3126 7.60298 16.4562 7.60298 15.9995L7.60298 7.7972L6.09955 7.91139H4.65322C4.44388 8.55843 4.00617 9.87156 3.91102 9.87156C3.66362 9.87156 3.09269 9.75737 2.90239 9.66222L3.11172 6.40796ZM15.0904 11.2608C14.9952 11.2608 14.862 10.157 14.9572 10.0048C15.2046 9.85252 16.1561 9.68125 16.5748 9.64319C16.8222 8.90099 17.2028 8.00654 17.5454 7.41659H18.7443L18.7443 9.73834L21.5609 9.73834V11.1276C21.5609 11.2037 21.5038 11.2608 21.4276 11.2608L18.7443 11.2608V17.3126C18.7443 18.0548 19.3152 18.2261 19.81 18.2261C20.381 18.2261 21.1232 18.0738 21.5609 17.9025C21.637 18.0738 21.7321 18.8921 21.7321 19.1015C20.9138 19.6534 19.791 19.8246 19.144 19.8246C17.907 19.8246 16.689 19.7105 16.689 17.7884L16.689 11.2608H15.0904Z"
                fill="#1D1C1C"
              />
            </svg>

            <SidebarButtonBorder>
              <Button onClick={increaseLineHeight}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.5213 17.1805C3.81708 17.1805 0.00354456 13.367 0.00354477 8.66278C0.00354498 3.95855 3.81708 0.145019 8.5213 0.145019C13.2255 0.145019 17.0391 3.95855 17.0391 8.66278C17.0391 13.367 13.2255 17.1805 8.5213 17.1805ZM2.71991 8.66266C2.71991 8.07207 3.19867 7.59331 3.78926 7.59331L7.45207 7.59331L7.45207 3.93075C7.45207 3.34016 7.93083 2.8614 8.52142 2.8614C9.11201 2.8614 9.59077 3.34016 9.59077 3.93075L9.59077 7.59331L13.2534 7.59331C13.844 7.59331 14.3228 8.07208 14.3228 8.66266C14.3228 9.25325 13.844 9.73201 13.2534 9.73201L9.59077 9.73201L9.59077 13.3949C9.59077 13.9855 9.11201 14.4643 8.52142 14.4643C7.93083 14.4643 7.45207 13.9855 7.45207 13.3949L7.45207 9.73201L3.78926 9.73201C3.19867 9.73201 2.71991 9.25325 2.71991 8.66266Z"
                    fill="#1D1C1C"
                  />
                </svg>
              </Button>
              x {lineHeight}
              <Button onClick={decreaseLineHeight}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.52166 17.8802C13.2259 17.8802 17.0394 14.0667 17.0394 9.36248C17.0394 4.65826 13.2259 0.844727 8.52166 0.844727C3.81744 0.844727 0.00390625 4.65826 0.00390625 9.36248C0.00390625 14.0667 3.81744 17.8802 8.52166 17.8802ZM3.78964 8.29302C3.19905 8.29302 2.72029 8.77178 2.72029 9.36237C2.72029 9.95295 3.19905 10.4317 3.78964 10.4317L13.2538 10.4317C13.8444 10.4317 14.3232 9.95295 14.3232 9.36237C14.3232 8.77178 13.8444 8.29302 13.2538 8.29302L3.78964 8.29302Z"
                    fill="#1D1C1C"
                  />
                </svg>
              </Button>
            </SidebarButtonBorder>
          </SidebarOpenContainer>
        )}
        <BottomButton>
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSidebar}
          >
            <circle
              cx="20.8452"
              cy="20.8453"
              r="20.692"
              transform="rotate(-0.425817 20.8452 20.8453)"
              fill="#575655"
            />
            <path
              d="M11.8486 14.6221H29.5943"
              stroke="white"
              stroke-width="1.86252"
              stroke-linecap="round"
            />
            <path
              d="M11.8486 20.96H29.5943"
              stroke="white"
              stroke-width="1.86252"
              stroke-linecap="round"
            />
            <path
              d="M11.8486 27.2979H29.5943"
              stroke="white"
              stroke-width="1.86252"
              stroke-linecap="round"
            />
          </svg>
        </BottomButton>
      </SidebarContainer>
    );
  };

  return (
    <MobileNovelViewerContainer>
      <Sidebar />
      <NovelText
        dangerouslySetInnerHTML={{ __html: novelHTML }}
        fontSize={fontSize}
        lineHeight={lineHeight}
      />
    </MobileNovelViewerContainer>
  );
}

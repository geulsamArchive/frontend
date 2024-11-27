import styled from "styled-components";

export const BookCover = styled.img`
  filter: drop-shadow(10px 6px 6px #c3c3c3); 
    width: 95%;
    object-fit: cover;
`

export const BookCoverContainer = styled.div`
    display:flex;
justify-content: center;
align-items: center;
margin-top: 30px;
margin-bottom: 30px;
`

export const BookButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(45, 43, 42, 0.6); /* 반투명 배경 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
font-family: 'MaruBuri-Regular';
  opacity: 0;
  transition: opacity 0.3s ease;

  ${BookCoverContainer}:hover & {
    opacity: 1;
  }
`;
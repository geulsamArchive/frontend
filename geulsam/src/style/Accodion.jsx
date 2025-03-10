import styled from 'styled-components';

export const AccordionHeader = styled.div`
  cursor: pointer;
  height: 62px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'MaruBuri-Regular';
  margin-bottom: 40px;
`;

export const AccordionContainer = styled.div`
  @media only screen and (max-width: 1023px) {
    background-color: rgba(29, 28, 28, 1);
  }
  max-width: 100dvw;
  background-color: rgba(45, 43, 42, 1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AccordionContent = styled.div``;

export const CommentFooter = styled.div`
  font-size: 11px;
  text-align: center;
  color: rgba(129, 128, 127, 1);
`;

import styled from 'styled-components';

export const SearchButton = styled.button`
  @media only screen and (max-width: 1023px) {
    margin-right: 10px;
  }
  background-color: inherit;
  border: none;
  margin-right: 30px;
`;
export const SearchBox = styled.div`
  @media only screen and (max-width: 1023px) {
    height: 50px;
    width: 90dvw;
    margin-left: 5dvw;
  }
  width: 88dvw;
  height: 64px;
  border: 1px solid black;
  border-radius: 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-left: 5dvw;
  margin-top: 30px;
  margin-bottom: 20px;
`;
export const SearchBoxForMember = styled.div`
  @media only screen and (max-width: 1023px) {
    height: 42px;
    width: 90dvw;
    margin-left: 1dvw;
    margin-top: 20dvw;
    margin-right: 3dvw;
  }
  position: absolute;
  top: 1dvw;
  width: 30dvw;
  height: 64px;
  border: 1px solid black;
  border-radius: 39px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-left: 60dvw;
  margin-top: 30px;
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
`;

export const SearchInput = styled.input`
  @media only screen and (max-width: 1023px) {
    padding-bottom: 3px;
    height: 24px;
    width: 80dvw;
    font-size: 20px;
    &::placeholder {
      font-family: 'MaruBuri-Regular';
      font-size: 16px;
    }
  }
  border: none;
  background-color: inherit;
  margin-left: 30px;
  height: 55px;
  width: 80dvw;
  font-size: 27px;
  font-family: 'Grandpa_sharing';
  outline: none;
  &::placeholder {
    font-family: 'MaruBuri-Regular';
    font-size: 18px;
  }
`;
export const SearchInputForMember = styled.input`
  @media only screen and (max-width: 1023px) {
    height: 22px;
    width: 251px;
    font-size: 16px;
    &::placeholder {
      font-family: 'MaruBuri-Regular';
    }
  }
  border: none;
  background-color: inherit;
  margin-left: 30px;
  height: 55px;
  width: 80dvw;
  font-size: 18px;
  font-family: 'Grandpa_sharing';
  outline: none;
  flex-direction: row;
  &::placeholder {
    font-family: 'MaruBuri-Regular';
  }
`;

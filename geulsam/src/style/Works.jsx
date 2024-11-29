import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const WorksContainer = styled.div`
  border-radius: 0 0 16px 16px;
  background-color: rgba(249, 249, 246, 1);
`;
export const WorkLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: rgba(255, 239, 155, 1);
  }
`;

export const Margin = styled.div`
  @media only screen and (max-width: 1023px) {
    margin-top: 0;
  }
  margin-top: 50px;
`;

export const WorkTopBorder = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 18px;
`;

export const WorkInfo = styled.div`
  width: 78dvw;
  font-size: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 14px;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
`;
export const WorkInfoForAuthorInfo = styled.div`
  width: 75dvw;
  font-size: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 14px;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
  }
`;
export const WorkInfoModify = styled.div`
  width: 78dvw;
  font-size: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1023px) {
    width: 40dvw;
    border: none;
  }
`;
export const Searchfailed = styled.div`
  width: 78dvw;
  font-size: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 14px;
  padding-top: 14px;
  color: rgba(129, 128, 127, 1);
`;
export const WorkTitleType = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  text-align: left;
`;
export const WorkType = styled.div`
  width: 100px;
  color: rgba(171, 170, 170, 1);
  margin-left: 10px;
  @media only screen and (max-width: 1023px) {
    width: 13dvw;
  }
`;

export const WorkInfoRight = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 20px;
  @media only screen and (max-width: 1023px) {
    width: 50dvw;
    margin-right: 0px;
  }
`;
export const AuthorWorkInfoRight = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 20px;
  @media only screen and (max-width: 1023px) {
    width: 50dvw;
    margin-right: 60dvw;
  }
`;
export const WorkCreatedAt = styled.div`
  width: 200px;
  @media only screen and (max-width: 1023px) {
    bottom: 0px;
    color: rgba(171, 170, 170, 1);
  }
`;

export const Space = styled.span`
  margin-left: 30px;
`;

export const WorkTitle = styled.div`
  word-break: normal;
  width: 500px;
  @media only screen and (max-width: 1023px) {
    width: 30dvw;
  }
`;

export const ModifyButtons = styled.div`
  width: 100px;
  float: right;
`;

export const WorkInfoContainer = styled.div`
  font-family: 'MaruBuri-Regular';
  width: 90%;
  margin-left: 4%;
  padding-top: 20px;
  background-color: rgba(249, 249, 246, 1);
`;
export const AdminInfoContainer = styled.div`
  font-family: 'MaruBuri-Regular';
  width: 90%;
  margin-left: 4%;
  padding-top: 20px;
  background-color: rgba(249, 249, 246, 1);
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;
export const WorkButtons = styled.div`
  height: auto;
  width: auto;
  border-left: 1px solid black;
`;
export const AuthorShareButtons = styled.div`
  height: auto;
  width: auto;
  border-left: 1px solid black;
  @media only screen and (max-width: 1024px) {
    border: none;
  }
`;
export const MobileWorkButtons = styled.div`
  background-color: rgba(249, 249, 246, 1);
`;

export const WorkSentenceOverlayLink = styled.div`
  display: none; /* 초기 상태는 숨김 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

export const WorkSentenceContainer = styled.div`
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
    height: 311px;
    font-size: 20px;
    font-weight: 700;
    padding: 0px;
    margin-bottom: 30px;
    transition: opacity 0.3s ease, background-color 0.3s ease;

    /* 호버 시 배경 반투명 처리 */
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    /* WorkSentenceOverlayLink가 호버 중일 때 나타나게 설정 */
    &:hover ${WorkSentenceOverlayLink} {
      display: block;
    }
  }
  width: 956px;
  height: 352px;
  background-color: white;
  border-radius: 15px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 27px;
  line-height: 170%;
  color: rgba(171, 170, 170, 1);
  padding: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  filter: drop-shadow(0 4px 12px rgba(38, 38, 38, 0.04));
`;

export const WorkAwards = styled.span`
  border: 1px solid rgba(255, 96, 88, 1);
  border-top: none;
  border-radius: 0 0 10px 10px;
  color: rgba(255, 96, 88, 1);
  padding: 5px 12px 5px 12px;
  font-size: 12px;
  margin-right: 50px;
  position: relative;
  top: -9px;
`;
export const Trash = styled.img`
  width: 15px;
  height: 17 px;
  padding-top: 2px;
`;

export const WorkSentence = styled.div`
  @media only screen and (max-width: 1023px) {
    width: 75dvw;
    height: 100%;
    padding: 30px;
    font-size: 17px;
    /* 호버 시 반투명하게 처리 */
    color: rgba(171, 170, 170, 0.7); /* 텍스트 색상에 반투명 효과 추가 */
    transition: color 0.3s ease;

    &:hover {
      color: rgba(0, 0, 0, 0.3); /* 호버 시 텍스트가 반투명하게 처리 */
    }
    word-break: break-all;
    &:hover ${WorkSentenceOverlayLink} {
      color: rgba(0, 0, 0, 0.3); /* 호버 시 텍스트가 반투명하게 처리 */
    }
  }
  width: 608px;
  height: 268px;
`;

export const WorkSentenceOverlay = styled.div`
  position: relative;
`;

export const WorkReaderLink = styled(Link)`
  margin-top: 270px;
  width: 234px;
  height: 63px;
  font-weight: 600;
  text-decoration: none;
  color: rgba(45, 43, 42, 1);
  border: 1.5px solid rgba(45, 43, 42, 1);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 22px;
`;

export const RecentWorkLinkContainer = styled.div`
  text-align: right;
  margin-top: 40px;
  font-weight: 700;
  font-size: 16px;
`;
export const RecentLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: rgba(129, 128, 127, 1);
`;

export const RecentWorkLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: black;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
  align-items: center;
  width: 180px;
  height: 63px;
  border-radius: 50px;
  border: 2px solid black;
  font-size: 22px;
  font-weight: 700;
  margin-top: 50px;
`;

export const GenreButton = styled.button`
  @media only screen and (max-width: 1023px) {
    border-radius: 30px;
    border: 1px solid rgba(87, 86, 85, 1);
    background-color: ${(props) =>
      props.disabled ? 'rgba(87, 86, 85, 1)' : 'transparent'};
    color: ${(props) =>
      props.disabled ? 'rgba(249, 249, 246, 1)' : 'rgba(87, 86, 85, 1)'};
    cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
    width: auto;
    padding-right: 15px;
    padding-left: 15px;
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
  }
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border: 1px solid rgba(129, 128, 127, 1);
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 76px;
  font-size: 14px;
  height: 34px;
  font-family: 'MaruBuri-Regular';
  margin-top: 11px;

  background-color: ${(props) =>
    props.disabled ? 'rgba(129, 128, 127, 1)' : 'transparent'};
  color: ${(props) =>
    props.disabled ? 'rgba(249, 249, 246, 1)' : 'rgba(129, 128, 127, 1)'};
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
`;

export const MobileWorkContainer = styled.div`
  border-bottom: 1px solid black;
  width: 90dvw;
`;

export const MobileWorkTop = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 14px;
  line-height: 1.7;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const MobileWorkTopLeft = styled.div`
  font-size: 14px;
  width: 100px;
  color: rgba(171, 170, 170, 1);
`;
export const MobileWorkTopRight = styled.div`
  font-size: 16px;
  word-break: break-all;
  width: 65dvw;
  color: rgba(29, 28, 28, 1);
`;

export const MobileWorkBottom = styled.div`
  float: right;
  margin-bottom: 14px;
  font-size: 11px;
  color: rgba(171, 170, 170, 1);
`;

export const AuthorWorkContainer = styled.div`
  width: 75dvw;
  margin-top: 100px;
  border-top: 1px solid black;
  @media only screen and (max-width: 1023px) {
    display: none;
  }
`;
export const MobileAuthorWorkContainer = styled.div`
  display: none;
  @media only screen and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    height: 90dvw;
    border-top: 1px solid rgba(129, 128, 127, 1);
    margin-top: 10dvw;
  }
`;
export const MobileAuthorInfoWorkContainer = styled.div`
  width: 75dvw;
  margin-top: 100px;
  border-top: 1px solid black;
  @media only screen and (max-width: 1023px) {
    margin-top: 0dvw;
    display: flex;
    flex-direction: column;
    height: 90dvw;
    border-top: 1px solid rgba(129, 128, 127, 1);
    margin-bottom: 13dvw;
  }
`;
export const MobileWork = styled.div`
  @media only screen and (max-width: 1023px) {
    border-bottom: 1px solid rgba(129, 128, 127, 1);
  }
`;
export const AuthorWorkInfo = styled.div`
  width: 75dvw;
  font-size: 14px;
  border-bottom: 1px solid black;
  padding-bottom: 14px;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
`;

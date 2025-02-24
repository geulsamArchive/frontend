import styled from 'styled-components';
import { screen } from '@testing-library/react';

export const Close = styled.div`
  position: absolute;
  top: 64px;
  right: 60px;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: inherit;
  border: none;
  margin: 10px;
`;

export const Background = styled.div`
  background-color: rgba(45, 43, 42, 1);
  height: 96vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'MaruBuri-Regular';
`;

export const ViewerContainer = styled.div`
  display: flex;
  background-color: rgba(45, 43, 42, 1);
`;

export const Page = styled.div`
  @media only screen and (max-width: 1700px) {
    height: 500px;
    width: 400px;
  }
  cursor: pointer;
  background-color: white;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  line-height: ${({ lineHeight }) => lineHeight};
  height: 700px;
  width: 430px;
  overflow: hidden;
  flex: 1;
  padding: 60px;
  ${({ borderRight }) => borderRight && `border-right: 1px solid black;`}
`;

export const ControlPanel = styled.div`
  display: flex;
  font-size: 14px;
  background-color: rgba(45, 43, 42, 1);
  color: white;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
  margin-top: 10px;
`;

export const NovelTitle = styled.div`
  width: 500px;
`;

export const PageInput = styled.input`
  width: 25px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid white;
  margin-right: 5px;
  background-color: inherit;
  font-size: 12px;
  text-align: center;
  color: rgba(255, 239, 155, 1);
`;

export const ScrollBar = styled.input`
  width: 380px;
  margin: 10px;
  margin-left: 30px;
`;

export const PageButtons = styled.div`
  font-size: 12px;
  width: 150Wpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlPanelRight = styled.div`
  position: absolute;
  right: 50px;
  bottom: 127px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
`;

export const RoundBorder = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 25px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 38px;
  height: 117px;
`;

export const PannelIcon = styled.div`
  margin: 10px;
`;

export const MobileNovelViewerContainer = styled.div`
  width: 100dvw;
  height: calc(100dvh + 130px); //글의 길이만큼 늘어나야함.
  background-color: white;
  position: absolute;
  top: 140px;
  font-family: 'RIDIBatang';
`;

export const NovelText = styled.div`
  padding: 5%;
  font-weight: 400;
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight};
`;

export const SidebarContainer = styled.div`
  position: fixed;
  font-family: 'MaruBuri-Regular';
  font-size: 14px;
  font-weight: 700;
  right: 20px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarOpenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 44px;
  height: 330px;
  padding: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgba(234, 233, 227, 1);
  border-radius: 60px;
  margin-bottom: 20px;
  position: absolute;
  bottom: 60px;
  right: -5px;
  filter: drop-shadow(0px 2px 24px rgba(182, 182, 182, 0.15));
`;

export const SidebarButtonBorder = styled.div`
  width: 38px;
  height: 117px;
  border-radius: 25px;
  border: 1px solid rgba(29, 28, 28, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BottomButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0px;
`;

import React, { useState } from 'react';
import {
  ModalButtonBlack,
  ModalButtonWhite,
  SideBox,
  SideLink,
  SideLink2,
  SideModalP,
  Sidebars,
} from '../../style/StyledComponent';
import { useAuth } from '../../store/Auth';
import ReactModal from 'react-modal';
const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onClickLogout = () => {
    logout();
  };

  const ModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 10,
    },
    content: {
      background: 'white',
      padding: 0,
      borderRadius: '8px',
      border: 'none',
      width: '346px',
      height: '157px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px',
    },
  };

  return (
    <Sidebars>
      {isAuthenticated ? (
        <>
          <SideBox>
            <SideLink2 to="/work/upload">작품올리기</SideLink2>
          </SideBox>
          <SideBox>
            <SideLink to="/user/mypage">마이페이지</SideLink>
          </SideBox>
          <SideBox>
            <SideLink onClick={openModal}>로그아웃</SideLink>
          </SideBox>
        </>
      ) : (
        <>
          <SideBox>
            <SideLink to="/signup">회원가입</SideLink>
          </SideBox>
          <SideBox>
            <SideLink to="/login">로그인</SideLink>
          </SideBox>
        </>
      )}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={ModalStyle}
      >
        <SideModalP>계정으로부터 로그아웃 하시겠습니까?</SideModalP>
        <div>
          <ModalButtonWhite onClick={openModal}>취소하기</ModalButtonWhite>
          &nbsp; &nbsp;
          <ModalButtonBlack onClick={onClickLogout}>로그아웃</ModalButtonBlack>
        </div>
      </ReactModal>
    </Sidebars>
  );
};

export default Sidebar;

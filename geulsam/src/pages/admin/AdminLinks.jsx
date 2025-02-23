import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AdminButton,
  GenreButton,
  WorkButtons,
  WorkInfoContainer,
  WorkTopBorder,
} from '../../style/Works';
import {
  BookInfoAndButton,
  BookInfoContents,
} from '../../style/StyledComponent';
import {
  AdminMenu,
  AdminMenus,
  AdminMenusContainer,
  AdminMenuTitle,
  AdminWallpaper,
  MenuLink,
} from '../../style/admin/AdminMenu';
import { Desktop } from '../../hooks/useMediaQuery';

const AdminLinks = () => {
  const path = useLocation();
  const openChat = () => {
    window.open('https://open.kakao.com/o/gm0dzCbh');
  };
  const navigate = useNavigate('');
  return (
    <AdminWallpaper>
      <WorkInfoContainer>
        <WorkTopBorder />
        <BookInfoAndButton>
          <BookInfoContents>
            <AdminMenusContainer>
              <AdminMenuTitle>동아리 일정 관리</AdminMenuTitle>
              <AdminMenus>
                {/*좌측 메뉴*/}
                <div>
                  <AdminMenu>
                    <MenuLink to="/admin/calendar">금학기 활동 일정</MenuLink>
                  </AdminMenu>
                </div>
                {/*우측 메뉴*/}
                <div>
                  <AdminMenu>
                    <MenuLink to="/admin/critic">합평회 승인</MenuLink>
                  </AdminMenu>
                </div>
              </AdminMenus>
            </AdminMenusContainer>
            <AdminMenusContainer>
              <AdminMenuTitle>콘텐츠 관리</AdminMenuTitle>
              <AdminMenus>
                {/*좌측 메뉴 */}
                <div>
                  <AdminMenu>
                    <MenuLink to="/admin/critic/log/upload">
                      합평회 기록 등록
                    </MenuLink>
                  </AdminMenu>
                  <AdminMenu>
                    <MenuLink to="/admin/book/upload">
                      새 문집 게시하기
                    </MenuLink>
                  </AdminMenu>
                  <AdminMenu>
                    <MenuLink to="/admin/book/modify">
                      기존 문집 관리하기
                    </MenuLink>
                  </AdminMenu>
                </div>
                {/*우측 메뉴*/}
                <div>
                  <AdminMenu>
                    <MenuLink to="/admin/poster/upload">
                      새 포스터 게시하기
                    </MenuLink>
                  </AdminMenu>
                  <AdminMenu>
                    <MenuLink to="/admin/poster/modify">
                      기존 포스터 관리하기
                    </MenuLink>
                  </AdminMenu>
                </div>
              </AdminMenus>
            </AdminMenusContainer>
            <AdminMenusContainer>
              <AdminMenuTitle>회원 관리</AdminMenuTitle>
              <AdminMenus>
                {/*좌측 메뉴*/}
                <div>
                  <AdminMenu>
                    <MenuLink to="/admin/member/modify">회원 관리</MenuLink>
                  </AdminMenu>
                </div>
                {/*우측 메뉴*/}
                <div></div>
              </AdminMenus>
            </AdminMenusContainer>
          </BookInfoContents>
          <Desktop>
            <WorkButtons>
              <AdminButton disabled="true">일정&콘텐츠</AdminButton>
              <AdminButton onClick={() => navigate('/admin/member/modify')}>
                회원관리
              </AdminButton>
              <AdminButton onClick={openChat}>TEAM 글샘웹</AdminButton>
            </WorkButtons>
          </Desktop>
        </BookInfoAndButton>
      </WorkInfoContainer>
    </AdminWallpaper>
  );
};

export default AdminLinks;

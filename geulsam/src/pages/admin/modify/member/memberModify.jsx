import React, { useEffect, useState } from 'react';
import { normalAPI } from '../../../../apis/Api';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MemberTitleTop,
    ResponsiveButton,
    ScrolledContainerTable,
    ButtonForPassword,
    MemberStyledTable,
    MemberTitle,
    BookInfoContainer,
    ButtonForMember,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
    BackButtonAtMyInfoModify,
    AllowButtonForPassword,
    Option,
} from '../../../../style/StyledComponent';
import Pagination from '../../../../components/Paging/Pagination'; // 페이지네이션 컴포넌트 불러오기
import SearchWorkForMember from '../../../../components/Search/SearchWorkForMember';

const MemberModify = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [members, setMembers] = useState([]); // 회원 목록 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수
    const membersPerPage = 8; // 페이지당 회원 수 8로 설정
    const [order, setOrder] = useState('asc');
    const [currentLevel, setCurrentLevel] = useState('NORMAL'); // 현재 선택된 회원 레벨
    const [isSuspendedActive, setIsSuspendedActive] = useState(false);
    const [isNormalActive, setIsNormalActive] = useState(true); // 기본적으로 등록된 회원이 활성화
    const [activeButton, setActiveButton] = useState(null); // 활성화된 버튼 상태 관리


    const handleButtonClick = (route, buttonIndex) => {
        setActiveButton(buttonIndex); // 버튼 인덱스를 activeButton 상태로 설정
        navigate(route);
    };
    // 비동기 함수로 회원 데이터를 GET 요청으로 가져옴
    const getMemberData = async (level, page, search) => {
        const accessToken = localStorage.getItem('access');
        try {
            const resp = await normalAPI.get(`/user`, {
                params: {
                    page: page,
                    order: order,
                    level: level,
                    size: membersPerPage, // 페이지당 회원 수
                    search: search // 검색어 추가
                },
                headers: {
                    'accessToken': accessToken,
                },
            });
            setTotalPage(resp.data.data.pageTotal); // 전체 페이지 수 설정
            return resp.data.data.content || []; // 데이터를 반환
        } catch (error) {
            console.error("회원 데이터를 가져오는 중 오류 발생:", error);
            return []; // 오류 시 빈 배열 반환
        }
    };

    // NORMAL과 ADMIN 회원 데이터를 모두 가져옴
    const handleNormalMembers = async () => {
        setCurrentPage(1); // 첫 페이지로 리셋
        setIsSuspendedActive(false); // SUSPENDED 버튼 비활성화
        setIsNormalActive(true); // NORMAL 버튼 활성화

        // NORMAL 회원과 ADMIN 회원 데이터를 각각 가져오고 합침
        const normalMembers = await getMemberData('NORMAL', currentPage, searchTerm);
        const adminMembers = await getMemberData('ADMIN', currentPage, searchTerm);

        // NORMAL과 ADMIN 데이터를 합쳐서 상태 업데이트
        const combinedMembers = [...normalMembers, ...adminMembers];
        setMembers(combinedMembers);
    };

    // "가입 신청된 회원" 버튼을 눌렀을 때 SUSPENDED 회원을 가져옴
    const handleSuspendedMembers = async () => {
        setCurrentLevel('SUSPENDED');
        setCurrentPage(1); // 첫 페이지로 리셋
        setIsSuspendedActive(true); // SUSPENDED 버튼 활성화
        setIsNormalActive(false); // NORMAL 버튼 비활성화
        const suspendedMembers = await getMemberData('SUSPENDED', currentPage, searchTerm);
        setMembers(suspendedMembers);
    };

    // 검색어가 변경될 때 호출되는 함수
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue); // 검색어 상태 업데이트
        setCurrentPage(1); // 검색 시 첫 페이지로 리셋
    };

    // 권한 업데이트 함수
    const updateMemberRole = async (member, newRole) => {
        const accessToken = localStorage.getItem('access');
        try {
            // PUT 요청을 보냅니다.
            await normalAPI.put(`/user/level`, {
                level: newRole, // newRole에 따라 NORMAL 또는 ADMIN 권한으로 변경
                userId: member.userId,
            }, {
                headers: {
                    'accessToken': accessToken,
                }
            });

            alert('회원 권한이 변경되었습니다!');

            // 상태 업데이트: 변경된 멤버의 role을 업데이트
            setMembers(members.map(existingMember =>
                existingMember.userId === member.userId ? { ...existingMember, role: newRole } : existingMember
            ));
        } catch (error) {
            console.error("회원 권한 변경 중 오류 발생:", error);
        }
    };

    // 회원 승인 함수 (PUT 요청)
    const approveMember = async (member) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.put(`/user/level`, {
                userId: member.userId,
                level: 'NORMAL'  // 예시로 정상 회원으로 승인하는 경우
            }, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원이 승인되었습니다!');
            setMembers(members.map(approvedMember =>
                approvedMember.userId === member.userId ? { ...approvedMember, level: 'NORMAL' } : approvedMember
            ));
        } catch (error) {
            console.error("회원 승인 중 오류 발생:", error);
        }
    };

    // 회원 거부 함수 (DELETE 요청)
    const rejectMember = async (schoolNum) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.delete(`/user?schoolNum=${schoolNum}`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원이 거부되었습니다!');
            setMembers(members.filter(member => member.schoolNum !== schoolNum));
        } catch (error) {
            console.error("회원 거부 중 오류 발생:", error);
        }
    };

    // 회원 탈퇴 함수 (DELETE 요청)
    const deleteMember = async (schoolNum) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.delete(`/user?schoolNum=${schoolNum}`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원이 탈퇴 처리되었습니다.');
            setMembers(members.filter(member => member.schoolNum !== schoolNum));
        } catch (error) {
            console.error("회원 탈퇴 중 오류 발생:", error);
        }
    };

    // 비밀번호 초기화 함수 (PUT 요청)
    const resetMemberPassword = async (member) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.get(`/user/resetPassword?id=${member.userId}`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원의 비밀번호가 초기화되었습니다.');
        } catch (error) {
            console.error("비밀번호 초기화 중 오류 발생:", error);
        }
    };

    return (
        <BookInfoContainer>
            <ResponsiveButton isActive={activeButton === 1}
                onClick={() => navigate('/admin/critic')}>일정 & 콘텐츠</ResponsiveButton>
            <ResponsiveButton isActive={activeButton === 2}
                onClick={() => navigate('/admin/member/modify')}>회원 관리</ResponsiveButton>
            <ResponsiveButton isActive={activeButton === 3}
                onClick={() => navigate('/user/mypage')}>관리자 정보</ResponsiveButton>
            <MemberTitle>
                <MemberTitleTop>회원 목록</MemberTitleTop> &nbsp;&nbsp;
                <ButtonForMember isActive={isNormalActive} onClick={handleNormalMembers} >등록회원</ButtonForMember>
                <ButtonForMember isActive={isSuspendedActive} onClick={handleSuspendedMembers} >가입신청</ButtonForMember>
                <SearchWorkForMember onSearch={handleSearch} placeholder='찾으시는 회원의 이름 혹은 학번을 적어주세요.' />
            </MemberTitle>
            {/* 회원 목록 테이블 */}
            <ScrolledContainerTable>
                <MemberStyledTable>
                    <thead>
                        <tr>
                            <TableHeader>권한</TableHeader> {/* 권한 추가 */}
                            <TableHeader>이름</TableHeader>
                            <TableHeader>가입연도</TableHeader>
                            <TableHeader>학번</TableHeader>
                            <TableHeader>생년월일</TableHeader>
                            <TableHeader>전화번호</TableHeader>
                            <TableHeader>이메일</TableHeader>
                            <TableHeader>관리</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? (
                            members.map((member) => (
                                <TableRow key={member.userId}>
                                    <TableCell>
                                        {/* 권한 드롭다운 */}
                                        {member.level !== "SUSPENDED" ? (
                                            <select
                                                value={member.level}
                                                onChange={(e) => updateMemberRole(member, e.target.value)}
                                            >
                                                <option value="NORMAL">일반</option>
                                                <option value="ADMIN">관리자</option>
                                            </select>) :
                                            <></>}
                                    </TableCell>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.joinedAt}</TableCell>
                                    <TableCell>{member.schoolNum}</TableCell>
                                    <TableCell>{member.birthDay}</TableCell>
                                    <TableCell>{member.phone}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>
                                        {(member.level === 'SUSPENDED') ? (
                                            <>
                                                <BackButtonAtMyInfoModify onClick={() => rejectMember(member.schoolNum)}>가입 거부</BackButtonAtMyInfoModify>
                                                <AllowButtonForPassword onClick={() => approveMember(member)}>가입 승인</AllowButtonForPassword>
                                            </>
                                        ) : (
                                            <>
                                                <BackButtonAtMyInfoModify onClick={() => deleteMember(member.schoolNum)}>회원 탈퇴</BackButtonAtMyInfoModify>
                                                <ButtonForPassword onClick={() => resetMemberPassword(member)}>비밀번호 초기화</ButtonForPassword>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="8">회원이 없습니다.</TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </MemberStyledTable>
            </ScrolledContainerTable>

            {/* 페이지네이션 */}
            <Pagination page={currentPage} totalPage={totalPage} onChangePage={setCurrentPage} />
        </BookInfoContainer>
    );
};

export default MemberModify;

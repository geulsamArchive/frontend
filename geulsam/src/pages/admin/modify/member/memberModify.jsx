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
    ButtonForMember2,
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
import PasswordChangeEmail from './PasswordChangeEmail';
const MemberModify = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const getMemberData = async (level, search) => {
        const accessToken = localStorage.getItem('access');
        try {
            const resp = await normalAPI.get(`/user`, {
                params: {
                    order: order,
                    level: level,
                    size: 10000, // 전체 데이터를 가져오기 위해 큰 값 사용
                    search: search, // 검색어 추가
                },
                headers: {
                    'accessToken': accessToken,
                },
            });
            // API에서 totalPage 관련 처리는 제거합니다.
            return resp.data.data.content || [];
        } catch (error) {
            console.error("회원 데이터를 가져오는 중 오류 발생:", error);
            return [];
        }
    };

    // NORMAL과 ADMIN 회원 데이터를 모두 가져옴
    // NORMAL과 ADMIN 회원 전체 데이터를 받아온 후 합침
    const handleNormalMembers = async (search) => {
        setIsSuspendedActive(false);
        setIsNormalActive(true);
        const normalMembers = await getMemberData('NORMAL', search);
        const adminMembers = await getMemberData('ADMIN', search);
        const combinedMembers = [...normalMembers, ...adminMembers];
        setMembers(combinedMembers);
        setTotalPage(Math.ceil(combinedMembers.length / membersPerPage));
    };

    const handleSuspendedMembers = async () => {
        setCurrentLevel('SUSPENDED');
        setCurrentPage(1); // 첫 페이지로 리셋
        setIsSuspendedActive(true);
        setIsNormalActive(false);
        const suspendedMembers = await getMemberData('SUSPENDED', searchTerm);
        setMembers(suspendedMembers);
        setTotalPage(Math.ceil(suspendedMembers.length / membersPerPage));
    };

    const handleNormalMembersButtonClick = async () => {
        setCurrentPage(1);
        await handleNormalMembers(searchTerm);
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
    useEffect(() => {
        handleNormalMembers(searchTerm);
    }, []); // 초기 렌더링

    useEffect(() => {
        if (isNormalActive) {
            handleNormalMembers(searchTerm);
        } else if (isSuspendedActive) {
            handleSuspendedMembers();
        }
    }, [searchTerm]);


    const openPasswordChangeEmailModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };
    const closePasswordChangeEmailModal = () => {
        setIsModalOpen(false);
    };

    // 비밀번호 초기화 함수 (PUT 요청)
    const resetMemberPassword = async (member) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.post(`/user/resetPassword?id=${member.userId}`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원의 비밀번호가 초기화되었습니다.');
        } catch (error) {
            console.error("비밀번호 초기화 중 오류 발생:", error);
        }


    };
    const displayedMembers = members.slice(
        (currentPage - 1) * membersPerPage,
        currentPage * membersPerPage
    );


    return (
        <BookInfoContainer>
            <ResponsiveButton isActive={activeButton === 1}
                onClick={() => navigate('/admin/critic')}>일정 & 콘텐츠</ResponsiveButton>
            <ResponsiveButton isActive={activeButton === 2}
                onClick={() => navigate('/admin/member/modify')}>회원 관리</ResponsiveButton>
            <ResponsiveButton isActive={activeButton === 3}
                onClick={() => navigate('/user/mypage')}>관리자 정보</ResponsiveButton>
            <MemberTitle>
                <MemberTitleTop>회원 목록</MemberTitleTop> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ButtonForMember isActive={isNormalActive} onClick={handleNormalMembersButtonClick}
                >등록회원</ButtonForMember>
                <ButtonForMember2 isActive={isSuspendedActive} onClick={handleSuspendedMembers} >가입신청</ButtonForMember2>
                <SearchWorkForMember onSearch={handleSearch} placeholder='찾으시는 회원의 이름 혹은 학번을 적어주세요.' />
            </MemberTitle>
            {/* 회원 목록 테이블 */}
            <ScrolledContainerTable>
                <MemberStyledTable>
                    <thead>
                        <tr>
                            {isNormalActive && <TableHeader>권한</TableHeader>}
                            <TableHeader>이름</TableHeader>
                            <TableHeader>가입연도</TableHeader>
                            <TableHeader>학번</TableHeader>
                            <TableHeader>관리</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedMembers.length > 0 ? (
                            displayedMembers.map((member) => (
                                <TableRow key={member.userId}>
                                    {member.level !== "SUSPENDED" && (
                                        <TableCell>
                                            {/* 권한 드롭다운 */}
                                            <select
                                                value={member.level}
                                                onChange={(e) => updateMemberRole(member, e.target.value)}
                                            >
                                                <option value="NORMAL">일반</option>
                                                <option value="ADMIN">관리자</option>
                                            </select>
                                        </TableCell>
                                    )}
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.joinedAt}</TableCell>
                                    <TableCell>{member.schoolNum}</TableCell>
                                    <TableCell>
                                        {(member.level === 'SUSPENDED') ? (
                                            <>
                                                <BackButtonAtMyInfoModify onClick={() => rejectMember(member.schoolNum)}>가입 거부</BackButtonAtMyInfoModify>
                                                <AllowButtonForPassword onClick={() => approveMember(member)}>가입 승인</AllowButtonForPassword>
                                            </>
                                        ) : (
                                            <>
                                                <BackButtonAtMyInfoModify onClick={() => deleteMember(member.schoolNum)}>회원 탈퇴</BackButtonAtMyInfoModify>
                                                <ButtonForPassword onClick={() => openPasswordChangeEmailModal(member)}>비밀번호 초기화</ButtonForPassword>
                                                {isModalOpen && (
                                                    <PasswordChangeEmail member={selectedMember} isModalOpen={isModalOpen} closeModal={closePasswordChangeEmailModal} />
                                                )}
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

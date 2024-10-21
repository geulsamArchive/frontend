import React, { useEffect, useState } from 'react';
import { normalAPI } from '../../../../apis/Api';
import {
    MemberTitle,
    BookInfoContainer,
    Button,
    ButtonForMember,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
    BackButtonAtMyInfoModify,
    ButtonForPassword,
    Option,
} from '../../../../style/StyledComponent';
import Pagination from '../../../../components/Paging/Pagination'; // 페이지네이션 컴포넌트 불러오기
import SearchWorkForMember from '../../../../components/Search/SearchWorkForMember';

const MemberModify = () => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [members, setMembers] = useState([]); // 회원 목록 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수
    const membersPerPage = 10; // 페이지당 회원 수
    const [order, setOrder] = useState('asc');
    const [currentLevel, setCurrentLevel] = useState('NORMAL'); // 현재 선택된 회원 레벨
    const [isSuspendedActive, setIsSuspendedActive] = useState(false);
    const [isNormalActive, setIsNormalActive] = useState(true); // 기본적으로 등록된 회원이 활성화

    // 비동기 함수로 회원 데이터를 GET 요청으로 가져옴
    const getMemberData = async (level, page, search) => {
        const accessToken = localStorage.getItem('access');
        try {
            const resp = await normalAPI.get(`/user`, {
                params: {
                    page: page,
                    order: order,
                    level: level,
                    size: membersPerPage,
                    search: search // 검색어 추가
                },
                headers: {
                    'accessToken': accessToken,
                },
            });
            console.log(resp.data); // 응답 구조를 확인
            setMembers(resp.data.data.content || []); // 상태에 회원 데이터 저장
            setTotalPage(resp.data.data.pageTotal); // 전체 페이지 수 설정
        } catch (error) {
            console.error("회원 데이터를 가져오는 중 오류 발생:", error);
            setMembers([]); // 오류 시 회원 목록 초기화
        }
    };

    useEffect(() => {
        getMemberData(currentLevel, currentPage, searchTerm); // searchTerm이 변경될 때마다 회원 데이터 가져오기
    }, [currentLevel, currentPage, searchTerm]);

    // "등록된 회원" 버튼을 눌렀을 때 NORMAL 회원을 가져옴
    const handleNormalMembers = () => {
        setCurrentLevel('NORMAL');
        setCurrentPage(1); // 첫 페이지로 리셋
        setIsSuspendedActive(false); // SUSPENDED 버튼 비활성화
        setIsNormalActive(true); // NORMAL 버튼 활성화
    };

    // "가입 신청된 회원" 버튼을 눌렀을 때 SUSPENDED 회원을 가져옴
    const handleSuspendedMembers = () => {
        setCurrentLevel('SUSPENDED');
        setCurrentPage(1); // 첫 페이지로 리셋
        setIsSuspendedActive(true); // SUSPENDED 버튼 활성화
        setIsNormalActive(false); // NORMAL 버튼 비활성화
    };

    // 검색어가 변경될 때 호출되는 함수
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue); // 검색어 상태 업데이트
        setCurrentPage(1); // 검색 시 첫 페이지로 리셋
    };

    // 권한 업데이트 함수
    const updateMemberRole = async (id, newRole) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.put(`/user/level`, {
                userId: id,
                level: "ADMIN",
                // "level": "ADMIN",
                // "userId": 0
            }, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원 권한이 변경되었습니다!');
            setMembers(members.map(member =>
                member.id === id ? { ...member, role: newRole } : member
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
                userId: member.id,
                level: 'NORMAL'  // 예시로 정상 회원으로 승인하는 경우
            }, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원이 승인되었습니다!');
            setMembers(members.map(approvedMember =>
                approvedMember.id === member.id ? { ...approvedMember, level: 'NORMAL' } : approvedMember
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
            // 'https://geulsaem.store/user/resetPassword?id=0' 
            await normalAPI.get(`/user/resetPassword?id=${member.id}`, {
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
            <MemberTitle>회원 관리 &nbsp;&nbsp;
                <ButtonForMember isActive={isNormalActive} onClick={handleNormalMembers} >등록회원</ButtonForMember>
                <ButtonForMember isActive={isSuspendedActive} onClick={handleSuspendedMembers} >가입신청</ButtonForMember>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <SearchWorkForMember onSearch={handleSearch} placeholder='찾으시는 회원의 이름 혹은 학번을 적어주세요.' />
            </MemberTitle>
            {/* 회원 목록 테이블 */}
            <StyledTable>
                <thead>
                    <tr>
                        {currentLevel === 'NORMAL' && <TableHeader>권한</TableHeader>} {/* 권한 추가 */}
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
                            <TableRow key={member.id}>
                                {currentLevel === 'NORMAL' && (
                                    <TableCell>
                                        {/* 권한 드롭다운 */}
                                        <select
                                            value={member.role}
                                            onChange={(e) => updateMemberRole(member.id, e.target.value)}
                                        >
                                            <Option value="NORMAL">일반</Option>
                                            <Option value="ADMIN">관리자</Option>
                                        </select>
                                    </TableCell>
                                )}
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.joinedAt}</TableCell>
                                <TableCell>{member.schoolNum}</TableCell>
                                <TableCell>{member.birthDay}</TableCell>
                                <TableCell>{member.phone}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                    {currentLevel === 'NORMAL' ? (
                                        <>
                                            <BackButtonAtMyInfoModify onClick={() => deleteMember(member.schoolNum)}>회원 탈퇴</BackButtonAtMyInfoModify>
                                            <ButtonForPassword onClick={() => resetMemberPassword(member.id)}>비밀번호 초기화</ButtonForPassword>
                                        </>
                                    ) : (
                                        <>
                                            <BackButtonAtMyInfoModify onClick={() => rejectMember(member.schoolNum)}>가입 거부</BackButtonAtMyInfoModify>
                                            <Button onClick={() => approveMember(member.id)}>가입 승인</Button>
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
            </StyledTable>

            {/* 페이지네이션 */}
            <Pagination page={currentPage} totalPage={totalPage} onChangePage={setCurrentPage} />
        </BookInfoContainer>
    );
};

export default MemberModify;

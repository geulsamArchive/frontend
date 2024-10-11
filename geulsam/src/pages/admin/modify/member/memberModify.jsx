import React, { useEffect, useState } from 'react';
import { normalAPI } from '../../../../apis/Api';
import {
    MemberTitle,
    BookInfoContainer,
    Button,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
} from '../../../../style/StyledComponent';
import Pagination from '../../../../components/Paging/Pagination'; // 페이지네이션 컴포넌트 불러오기

const MemberModify = () => {
    const [members, setMembers] = useState([]); // 회원 목록 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수
    const membersPerPage = 10; // 페이지당 회원 수
    const [order, setOrder] = useState('asc');
    const [currentLevel, setCurrentLevel] = useState('NORMAL'); // 현재 선택된 회원 레벨

    // 비동기 함수로 회원 데이터를 GET 요청으로 가져옴
    const getMemberData = async (level, page) => {
        const accessToken = localStorage.getItem('access');
        try {
            const resp = await normalAPI.get(`/user?page=${page}&order=${order}&level=${level}&size=${membersPerPage}`, {
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
        getMemberData(currentLevel, currentPage); // currentLevel이나 currentPage가 변경될 때마다 회원 데이터 가져오기
    }, [currentLevel, currentPage]);

    // "가입 신청된 회원" 버튼을 눌렀을 때 SUSPENDED 회원을 가져옴
    const handleSuspendedMembers = () => {
        setCurrentLevel('SUSPENDED');
        setCurrentPage(1); // 첫 페이지로 리셋
    };

    // "등록된 회원" 버튼을 눌렀을 때 NORMAL 회원을 가져옴
    const handleNormalMembers = () => {
        setCurrentLevel('NORMAL');
        setCurrentPage(1); // 첫 페이지로 리셋
    };

    // 회원 승인 함수 (PUT 요청)
    const approveMember = async (id) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.put(`/user/level`, {
                headers: {
                    'accessToken': accessToken,
                }
            });
            alert('회원이 승인되었습니다!');
            setMembers(members.map(member =>
                member.id === id ? { ...member, level: 'NORMAL' } : member
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

    return (
        <BookInfoContainer>
            <MemberTitle>회원 관리 &nbsp;&nbsp;
                <Button onClick={handleSuspendedMembers}>가입신청</Button>
                <Button onClick={handleNormalMembers}>등록회원</Button>
            </MemberTitle>
            {/* 회원 목록 테이블 */}
            <StyledTable>
                <thead>
                    <tr>
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
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.joinedAt}</TableCell>
                                <TableCell>{member.schoolNum}</TableCell>
                                <TableCell>{member.birthDay}</TableCell>
                                <TableCell>{member.phone}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                    <Button onClick={() => approveMember(member.id)}>가입 승인</Button>
                                    <Button onClick={() => rejectMember(member.schoolNum)}>가입 거부</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="7">회원이 없습니다.</TableCell>
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

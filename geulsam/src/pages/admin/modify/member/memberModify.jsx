import React, { useEffect, useState } from 'react';
import { normalAPI } from '../../../../apis/Api';
import { InputsContainer, InputRow, Input, Inputs, Form, InputTitle, Button, BookInfoContainer, BookTitle, InputUploads, RightSubmit, Red } from '../../../../style/StyledComponent';

const MemberModify = () => {
    const [members, setMembers] = useState([]);   // 회원 목록 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const membersPerPage = 13;                    // 페이지당 회원 수

    // 비동기 함수로 회원 데이터를 GET 요청으로 가져옴
    const getMemberData = async (level) => {
        try {
            const resp = await normalAPI.get(`/user?level=${level}`);
            console.log(resp.data);
            setMembers(resp.data.data.content);  // 상태에 회원 데이터 저장
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    // "가입 신청된 회원" 버튼을 눌렀을 때 SUSPENDED 회원을 가져옴
    const handleSuspendedMembers = () => {
        getMemberData('SUSPENDED');
    };

    // "등록된 회원" 버튼을 눌렀을 때 NORMAL 회원을 가져옴
    const handleNormalMembers = () => {
        getMemberData('NORMAL');
    };

    // 회원 승인 함수 (PUT 요청)
    const approveMember = async (id) => {
        const accessToken = localStorage.getItem('access');
        try {
            const res = await normalAPI.put(`/user/${id}/approve`,
                {
                    headers: {
                        'accessToken': accessToken,
                    }
                });
            alert('Member approved!');
            setMembers(members.map(member =>
                member.id === id ? { ...member, level: 'NORMAL' } : member
            ));
        } catch (error) {
            console.error("Error approving member:", error);
        }
    };

    // 회원 거부 함수 (DELETE 요청)
    const rejectMember = async (schoolNum) => {
        const accessToken = localStorage.getItem('access');
        try {
            await normalAPI.delete(`/user?schoolNum=${schoolNum}`,
                {
                    headers: {
                        'accessToken': accessToken,
                    }
                }
            );
            alert('Member rejected!');
            setMembers(members.filter(member => member.schoolNum !== schoolNum));
        } catch (error) {
            console.error("Error rejecting member:", error);
        }
    };

    // 페이지 변경 처리
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 회원 데이터
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <BookInfoContainer>
            <BookTitle>
                회원 관리
            </BookTitle>

            {/* 버튼을 통해 가입 신청된 회원 및 등록된 회원 목록 가져오기 */}
            <Button onClick={handleSuspendedMembers}>가입 신청된 회원</Button>
            <Button onClick={handleNormalMembers}>등록된 회원</Button>

            {/* 회원 목록 테이블 */}
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>가입연도</th>
                        <th>학번</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.map((member) => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{new Date(member.joinedAt).getFullYear()}</td>
                            <td>{member.schoolNum}</td>
                            <td>{member.birthDay}</td>
                            <td>{member.phone}</td>
                            <td>{member.email}</td>
                            <td>
                                <button onClick={() => approveMember(member.id)}>가입 승인</button>
                                <button onClick={() => rejectMember(member.schoolNum)}>가입 거부</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div>
                {[...Array(Math.ceil(members.length / membersPerPage)).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number + 1)}
                        disabled={currentPage === number + 1}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </BookInfoContainer>
    );
};

export default MemberModify;

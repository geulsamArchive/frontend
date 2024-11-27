import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { normalAPI } from "../../../apis/Api";
import {
  BookButtons,
  BookInfos,
  BookInfoAndButton,
  BookInfoContainer,
  BookInfoContents,
  BookTitle,
  URLButton,
  NoneLinkBookInfos,
} from "../../../style/StyledComponent";
import PDFDownload from "../../../components/Download/PDFDownload";
import CopyURL from "../../../components/CopyURL/CopyURL";
import {
  MobileWorkButtons,
  WorkButtons,
  WorkLink,
  WorkReaderLink,
  WorkSentence,
  WorkSentenceContainer,
} from "../../../style/Works";
import Comments from "../../../components/Comment/Comments";
import NovelViewer from "../viewer/NovelViewer";
import axios from "axios";
import Modal from "react-modal";
import { CheckTitleLength } from "./../../../components/CheckLength";
import { Desktop, Mobile } from "../../../hooks/useMediaQuery";
import { useAuth } from "../../../store/Auth";

const WorkInfo = () => {
  const [workData, setWorkData] = useState({});
  const { workId } = useParams();
  const [novel, setNovel] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { logout } = useAuth();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const navigate = useNavigate();
  const onClickList = () => {
    navigate("/work");
  };

  const translateType = (type) => {
    switch (type) {
      case "NOVEL":
        return "소설";
      case "ESSAY":
        return "수필";
      case "POEM":
        return "시";
      default:
        return type;
    }
  };

  const getWorkData = async () => {
    const accesstoken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    try {
      const response = await normalAPI.get(`/content/${workId}`, {
        headers: {
          accessToken: accesstoken,
        },
      });
      console.log(response);
      const data = response.data.data;
      const translatedWork = {
        ...data,
        type: translateType(data.type), // type만 변환
      };
      setWorkData(translatedWork);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("토큰 재전송");
        // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
        try {
          const tokenResponse = await normalAPI.get(`/content/${workId}`, {
            headers: {
              refreshToken: refreshToken,
            },
          });
          console.log(tokenResponse);
          if (tokenResponse.status === 200) {
            const accessToken = tokenResponse.headers.accesstoken.replace(
              "Bearer ",
              ""
            );
            localStorage.setItem("access", accessToken);
            if (tokenResponse.headers.refreshtoken) {
              const refreshToken = tokenResponse.headers.refreshtoken.replace(
                "Bearer ",
                ""
              );
              localStorage.setItem("refresh", refreshToken);
            }
            setWorkData(tokenResponse.data.data);
          }
        } catch (err) {
          console.error("Refresh Token Error:", err);
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          logout();
        }
      } else {
        console.error("Error:", error);
        alert("조회 중 문제가 발생했습니다.");
      }
    }
  };

  const getHTMLdata = async () => {
    try {
      const res = await axios.get(workData.html);
      console.log(res);
      setNovel(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorkData();
  }, [workId]);

  useEffect(() => {
    if (workData.html) {
      getHTMLdata();
    }
  }, [workData]);
  return (
    <>
      <BookInfoContainer>
        <BookTitle>{CheckTitleLength(workData.title, 40)}</BookTitle>
        <BookInfoAndButton>
          <BookInfoContents>
            <BookInfos>
              <WorkLink to={`/author/${workData.authorId}`}>
                작가 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                {workData.author}
              </WorkLink>
            </BookInfos>
            <NoneLinkBookInfos>
              게시일 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              {workData.createdAt}
            </NoneLinkBookInfos>
            <NoneLinkBookInfos>
              분류 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              {workData.type}
            </NoneLinkBookInfos>
            <WorkSentenceContainer>
              <WorkSentence>{workData.sentence}</WorkSentence>
              <Desktop>
                <WorkReaderLink onClick={openModal}>
                  작품 바로 읽기 &nbsp;
                  <svg
                    width="26"
                    height="23"
                    viewBox="0 0 26 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.043 4.74854V20.958"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M24.2646 4.74854L24.2646 20.958"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M1.82129 4.74854L1.82129 20.958"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M24.2649 20.9581C24.2649 20.9581 23.018 18.4644 18.6539 18.4644C14.2899 18.4644 13.043 20.9581 13.043 20.9581"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.0432 20.9581C13.0432 20.9581 11.7964 18.4644 7.43227 18.4644C3.06817 18.4644 1.82129 20.9581 1.82129 20.9581"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M24.2649 4.74865C24.2649 4.74865 23.018 2.25488 18.6539 2.25488C14.2899 2.25488 13.043 4.74865 13.043 4.74865"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.0432 4.74865C13.0432 4.74865 11.7964 2.25488 7.43227 2.25488C3.06817 2.25488 1.82129 4.74865 1.82129 4.74865"
                      stroke="#2D2B2A"
                      stroke-width="2.04367"
                      stroke-linecap="round"
                    />
                  </svg>
                </WorkReaderLink>
              </Desktop>
            </WorkSentenceContainer>
          </BookInfoContents>
          <Desktop>
            <WorkButtons>
              <br />
              <br />
              <PDFDownload PDFLink={workData.pdf} />
              <CopyURL />
            </WorkButtons>
          </Desktop>
        </BookInfoAndButton>
        <Mobile>
          <MobileWorkButtons>
            <PDFDownload PDFLink={workData.pdf} />
            <CopyURL />
            <URLButton onClick={onClickList}>목록</URLButton>
            <br />
          </MobileWorkButtons>
        </Mobile>
      </BookInfoContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Novel Viewer"
        style={{
          content: {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "0",
            padding: "0",
            border: "none",
            background: "white",
            overflow: "auto", // 모달 안의 콘텐츠가 넘칠 때 스크롤이 생기도록
          },
        }}
      >
        <NovelViewer
          novelHTML={novel}
          title={workData.title}
          closeModal={closeModal}
        />
      </Modal>
      <Comments id={workData.id} />
    </>
  );
};

export default WorkInfo;

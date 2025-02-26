import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import {
  BookButtons,
  BookInfos,
  BookInfoAndButton,
  BookInfoContainer,
  BookInfoContents,
  BookTitle,
  URLButton,
  NoneLinkBookInfos,
} from '../../../style/StyledComponent';
import PDFDownload from '../../../components/Download/PDFDownload';
import CopyURL from '../../../components/CopyURL/CopyURL';
import {
  MobileWorkButtons,
  WorkButtons,
  WorkLink,
  WorkReaderLink,
  WorkSentence,
  WorkSentenceContainer,
  WorkSentenceOverlay,
  WorkSentenceOverlayLink,
} from '../../../style/Works';
import Comments from '../../../components/Comment/Comments';
import NovelViewer from '../viewer/NovelViewer';
import axios from 'axios';
import Modal from 'react-modal';
import { CheckTitleLength } from './../../../components/CheckLength';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';
import { useAuth } from '../../../store/Auth';
import MobileNovelViewer from '../viewer/MobileNovelViewer';

const WorkInfo = () => {
  const [workData, setWorkData] = useState({});
  const { workId } = useParams();
  const [novel, setNovel] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [novelModalIsOpen, setNovelModalIsOpen] = useState(false);

  const { logout } = useAuth();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openNovel = () => setNovelModalIsOpen(true);

  const navigate = useNavigate();
  const onClickList = () => {
    navigate('/work');
  };

  const translateType = (type) => {
    switch (type) {
      case 'NOVEL':
        return '소설';
      case 'ESSAY':
        return '수필';
      case 'POEM':
        return '시';
      default:
        return type;
    }
  };

  const getWorkData = async () => {
    const accesstoken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

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
        console.log('토큰 재전송');
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
              'Bearer ',
              ''
            );
            localStorage.setItem('access', accessToken);
            if (tokenResponse.headers.refreshtoken) {
              const refreshToken = tokenResponse.headers.refreshtoken.replace(
                'Bearer ',
                ''
              );
              localStorage.setItem('refresh', refreshToken);
            }
            setWorkData(tokenResponse.data.data);
          }
        } catch (err) {
          console.error('Refresh Token Error:', err);
          alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          logout();
        }
      } else {
        console.error('Error:', error);
        alert('조회 중 문제가 발생했습니다.');
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
              <WorkSentenceOverlay>
                <WorkSentenceOverlayLink>
                  <svg
                    width="183"
                    height="57"
                    viewBox="0 0 183 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={openNovel}
                  >
                    <rect
                      x="1.08569"
                      y="0.75"
                      width="180.829"
                      height="55.5"
                      rx="27.75"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M35.6837 29.58C34.7557 28.716 33.6517 27.708 32.7877 27.004C31.2197 28.668 29.3477 30.092 27.8597 30.396C27.6837 30.348 27.0757 29.916 27.2997 29.836C29.4437 29.068 32.3237 25.916 33.5557 23.66H31.0117C30.5157 23.66 29.9717 23.852 29.7797 23.836C29.4917 23.804 28.6917 23.452 28.3237 23.244C28.3237 22.956 28.4677 22.588 28.6277 22.604C28.8997 22.62 30.1157 22.684 31.0277 22.684H33.5557C33.8437 22.684 34.1637 22.524 34.4357 22.524C34.6437 22.524 35.1557 22.62 35.3957 22.684C35.5717 22.732 35.6197 22.892 35.6197 23.02C35.6197 23.132 35.4597 23.356 35.3797 23.532C34.8997 24.428 34.1797 25.404 33.3637 26.364L34.0037 26.828C34.5157 27.196 35.2517 27.516 35.5077 27.772C35.7797 28.028 36.2437 28.652 36.4197 28.956C36.5317 29.196 35.8757 29.564 35.6837 29.58ZM38.0517 30.156C37.8917 29.852 37.7477 28.972 37.7477 28.092V22.636C37.7477 22.428 37.6357 22.316 37.5237 22.22L36.6437 21.516C36.6757 21.26 36.8677 20.94 37.0117 20.94C37.4117 20.94 38.6437 21.26 39.0597 21.436C39.2357 21.516 39.2837 21.596 39.2837 21.772C39.2837 21.932 39.2357 22.396 39.2357 22.652L39.2197 25.884H39.3957C40.0197 25.884 40.6437 25.548 40.9637 25.548C41.3477 25.548 41.9557 25.644 42.1157 25.772C42.2917 25.884 42.2757 26.54 42.1157 26.812H39.2037V27.58C39.1877 28.636 38.8837 29.82 38.6437 30.156H38.0517ZM39.0277 31.212C39.0277 31.484 38.9797 31.772 38.9637 32.076L38.8997 34.812C38.8837 35.404 38.6437 36.348 38.4037 36.62H37.7157C37.6197 36.412 37.4757 35.724 37.4757 35.132V31.836H33.2197C32.5957 31.836 31.9877 32.028 31.7957 32.028C31.5397 32.028 30.2917 31.532 30.0357 31.356C30.0357 31.148 30.1637 30.732 30.3077 30.732C30.4837 30.732 32.1637 30.828 33.2197 30.828H36.7077C37.1237 30.828 37.5877 30.684 37.9077 30.684C38.1797 30.684 38.5477 30.732 38.7077 30.78C38.8837 30.844 39.0277 30.94 39.0277 31.212ZM46.4953 29.692C46.0153 29.692 45.0553 29.948 44.8953 29.948C44.5753 29.948 43.4393 29.516 42.8793 29.196C42.8793 28.972 42.9753 28.572 43.1353 28.572C43.4553 28.572 45.1353 28.732 46.4953 28.732H54.0793C54.7513 28.732 55.4073 28.428 55.7273 28.428C56.2073 28.428 57.1673 28.604 57.2793 28.78C57.4233 29.02 57.3593 29.516 57.2313 29.692H50.8953V30.428C50.8793 30.732 50.8313 31.02 50.7353 31.244H52.2553C52.5273 31.244 52.9753 31.116 53.1193 31.116C53.3593 31.116 53.8553 31.18 54.0313 31.212C54.2393 31.26 54.3833 31.468 54.3673 31.708L54.0793 34.684L53.9673 35.02L54.5753 35.26C54.6393 35.34 54.5593 35.836 54.5113 35.996H47.6793C47.6153 36.188 47.5193 36.348 47.3753 36.492H46.8473C46.6713 36.188 46.4953 35.804 46.4313 35.068L46.2233 32.316C46.2073 32.14 45.7593 31.964 45.5833 31.836C45.6153 31.612 45.7753 31.212 45.8553 31.212C46.2393 31.212 47.2953 31.244 47.7113 31.244H49.5353C49.4713 31.036 49.4393 30.78 49.4393 30.54V29.692H46.4953ZM51.6633 24.348C51.6793 24.172 51.4073 23.964 51.2953 23.884C51.3273 23.66 51.4393 23.452 51.5833 23.452C52.0313 23.452 52.6713 23.564 52.8953 23.628C53.0553 23.676 53.2153 23.788 53.2313 23.948C53.2473 24.108 53.1993 24.284 53.1513 24.476L52.7513 26.38H52.8953C53.1993 26.38 53.6473 26.236 53.9353 26.236C54.1273 26.236 54.9113 26.348 55.0393 26.38C55.2633 26.412 55.2153 27.212 54.9913 27.372H47.3593C47.0393 27.372 46.6073 27.484 46.3353 27.484C46.0473 27.484 45.1353 27.068 44.9113 26.924C44.9113 26.476 45.0713 26.284 45.1513 26.284C45.4233 26.284 46.4633 26.38 47.3913 26.38H47.4873C47.4393 25.548 47.2633 24.492 47.1033 23.788C47.3433 23.628 48.1273 23.484 48.2553 23.708C48.6233 24.316 48.8793 25.74 48.8633 26.38H51.5353L51.6633 24.348ZM47.7433 35.052H52.7513L52.7673 32.172H47.7433V35.052ZM46.5753 23.292C46.2873 23.292 45.2153 22.796 44.9913 22.652C44.9913 22.284 45.1193 22.012 45.1993 22.012C45.4713 22.012 46.7833 22.124 47.7113 22.124H52.3353C52.7193 22.124 53.3113 21.948 53.5993 21.948C53.8713 21.948 54.7353 22.092 54.8633 22.124C55.0553 22.188 55.0393 22.956 54.8153 23.116H47.7913C47.4393 23.116 46.8473 23.292 46.5753 23.292ZM64.3372 31.82C64.1292 31.5 64.0012 30.86 63.9852 30.3L63.9052 24.412C63.9052 24.252 63.8732 24.188 63.7932 24.14L63.2492 23.772C63.2812 23.516 63.4732 23.26 63.6172 23.26C63.9052 23.26 64.7212 23.34 65.0892 23.452C65.3292 23.516 65.4092 23.612 65.4092 23.756C65.4092 23.852 65.3772 24.108 65.3772 24.284V26.236H69.1372V24.012C69.1372 23.852 69.1212 23.772 69.0252 23.708L68.3692 23.212C68.3852 22.956 68.5932 22.684 68.7372 22.684C69.1052 22.684 69.9372 22.876 70.3212 23.004C70.5452 23.068 70.6412 23.164 70.6412 23.308C70.6412 23.452 70.6092 23.66 70.6092 23.836L70.5612 30.188C70.5612 30.604 70.4492 30.908 70.1612 31.164H65.3132C65.2332 31.372 65.0252 31.724 64.8972 31.82H64.3372ZM73.4092 36.412C73.2492 36.108 73.1052 35.116 73.1052 34.236V22.636C73.1052 22.428 72.9932 22.316 72.8812 22.22L72.0012 21.516C72.0492 21.244 72.2252 20.94 72.3692 20.94C72.7692 20.94 74.0012 21.26 74.4172 21.436C74.5932 21.516 74.6412 21.596 74.6412 21.772C74.6412 21.932 74.5932 22.396 74.5932 22.652L74.5772 27.164H74.7852C75.4252 27.164 76.0652 26.828 76.3852 26.828C76.7852 26.828 77.3932 26.924 77.5532 27.052C77.7292 27.164 77.7132 27.82 77.5532 28.092H74.5772L74.5612 33.724C74.5612 34.828 74.2412 36.076 74.0012 36.412H73.4092ZM65.3772 30.204H69.1372V27.196H65.3772V30.204ZM82.5568 30.06C81.6128 30.06 81.1968 29.468 81.1968 28.892L81.1808 27.02C81.1808 26.684 80.7328 26.476 80.5728 26.396C80.6208 26.204 80.7328 25.804 80.8768 25.804C81.1328 25.804 82.0448 25.884 82.6848 25.884H88.3168L88.3488 23.66H83.4208C82.9248 23.66 82.4928 23.852 82.2208 23.852C81.9328 23.852 81.0528 23.468 80.5888 23.244C80.6048 22.988 80.7488 22.572 80.9088 22.588C81.4208 22.62 82.5888 22.684 83.4208 22.684H87.4848C87.8368 22.684 88.3328 22.54 88.4768 22.54C88.6848 22.54 89.3408 22.604 89.6768 22.668C89.9168 22.716 90.0128 22.924 89.9968 23.116L89.6288 25.948C89.8208 26.012 89.9168 26.14 89.9168 26.332C89.9168 26.588 89.7728 26.764 89.4688 26.764H82.6848V28.572C82.6848 28.892 82.8928 29.1 83.2768 29.1H87.4688C88.1088 29.1 88.8288 28.876 89.0688 28.876C89.5968 28.876 90.2688 28.956 90.4288 29.068C90.6528 29.212 90.6208 29.788 90.4128 30.06H86.3648L86.3328 31.452C86.3328 31.74 86.2688 32.38 86.2048 32.812H89.5168C90.1888 32.812 90.8448 32.524 91.1648 32.524C91.6448 32.524 92.6048 32.7 92.7168 32.86C92.8608 33.1 92.7968 33.644 92.6688 33.82H81.9328C81.4528 33.82 80.4928 34.076 80.3328 34.076C80.0128 34.076 78.8768 33.628 78.3168 33.308C78.3168 33.068 78.4128 32.652 78.5728 32.652C78.8928 32.652 80.5728 32.812 81.9328 32.812H84.9248C84.8928 32.46 84.8768 31.996 84.8768 31.708V30.06H82.5568ZM102.911 28.7C100.719 28.7 99.2787 27.356 99.2787 25.5C99.2787 23.628 100.719 22.3 102.911 22.3C105.103 22.3 106.543 23.628 106.543 25.5C106.543 27.356 105.103 28.7 102.911 28.7ZM102.911 27.628C104.223 27.628 105.167 26.764 105.167 25.5C105.167 24.22 104.223 23.372 102.911 23.372C101.615 23.372 100.671 24.22 100.671 25.5C100.671 26.764 101.615 27.628 102.911 27.628ZM109.519 29.292C109.359 28.988 109.263 28.124 109.263 27.244V22.636C109.263 22.428 109.151 22.316 109.039 22.22L108.159 21.516C108.191 21.26 108.383 20.94 108.527 20.94C108.927 20.94 110.159 21.26 110.575 21.436C110.751 21.516 110.799 21.596 110.799 21.772C110.799 21.932 110.751 22.396 110.751 22.652L110.719 26.732C110.703 27.788 110.447 28.956 110.207 29.292H109.519ZM110.575 34.204C110.559 35.068 110.335 36.076 110.095 36.412H109.503C109.343 36.108 109.199 35.196 109.199 34.556V31.18H108.047C107.807 31.18 107.455 31.26 107.295 31.26C107.055 31.26 106.255 30.764 106.175 30.7C106.175 30.588 106.255 30.204 106.335 30.204C106.447 30.204 107.535 30.252 107.887 30.252H108.879C109.087 30.252 109.503 30.124 109.647 30.124C109.775 30.124 110.239 30.188 110.367 30.204C110.495 30.236 110.639 30.332 110.639 30.492C110.639 30.7 110.607 30.94 110.607 31.068L110.575 34.204ZM102.607 36.252C102.207 36.252 101.439 35.484 101.439 35.244V33.532C101.439 33.468 101.439 33.404 101.391 33.356C101.295 33.26 101.071 33.116 100.959 33.052C100.959 32.972 101.023 32.572 101.167 32.572C101.391 32.572 102.367 32.62 102.607 32.62H104.399C104.415 32.284 104.431 31.548 104.431 31.212H103.039C102.671 31.212 102.399 31.292 102.143 31.292C101.919 31.292 101.279 30.908 100.959 30.732C100.959 30.46 101.071 30.204 101.167 30.204C101.423 30.204 102.287 30.284 103.039 30.284H103.999C104.271 30.284 104.687 30.188 104.831 30.188C104.991 30.188 105.407 30.252 105.551 30.268C105.679 30.3 105.807 30.38 105.807 30.524C105.807 30.668 105.647 31.676 105.567 32.268C105.551 32.364 105.439 32.572 105.407 32.636C105.647 32.684 105.759 32.828 105.743 33.036C105.743 33.244 105.583 33.42 105.311 33.42H102.767V35.052C103.647 35.068 105.663 34.78 106.623 34.444C106.799 34.476 106.943 35.052 106.735 35.212C105.935 35.58 103.327 36.252 102.607 36.252ZM114.762 32.524C114.458 32.428 113.914 32.044 114.25 31.9C116.73 30.844 119.434 27.66 120.57 24.428H117.546C117.242 24.428 116.618 24.604 116.49 24.604C116.202 24.604 115.066 24.124 114.858 23.996C114.858 23.708 114.954 23.34 115.066 23.34C115.146 23.34 116.554 23.436 117.21 23.436H120.298C120.618 23.436 121.082 23.276 121.258 23.276C121.482 23.276 121.946 23.356 122.09 23.388C122.298 23.436 122.458 23.548 122.458 23.724C122.458 23.836 122.378 24.028 122.33 24.204C121.178 27.9 117.85 31.644 114.762 32.524ZM125.082 36.412C124.922 36.108 124.778 35.116 124.778 34.236V22.636C124.778 22.428 124.666 22.316 124.554 22.22L123.674 21.516C123.722 21.244 123.898 20.94 124.042 20.94C124.442 20.94 125.674 21.26 126.09 21.436C126.266 21.516 126.314 21.596 126.314 21.772C126.314 21.932 126.266 22.396 126.266 22.652L126.234 33.724C126.234 34.828 125.914 36.076 125.674 36.412H125.082Z"
                      fill="white"
                    />
                    <path
                      d="M146.5 23.0825V36.0903"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M155.505 23.0825L155.505 36.0903"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M137.494 23.0825L137.494 36.0903"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M155.505 36.0901C155.505 36.0901 154.505 34.0889 151.002 34.0889C147.5 34.0889 146.5 36.0901 146.5 36.0901"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M146.5 36.0901C146.5 36.0901 145.499 34.0889 141.997 34.0889C138.495 34.0889 137.494 36.0901 137.494 36.0901"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M155.505 23.0827C155.505 23.0827 154.505 21.0815 151.002 21.0815C147.5 21.0815 146.5 23.0827 146.5 23.0827"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                    <path
                      d="M146.5 23.0827C146.5 23.0827 145.499 21.0815 141.997 21.0815C138.495 21.0815 137.494 23.0827 137.494 23.0827"
                      stroke="white"
                      stroke-width="1.64"
                      stroke-linecap="round"
                    />
                  </svg>
                </WorkSentenceOverlayLink>
                <WorkSentence>{workData.sentence}</WorkSentence>
              </WorkSentenceOverlay>
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
              <br />
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
            <br />
            <br />
            <br />
          </MobileWorkButtons>
        </Mobile>
      </BookInfoContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Novel Viewer"
        style={{
          overlay: {
            zIndex: '3',
          },
          content: {
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: '0',
            padding: '0',
            border: 'none',
            background: 'white',
            overflow: 'auto', // 모달 안의 콘텐츠가 넘칠 때 스크롤이 생기도록
          },
        }}
      >
        <NovelViewer
          novelHTML={novel}
          title={workData.title}
          closeModal={closeModal}
        />
      </Modal>
      <MobileNovelViewer isOpen={novelModalIsOpen} novelHTML={novel} />
      <Comments id={workData.id} />
    </>
  );
};

export default WorkInfo;

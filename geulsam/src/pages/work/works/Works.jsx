import React, { useEffect, useState } from 'react';
import { BookButtons, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle } from '../../../style/StyledComponent';
import { normalAPI } from '../../../apis/Api';
import PDFDownload from '../../../components/Download/PDFDownload';
import CopyURL from '../../../components/CopyURL/CopyURL';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Paging/Pagination';
import { WorkButtons, WorkInfo, WorkLink, WorkTopBorder } from '../../../style/Works';

const Works = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [workList, setWorkList] = useState([])

    const getWorkData = async () => {
        try {
            const response = await normalAPI.get(`/content?page=${page}`)
            console.log(response)
            setWorkList(response.data.data.content)
            setTotalPage(response.data.data.pageTotal)

        } catch (err) {
            console.err(err)
        }

    }

    useEffect(() => {
        getWorkData()
        console.log(workList)
    }, [page])

    return (
        <div>
            <BookInfoContainer>
                <WorkTopBorder />
                <BookInfoAndButton>
                    <BookInfoContents>
                        {
                            workList?.map((work) => (
                                <div key={work.id}>
                                    <WorkLink to={`/work/${work.contentId}`}>
                                        <WorkInfo>
                                            <div>
                                                {work.type}
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {work.title}
                                            </div>
                                            <div>
                                                {work.author}
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {work.createdAt}
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                            </div>
                                        </WorkInfo>
                                    </WorkLink>
                                </div>
                            ))
                        }
                    </BookInfoContents>
                    <WorkButtons>
                        <br />
                        <br />
                        <CopyURL />
                    </WorkButtons>
                </BookInfoAndButton>
            </BookInfoContainer >
            <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
        </div>
    );
};

export default Works;
import React, { useEffect, useState } from 'react';
import { BookButtons, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle } from '../../../style/StyledComponent';
import { normalAPI } from '../../../apis/Api';
import PDFDownload from '../../../components/Download/PDFDownload';
import CopyURL from '../../../components/CopyURL/CopyURL';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Paging/Pagination';

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
    }, [])

    return (
        <BookInfoContainer>
            <BookTitle>
            </BookTitle>
            <BookInfoAndButton>
                <BookInfoContents>
                    {
                        workList.map((work) => (
                            <div key={work.id}>
                                <BookInfos>
                                    <Link to={`/work/${work.contentId}`}>
                                        {work.type} {work.title} {work.author} {work.createdAt}
                                    </Link>
                                </BookInfos>
                            </div>
                        ))
                    }
                    <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
                </BookInfoContents>
                <BookButtons>
                    <br />
                    <br />
                    <CopyURL />
                </BookButtons>
            </BookInfoAndButton>

        </BookInfoContainer>
    );
};

export default Works;
import { Link } from "react-router-dom";

const LinkToAward = (awards) => {
    return (
        <>
            {awards && awards.length > 0 ?
                <ul>
                    {awards.map(award => (
                        <li key={award.create_date}>
                            <Link to={`/award/${award.create_date}`}>{award.create_date}</Link>
                        </li>
                    ))}
                </ul> :
                (<> 상 정보가 없습니다.</>)}
        </>
    );
};

export default LinkToAward;
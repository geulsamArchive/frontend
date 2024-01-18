import { Link } from "react-router-dom";

export const LinkToCriticism = ({ criticisms }) => (
    <>
        {criticisms && criticisms.length > 0 ? (
            <ul>
                {criticisms.map(criticism => (
                    <li key={criticism.id}>
                        <Link to={`/criticism/${criticism.id}`}>{criticism.at}</Link>
                    </li>
                ))}
            </ul>
        ) :
            (<>협평회 정보가 없습니다.</>)
        }
    </>
);

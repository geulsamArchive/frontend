import { Link } from "react-router-dom";

export const LinkToAuthor = ({ authors }) => (
    <>
        {authors && authors.length > 0 ? (
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        <Link to={`/author/${author.id}`}>{author.title}</Link>
                    </li>
                ))}
            </ul>
        ) :
            (<>작가 정보가 없습니다.</>)
        }
    </>
);

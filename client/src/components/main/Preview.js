import styled from "styled-components";
import { Link } from "react-router-dom";

const Preview = ({ tags, title, content, writer, boardId }) => {
    const tagArray = tags && tags.length === 0 ? null : (tags || "").split(",");
    if (tagArray.length > 3) {
        tagArray.splice(3);
    }

    return (
        <Post>
            <div className="tagContainer">
                {tagArray[0] === "" ? (
                    <div className="tag">미지정</div>
                ) : (
                    tagArray.map((tag, index) => (
                        <div className="tag" key={index}>
                            {tag}
                        </div>
                    ))
                )}
            </div>
            <div className="title">{title}</div>
            <div className="content">
                {content.slice(0, 63)}
                {content.length > 62 ? "..." : null}
            </div>
            <div className="writerContainer">
                <span className="circle"></span>
                <span className="writer">{writer}</span>
                <span className="writerTxt">&nbsp;님</span>
            </div>
            <Link to={`/community/${boardId}`}>
                <button>보러가기</button>
            </Link>
        </Post>
    );
};

export default Preview;

const Post = styled.div`
    background-color: var(--lightgreen2);
    width: 276px;
    height: 290px;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .tagContainer {
        display: flex;
    }
    .tag {
        background-color: var(--white);
        border-radius: 10px;
        width: 65px;
        padding: 5px;
        color: var(--green);
        text-align: center;
        font-size: var(--font-body-size);
        margin-right: 3%;
    }

    .title {
        padding-top: 15px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        line-height: 120%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        word-wrap: break-word;
        word-break: break-all;
    }

    .content {
        padding-top: 15px;
        font-size: 13px;
        height: 120px;
        line-height: 20px;
        color: var(--darkgreen);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;

        word-wrap: break-word;
        word-break: break-all;
    }

    .writerContainer {
        padding-bottom: 12px;
        display: flex;
        justify-content: right;

        .circle {
            background-color: var(--green);
            width: 12px;
            border-radius: 50%;
            margin-right: 5px;
        }
        .writer {
            font-size: var(--font-body-size);
            color: var(--darkgreen);
            font-weight: var(--font-bold);
        }
        .writerTxt {
            font-size: var(--font-body-size);
            color: var(--darkgreen);
        }
    }
    button {
        width: 100%;
    }
`;

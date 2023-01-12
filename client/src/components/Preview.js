import styled from "styled-components";
import "../globalStyle.css";

const Post = styled.div`
    background-color: var(--lightgreen2);
    width: 276px;
    height: 268px;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;

    .tag {
        background-color: var(--white);
        border-radius: 10px;
        width: 65px;
        padding: 5px;
        color: var(--green);
        text-align: center;
        font-size: var(--font-body-size);
    }

    .title {
        padding-top: 10px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
    }

    .content {
        padding-top: 15px;
        font-size: 13px;
        height: 120px;
        line-height: 20px;
        color: var(--darkgreen);
    }

    .writerContainer {
        padding-bottom: 8px;
        margin-left: 78%;
        /* .img {
            border: 1px solid;
            width: 17px;
            border-radius: 50%;
        } */
        .writer {
            font-size: var(--font-body-size);
        }
    }
`;

const Preview = ({ tag, title, content, writer }) => {
    return (
        <Post>
            <div className="tag">{tag}</div>
            <div className="title">{title}</div>
            <div className="content">{content.slice(0, 63)}... </div>
            <div className="writerContainer">
                <span className="img"></span>
                <span className="writer">{writer} 님</span>
            </div>
            <button>보러가기</button>
        </Post>
    );
};

export default Preview;

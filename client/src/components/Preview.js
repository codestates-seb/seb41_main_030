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
        /* font-size: 16px; */
        padding-top: 10px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
    }

    .content {
        padding-top: 15px;
        /* font-size: var(--font-body-size); */
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

const Preview = () => {
    return (
        <Post>
            <div className="tag">태그</div>
            <div className="title">게시글 제목</div>
            <div className="content">비오는 날이면 .... 기분이 울적해지고 아무것도 하고 싶지 않아서 너무 고민이예요. 이런날은 어떻게 해야할까요? </div>
            <div className="writerContainer">
                <span className="img"></span>
                <span className="writer">김코딩 님</span>
            </div>
            <button>보러가기</button>
        </Post>
    );
};

export default Preview;

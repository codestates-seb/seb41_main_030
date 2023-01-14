import styled from "styled-components";

const PostsContainer = styled.div`
    width: 100%;
    height: 170px;
    border-radius: 10px;
    background-color: #f1efe4;
    margin-top: 20px;
    padding: 40px;

    @media screen and (max-width: 1637px) {
        height: 187px;
    }

    @media screen and (max-width: 989px) {
        height: 210px;
    }

    @media screen and (max-width: 777px) {
        height: 232px;
    }

    @media screen and (max-width: 669px) {
        height: 252px;
    }

    @media screen and (max-width: 658px) {
        height: 280px;
    }

    @media screen and (max-width: 604px) {
        height: 270px;
    }

    @media screen and (max-width: 576px) {
        height: 160px;
    }
`;

const Post = styled.div`
    .postTitle {
        color: var(--darkgreen);
        font-size: 22px;
        font-weight: var(--font-bold);
        line-height: 27px;
    }
    .postContent {
        color: var(--darkgreen);
        font-size: 14px;
        padding-top: 15px;
        line-height: 20px;

        @media screen and (max-width: 576px) {
            display: none;
        }
    }

    .postInfo {
        color: var(--darkgreen);
        font-size: 13px;
        padding-top: 28px;
        .postCreatedAt {
            padding-right: 30px;
        }

        @media screen and (max-width: 576px) {
            padding-top: 35px;
        }

        @media screen and (max-width: 503px) {
            display: none;
        }
    }
`;

const UserPost = ({ title, content, createdAt, answerCount }) => {
    return (
        <>
            <PostsContainer>
                <Post>
                    <p className="postTitle">{title}</p>
                    <p className="postContent">{content} ...</p>
                    <div className="postInfo">
                        <span className="postCreatedAt">{createdAt}</span>
                        {answerCount ? <span className="answerCount">답변 수 2</span> : null}
                    </div>
                </Post>
            </PostsContainer>
        </>
    );
};

export default UserPost;

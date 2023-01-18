import styled from "styled-components";

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

const PostsContainer = styled.div`
    width: 100%;
    height: 190px;
    border-radius: 10px;
    background-color: #f1efe4;
    margin-top: 20px;
    padding: 40px;

    /* @media screen and (max-width: 1637px) {
        height: 197px;
    } */

    @media screen and (max-width: 1087px) {
        height: 212px;
    }
    /* @media screen and (max-width: 989px) {
        height: 210px;
    } */

    @media screen and (max-width: 842px) {
        height: 232px;
    }

    /* @media screen and (max-width: 777px) {
        height: 232px;
    } */

    @media screen and (max-width: 724px) {
        height: 250px;
    }

    @media screen and (max-width: 669px) {
        height: 252px;
    }

    /* @media screen and (max-width: 658px) {
        height: 280px;
    } */

    /* @media screen and (max-width: 651px) {
        height: 255px;
    } */

    /* @media screen and (max-width: 604px) {
        height: 270px;
    } */

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
        @media screen and (max-width: 619px) {
            font-size: 20px;
        }
    }
    .postContent {
        color: var(--darkgreen);
        font-size: 14px;
        padding-top: 15px;
        line-height: 20px;
        height: 55px;

        @media screen and (max-width: 1087px) {
            height: 77px;
        }
        @media screen and (max-width: 842px) {
            height: 99px;
        }
        @media screen and (max-width: 724px) {
            height: 110px;
        }

        /* @media screen and (max-width: 669px) {
            height: 123px;
        } */
        @media screen and (max-width: 619px) {
            font-size: 13px;
            height: 120px;
        }

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
            padding-top: 53px;
        }

        @media screen and (max-width: 535px) {
            padding-top: 25px;
        }

        @media screen and (max-width: 503px) {
            display: none;
        }
    }
`;

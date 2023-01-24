import styled from "styled-components";

const UserPost = ({ title, content, createdAt, isComment, commentCount }) => {
    const date = createdAt.slice(0, 10).replaceAll("-", " / ");

    return (
        <>
            <PostsContainer>
                <Post>
                    <p className="postTitle">{title}</p>
                    <p className="postContent">
                        {content.slice(0, 150)} {content.length > 149 ? "..." : null}
                    </p>
                    <div className="postInfo">
                        <span className="postCreatedAt">{date}</span>
                        {isComment ? <span className="answerCount">답변 수 {commentCount}</span> : null}
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

    @media screen and (max-width: 1120px) {
        height: 210px;
    }

    @media screen and (max-width: 1087px) {
        height: 212px;
    }

    @media screen and (max-width: 866px) {
        height: 232px;
    }

    @media screen and (max-width: 742px) {
        height: 250px;
    }

    @media screen and (max-width: 665px) {
        height: 262px;
    }

    @media screen and (max-width: 576px) {
        height: 160px;
    }
`;

const Post = styled.div`
    .postTitle {
        color: var(--darkgreen);
        font-size: 21px;
        font-weight: var(--font-bold);
        line-height: 27px;
        @media screen and (max-width: 619px) {
            font-size: 20px;
        }
    }
    .postContent {
        color: var(--darkgreen);
        font-size: 13px;
        padding-top: 15px;
        line-height: 20px;
        height: 55px;

        @media screen and (max-width: 1120px) {
            height: 70px;
        }
        @media screen and (max-width: 1087px) {
            height: 77px;
        }
        @media screen and (max-width: 866px) {
            height: 99px;
        }
        @media screen and (max-width: 742px) {
            height: 110px;
        }
        @media screen and (max-width: 665px) {
            height: 128px;
        }
        @media screen and (max-width: 619px) {
            font-size: 12px;
            /* height: 90px; */
        }
        @media screen and (max-width: 576px) {
            display: none;
        }
    }

    .postInfo {
        color: var(--darkgreen);
        font-size: 12px;
        padding-top: 28px;
        .postCreatedAt {
            padding-right: 30px;
        }

        @media screen and (max-width: 576px) {
            padding-top: 53px;
        }

        /* @media screen and (max-width: 535px) {
            padding-top: 25px;
        } */

        @media screen and (max-width: 503px) {
            display: none;
        }
    }
`;

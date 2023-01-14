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

const UserPost = ({ title }) => {
    return (
        <>
            <PostsContainer>
                <Post>
                    <p className="postTitle">{title}</p>
                    <p className="postContent">
                        안녕하세요, 저는 19살 수험생입니다. 최근 수험과 관련한 스트레스가 심해서 정신과를 방문해야하나 생각하다가도 원래 수험 생활이 이렇게 힘든건데 유난인 건지 생각되어 미루고 수험
                        생활이 이렇게 힘든건데 유난인 건지 생각되어 미루고 ...
                    </p>
                    <div className="postInfo">
                        <span className="postCreatedAt">2023 / 01 / 06</span>
                        <span className="answerCount">답변 수 2</span>
                    </div>
                </Post>
            </PostsContainer>
        </>
    );
};

export default UserPost;

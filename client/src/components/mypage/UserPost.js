import styled from "styled-components";

const PostsContainer = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 10px;
    background-color: #f1efe4;
    margin-top: 20px;
    padding: 40px;
`;

const Post = styled.div`
    .postTitle {
        color: var(--darkgreen);
        font-size: 22px;
        font-weight: var(--font-bold);
    }
    .postContent {
        color: var(--darkgreen);
        font-size: 14px;
        padding-top: 15px;
        padding-bottom: 45px;
    }

    .postInfo {
        color: var(--darkgreen);
        font-size: 13px;
        .postCreatedAt {
            padding-right: 30px;
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
                        안녕하세요, 저는 19살 수험생입니다. 최근 수험과 관련한 스트레스가 심해서 정신과를 방문해야하나 생각하다가도 원래 수험 생활이 이렇게 힘든건데 유난인 건지 생각되어 미루고 ...
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

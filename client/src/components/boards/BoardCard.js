import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { questionImgState } from "../../states";

const BoardCard = ({ post, idx }) => {
    const tagArray = post.tags && post.tags === "" ? [""] : (post.tags || "").split(",");
    const imgUrl = useRecoilValue(questionImgState);

    return (
        <>
            <BoardsTitle>{post.title}</BoardsTitle>
            <BoardsTagWrapper>{tagArray[0] === "" ? null : tagArray.map((tag, idx) => <BoardsTag key={idx + 100}>{tag}</BoardsTag>)}</BoardsTagWrapper>
            <BoardsContent>{post.content}</BoardsContent>
            <BoardsInfo>
                {post.voteCount === 0 ? <div>♡ 공감해주세요</div> : <div>♡ {post.voteCount}명이 공감</div>}
                <BoardsInfoUser>
                    <div className="imgWrapper">
                        <img src={imgUrl.imgList[idx]} alt="댓글 작성자의 프로필 사진" className={imgUrl.fail ? "failImg" : "profileImg"} />
                    </div>
                    <div>{post.nickName}</div>
                </BoardsInfoUser>
            </BoardsInfo>
        </>
    );
};

export default BoardCard;

const BoardsTitle = styled.div`
    color: var(--darkgreen);
    font-size: 1.15rem;
    font-weight: var(--font-bold);
    margin-bottom: 12px;

    // 줄넘침
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    // 영어
    word-wrap: break-word;
    word-break: break-all;

    @media screen and (max-width: 319px) {
        font-size: 1rem;
    }
`;

const BoardsTagWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 12px;
`;

const BoardsTag = styled.li`
    width: fit-content;
    padding: 5px 8px;

    border-radius: 15px;
    background-color: var(--lightgreen);
    color: white;
    font-size: 0.75rem;

    @media screen and (max-width: 319px) {
        padding: 3px;
        font-size: 0.5rem;
    }
`;

const BoardsContent = styled.div`
    margin-bottom: 20px;

    color: var(--darkgreen);
    font-size: 0.95rem;

    line-height: 1.1rem;

    // 줄넘침
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    // 영어
    word-wrap: break-word;
    word-break: break-all;

    @media screen and (max-width: 319px) {
        font-size: 0.8rem;
    }
`;

const BoardsInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 0.8rem;
    color: var(--darkgreen);

    @media screen and (max-width: 319px) {
        font-size: 0.7rem;
        gap: 2px;
    }
`;

const BoardsInfoUser = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    .imgWrapper {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--green);

        @media screen and (max-width: 319px) {
            display: none;
        }
    }

    .failImg {
        display: none;
    }

    .profileImg {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
`;

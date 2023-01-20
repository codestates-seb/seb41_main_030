import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardState } from "../../states/";
import { dateCalculation } from "./dateCalculation";

// component
const BoardDetailQuestion = () => {
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const navigate = useNavigate();
    const [board, setBoard] = useRecoilState(boardState);

    // 질문 삭제
    const deleteQuestion = () => {
        axios.delete(`${url}/boards/${board.boardId}`).then((res) => {
            navigate("/community");
            setBoard(null);
        });
    };

    return (
        <BDQWrapper>
            {board && (
                <>
                    {/* <BDQTagsWrapper>
                        {board.tag.map((tag, idx) => (
                            <div key={idx} className="questionTags">
                                {tag}
                            </div>
                        ))}
                    </BDQTagsWrapper> */}

                    <BDQHeader>
                        <BDQTitle>{board.title}</BDQTitle>
                        <BDQInfo>
                            <BDQInfoProfile></BDQInfoProfile>
                            <BDQInfoWriterInfo>
                                <div className="BDQInfoWriterInfoName">{board.nickName}</div>
                                <div className="BDQInfoWriterInfoTime">
                                    <i className="fa-regular fa-clock"></i>
                                    <div>{dateCalculation(new Date(board.createdAt))}</div>
                                </div>
                            </BDQInfoWriterInfo>
                        </BDQInfo>

                        <BDQEditBtn>
                            <Link to="/community/edit">
                                <button type="button">편집</button>
                            </Link>

                            <button type="button" onClick={deleteQuestion}>
                                삭제
                            </button>
                        </BDQEditBtn>
                    </BDQHeader>

                    <BDQMain>
                        <div>{board.content}</div>
                    </BDQMain>

                    <BDQResponseInfo>
                        <div>{board.voteCount}명 공감</div>
                        <div>댓글 {board.commentCount}개</div>
                    </BDQResponseInfo>
                </>
            )}
        </BDQWrapper>
    );
};

// styled components
const BDQWrapper = styled.div`
    padding: 40px;
    width: 80%;
    max-width: 1300px;

    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;
    }
`;

// ------------- tag ------------- //
const BDQTagsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 25px;

    .questionTags {
        width: fit-content;
        padding: 8px 15px;
        border-radius: 20px;
        background-color: var(--lightgreen2);
        color: var(--darkgreen);

        font-size: 14px;
        font-weight: 500;
    }

    @media screen and (max-width: 597px) {
        flex-wrap: wrap;
        gap: 2px;

        .questionTags {
            padding: 5px 7px;
            font-size: 11px;
            margin-bottom: 2px;
        }
    }

    @media screen and (min-width: 598px) and (max-width: 935px) {
        gap: 5px;

        .boardDetailTags {
            padding: 5px 10px;
            font-size: 12px;
        }
    }
`;

// ------------- header  ------------- //
const BDQHeader = styled.div``;

const BDQTitle = styled.div`
    font-size: 35px;
    font-weight: 700;
    color: var(--darkgreen);
    margin-bottom: 40px;

    @media screen and (max-width: 768px) {
        font-size: 23px;
        margin-bottom: 25px;
    }
`;

const BDQInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

const BDQInfoProfile = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--green);

    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const BDQInfoWriterInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    .BDQInfoWriterInfoName {
        color: var(--darkgreen);
        font-size: 20px;
        font-weight: 700;
    }

    .BDQInfoWriterInfoTime {
        color: var(--green);
        font-size: 15px;

        display: flex;
        gap: 5px;

        & :nth-child(2) {
            margin-top: 1px;
        }
    }

    @media screen and (max-width: 768px) {
        gap: 5px;

        .BDQInfoWriterInfoName {
            font-size: 14px;
        }

        .BDQInfoWriterInfoTime {
            font-size: 12px;
        }
    }
`;

const BDQEditBtn = styled.div`
    padding: 5px 0px 15px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--green);

    button {
        padding: 0 5px;
        background-color: white;
        color: var(--green);

        font-size: 16px;
        font-weight: 500;
    }

    button:hover {
        font-weight: 900;
    }

    @media screen and (max-width: 768px) {
        padding: 0 0 2px;
        button {
            font-size: 12px;
        }
    }
`;

// ------------- main  ------------- //
const BDQMain = styled.div`
    width: 100%;
    margin: 30px 0;
    color: var(--darkgreen);
    font-size: 16px;

    div {
        line-height: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px 0;

        div {
            font-size: 14px;
        }
    }
`;

// ------------- ResponseInfo  ------------- //
const BDQResponseInfo = styled.div`
    border-top: 1px solid var(--darkgreen);
    padding: 15px 0 0;

    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--darkgreen);
    font-size: 14px;
`;

export default BoardDetailQuestion;

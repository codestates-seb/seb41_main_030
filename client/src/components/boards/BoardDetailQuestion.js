import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardState } from "../../states/";

// component
const BoardDetailQuestion = () => {
    const [board, setBoard] = useRecoilState(boardState);
    const navigate = useNavigate();

    // ! 질문 삭제 -> 서버 열리면 코드 수정 예정
    const deleteQuestion = () => {
        axios.delete(`http://localhost:3001/boards/${board.id}`).then((res) => {
            navigate("/community");
            setBoard(null);
        });
    };

    return (
        <BDQuestionWrapper>
            {board && (
                <>
                    <BDQuestionTagsWrapper>
                        {board.tag.map((tag, idx) => (
                            <div key={idx} className="questionTags">
                                {tag}
                            </div>
                        ))}
                    </BDQuestionTagsWrapper>

                    <BDQuestionHeader>
                        <div className="questionHeaderTitle">{board.title}</div>
                        <BDQuestionHeaderInfo>
                            <div className="questionProfile"></div>
                            <div className="questionWriteInfo">
                                <div className="questionWriter">{board.BoardWriterId}</div>
                                <div className="questionCreateAt">{board.createdAt}</div>
                            </div>
                        </BDQuestionHeaderInfo>

                        <BDQuestionHeaderEditBtn>
                            <Link to="/community/edit">
                                <button type="button">편집</button>
                            </Link>

                            <button type="button" onClick={deleteQuestion}>
                                삭제
                            </button>
                        </BDQuestionHeaderEditBtn>
                    </BDQuestionHeader>

                    <BDQuestionMain>
                        <div>{board.content}</div>
                    </BDQuestionMain>
                </>
            )}
        </BDQuestionWrapper>
    );
};

// styled components
const BDQuestionWrapper = styled.div`
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

const BDQuestionTagsWrapper = styled.div`
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

const BDQuestionHeader = styled.div`
    .questionHeaderTitle {
        font-size: 35px;
        font-weight: 700;
        color: var(--darkgreen);
        margin-bottom: 40px;
    }

    @media screen and (max-width: 768px) {
        .questionHeaderTitle {
            font-size: 23px;
            margin-bottom: 25px;
        }
    }
`;

const BDQuestionHeaderInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    .questionProfile {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--green);
    }

    .questionWriteInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & :nth-child(1) {
            color: var(--darkgreen);
            font-size: 20px;
            font-weight: 700;
        }

        & :nth-child(2) {
            color: var(--green);
            font-size: 15px;
        }
    }

    @media screen and (max-width: 768px) {
        .questionProfile {
            width: 30px;
            height: 30px;
        }

        .questionWriteInfo {
            gap: 5px;

            & :nth-child(1) {
                font-size: 14px;
            }

            & :nth-child(2) {
                color: var(--green);
                font-size: 12px;
            }
        }
    }
`;

const BDQuestionHeaderEditBtn = styled.div`
    padding: 0 0 8px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--green);

    button {
        padding: 5px;
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

const BDQuestionMain = styled.div`
    width: 100%;
    margin: 35px 0;
    color: var(--darkgreen);
    font-size: 16px;

    div {
        line-height: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px 0 0;

        div {
            font-size: 14px;
        }
    }
`;

export default BoardDetailQuestion;

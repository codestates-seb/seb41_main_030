import styled from "styled-components";

// styled components
const BoardDetailQuestionWrapper = styled.div`
    padding: 40px;
    width: 80%;
    max-width: 1300px;

    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
`;

const BoardDetailQuestionHeader = styled.div`
    .boardDetailQuestionHeaderTitle {
        font-size: 35px;
        font-weight: 700;
        color: var(--darkgreen);
        margin-bottom: 40px;
    }
`;

const BoardDetailQuestionHeaderInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    .questionProfile {
        width: 70px;
        height: 70px;
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
`;

const BoardDetailQuestionHeaderEditBtns = styled.div`
    padding: 0 0 8px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--green);

    button {
        padding: 5px;
        background-color: white;
        color: var(--darkgreen);

        font-size: 17px;
        font-weight: 500;
    }

    button:hover {
        font-weight: 700;
        background-color: rgba(166, 187, 141, 0.4);
        border-radius: 25px;
    }
`;

const BoardDetailQuestionMain = styled.div`
    width: 100%;
    margin: 30px 0;

    line-height: 20px;
    white-space: pre-wrap;
`;
const BoardDetailQuestionBtns = styled.div``;

const BoardDetailQuestion = ({ board, setBoard }) => {
    return (
        <BoardDetailQuestionWrapper>
            {board && (
                <>
                    <BoardDetailQuestionHeader>
                        <div className="boardDetailQuestionHeaderTitle">{board.title}</div>
                        <BoardDetailQuestionHeaderInfo>
                            <div className="questionProfile"></div>
                            <div className="questionWriteInfo">
                                <div className="questionWriter">{board.BoardWriterId}</div>
                                <div className="questionCreateAt">{board.createdAt}</div>
                            </div>
                        </BoardDetailQuestionHeaderInfo>

                        <BoardDetailQuestionHeaderEditBtns>
                            <button type="button">편집</button>
                            <button type="button">삭제</button>
                        </BoardDetailQuestionHeaderEditBtns>
                    </BoardDetailQuestionHeader>

                    <BoardDetailQuestionMain>{board.content}</BoardDetailQuestionMain>

                    <BoardDetailQuestionBtns>
                        <div className="tags"></div>
                        <button>질문 작성하기</button>
                    </BoardDetailQuestionBtns>
                </>
            )}
        </BoardDetailQuestionWrapper>
    );
};

export default BoardDetailQuestion;

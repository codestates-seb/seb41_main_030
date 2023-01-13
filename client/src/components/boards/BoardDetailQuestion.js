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

const BoardDetailQuestionTags = styled.div`
    display: flex;
    gap: 10px;

    .test {
        width: fit-content;
        padding: 8px 15px;
        margin-bottom: 20px;
        border-radius: 20px;
        background-color: var(--lightgreen2);
        color: var(--darkgreen);

        font-size: 14px;
        font-weight: 500;
    }
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
        color: var(--green);

        font-size: 17px;
        font-weight: 500;
    }

    button:hover {
        font-weight: 900;
    }
`;

const BoardDetailQuestionMain = styled.div`
    width: 100%;
    margin: 35px 0;

    line-height: 20px;
    white-space: pre-wrap;
    color: var(--darkgreen);
`;

// component
const BoardDetailQuestion = ({ board, setBoard }) => {
    return (
        <BoardDetailQuestionWrapper>
            {board && (
                <>
                    <BoardDetailQuestionTags>
                        {board.tag.map((tag, idx) => (
                            <div key={idx} className="test">
                                {tag}
                            </div>
                        ))}
                    </BoardDetailQuestionTags>

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
                </>
            )}
        </BoardDetailQuestionWrapper>
    );
};

export default BoardDetailQuestion;

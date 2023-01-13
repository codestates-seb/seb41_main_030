import styled from "styled-components";

const BoardDetailQuestionWrapper = styled.div``;
const BoardDetailQuestionHeader = styled.div``;
const BoardDetailQuestionMain = styled.div``;
const BoardDetailQuestionBtns = styled.div``;

const BoardDetailQuestion = ({ board, setBoard }) => {
    return (
        <BoardDetailQuestionWrapper>
            {board && (
                <>
                    <BoardDetailQuestionHeader>
                        <div className="questionTitle">{board.title}</div>
                        <div>
                            <div className="questionProfile"></div>
                            <div className="questionInfo">
                                <div className="questionWriter">{board.BoardWriterId}</div>
                                <div className="questionCreateAt">{board.createdAt}</div>
                            </div>
                            <div className="questionMenu">
                                <div>편집</div>
                                <div>삭제</div>
                            </div>
                        </div>
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

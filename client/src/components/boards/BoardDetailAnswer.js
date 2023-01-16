import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

const BoardDetailAnswerWrapper = styled.div`
    margin-top: 40px;
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

const BoardDetailAnswerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    padding-bottom: 15px;
    border-bottom: 1px solid var(--green);

    .answerHeaderContainer {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .answerProfile {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--lightgreen);
    }

    .answerWriteInfo {
        display: flex;
        flex-direction: column;
        gap: 5px;

        & :nth-child(1) {
            color: var(--darkgreen);
            font-size: 16px;
            font-weight: 700;
        }

        & :nth-child(2) {
            color: var(--green);
            font-size: 13px;
        }
    }

    .answerEditBtns {
        button {
            padding: 5px;
            background-color: white;
            color: var(--green);

            font-size: 15px;
            font-weight: 500;
        }

        button:hover {
            font-weight: 900;
        }
    }

    @media screen and (max-width: 304px) {
        flex-direction: column;
        align-items: baseline;
    }

    @media screen and (max-width: 768px) {
        .answerProfile {
            width: 30px;
            height: 30px;
        }

        .answerWriteInfo {
            & :nth-child(1) {
                font-size: 14px;
            }

            & :nth-child(2) {
                font-size: 12px;
            }
        }

        .answerEditBtns {
            button {
                font-size: 12px;
            }
        }
    }
`;

const BoardDetailAnswerMain = styled.div`
    margin: 35px 0;
    color: var(--darkgreen);
    font-size: 16px;

    .answerMainText {
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

const BoardDetailAnswerTextareaWrapper = styled.form`
    margin-top: 40px;
    padding: 30px;
    width: 80%;
    max-width: 1300px;

    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    .boardDetailAnswerTextareaContainer {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    textarea {
        resize: none;
        width: 93%;
        max-width: 1300px;
        height: 80px;
        padding: 10px;

        border: none;
        border-radius: 5px;
        outline: 1px solid var(--green);
    }

    textarea:focus {
        outline: 1px solid var(--lightgreen);
    }

    button {
        width: 50px;
    }

    .boardDetailErrorMessage {
        color: red;
        font-size: 14px;
        margin: 10px 0 0 5px;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;

        .boardDetailAnswerTextareaContainer {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        textarea {
            width: 100%;
        }

        button {
            width: fit-content;
            padding: 5px 6px;
        }
    }
`;

// ! 나중에 서버 연결시 데이터 받아서 랜더링되도록 수정할 것
const BoardDetailAnswer = ({ id, answer, setAnswer, answerError }) => {
    const url = `http://localhost:3001`;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 답글 등록 요청 함수
    const postComment = (data) => {
        axios
            .post(`${url}/comments`, data)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    //
    const deleteComment = () => {
        axios
            .delete(`http://localhost:3001/comments/${id}`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {answerError ? null : (
                <BoardDetailAnswerWrapper>
                    {answer && (
                        <>
                            <BoardDetailAnswerHeader>
                                <div className="answerHeaderContainer">
                                    <div className="answerProfile"></div>
                                    <div className="answerWriteInfo">
                                        <div className="answerWriter">{answer.commentWriterId}</div>
                                        <div className="answerCreateAt">{answer.createdAt}</div>
                                    </div>
                                </div>

                                <div className="answerEditBtns">
                                    <button type="button">편집</button>
                                    <button type="button" onClick={deleteComment}>
                                        삭제
                                    </button>
                                </div>
                            </BoardDetailAnswerHeader>

                            <BoardDetailAnswerMain>
                                <div className="answerMainText">{answer.content}</div>
                            </BoardDetailAnswerMain>
                        </>
                    )}
                </BoardDetailAnswerWrapper>
            )}

            <BoardDetailAnswerTextareaWrapper
                onSubmit={handleSubmit((data) => {
                    data.id = Number(id);
                    data.commentWriterId = "답글 작성자";
                    data.createdAt = "2023 / 01 / 06";
                    postComment(data);
                })}
            >
                <div className="boardDetailAnswerTextareaContainer">
                    <textarea
                        placeholder="작성자에게 따듯한 응원과 격려를 보내주세요."
                        className={errors.content && "boardDetailErrorTextarea"}
                        {...register("content", {
                            required: true,
                            minLength: 5,
                        })}
                    />
                    <button type="submit">답글 등록</button>
                </div>

                {errors.content && <div className="boardDetailErrorMessage">최소 5자 이상 작성해주세요.</div>}
            </BoardDetailAnswerTextareaWrapper>
        </>
    );
};

export default BoardDetailAnswer;

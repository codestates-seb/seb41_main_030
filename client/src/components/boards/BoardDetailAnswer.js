import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const BDAnswerWrapper = styled.div`
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

const BDAnswerHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    padding-bottom: 15px;
    border-bottom: 1px solid var(--green);

    @media screen and (max-width: 304px) {
        flex-direction: column;
        align-items: baseline;
    }
`;

const BDAnswerHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BDAnswerHeaderProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--lightgreen);

    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const BDAnswerHeaderWriterInfo = styled.div`
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

    @media screen and (max-width: 768px) {
        & :nth-child(1) {
            font-size: 14px;
        }

        & :nth-child(2) {
            font-size: 12px;
        }
    }
`;

const BDAnswerEditBtn = styled.div`
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

    @media screen and (max-width: 768px) {
        button {
            font-size: 12px;
        }
    }
`;

const BDAnswerMain = styled.div`
    margin: 35px 0;

    color: var(--darkgreen);
    font-size: 16px;

    .answerMainText {
        line-height: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px;
        font-size: 14px;
    }
`;

const BDAnswerMainEditForm = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    & > div {
        width: 100%;

        textarea {
            width: 100%;
            height: 80px;
            resize: none;

            border: none;
            border-radius: 5px;
        }
    }

    @media screen and (max-width: 768px) {
        button {
            width: fit-content;
            padding: 5px 6px;
        }
    }
`;

const BDAnswerMainForm = styled.form`
    margin-top: 40px;
    padding: 30px;
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

const BDAnswerTextareaContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;

    textarea {
        resize: none;
        width: 93%;
        max-width: 1300px;
        height: 80px;
        padding: 10px;

        border: none;
        border-radius: 5px;
    }

    button {
        width: 50px;
    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

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
    const [isEdit, setIsEdit] = useState(false);

    // * 답글 등록
    // 답글 등록 form
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

    // * 답글 수정
    // 답글 등록 form
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm();

    // 답글 수정 버튼 핸들러
    const editBtnHandle = () => {
        setIsEdit(!isEdit);
    };

    // 답글 수정 요청 함수
    const editComment = (data) => {
        axios
            .patch(`http://localhost:3001/comments/${id}`, data)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    // * 답글 삭제
    // 답글 삭제 요청 함수
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
                <BDAnswerWrapper>
                    {answer && (
                        <div>
                            <BDAnswerHeaderWrapper>
                                <BDAnswerHeaderContainer>
                                    <BDAnswerHeaderProfile></BDAnswerHeaderProfile>
                                    <BDAnswerHeaderWriterInfo>
                                        <div>{answer.commentWriterId}</div>
                                        <div>{answer.createdAt}</div>
                                    </BDAnswerHeaderWriterInfo>
                                </BDAnswerHeaderContainer>

                                <BDAnswerEditBtn>
                                    {isEdit ? (
                                        <button type="button" onClick={editBtnHandle}>
                                            편집 취소
                                        </button>
                                    ) : (
                                        <button type="button" onClick={editBtnHandle}>
                                            편집
                                        </button>
                                    )}

                                    <button type="button" onClick={deleteComment}>
                                        삭제
                                    </button>
                                </BDAnswerEditBtn>
                            </BDAnswerHeaderWrapper>

                            <BDAnswerMain>
                                {isEdit ? (
                                    <BDAnswerMainEditForm
                                        onSubmit={handleSubmit2((data) => {
                                            data.id = Number(id);
                                            data.commentWriterId = "답글 작성자";
                                            data.createdAt = "2023 / 01 / 06";
                                            editComment(data);
                                        })}
                                    >
                                        <div>
                                            <textarea
                                                className={errors2.content ? "boardErrorTextarea1" : "boardTextarea1"}
                                                {...register2("content", {
                                                    required: true,
                                                    minLength: 5,
                                                })}
                                                defaultValue={answer.content}
                                            />
                                            {errors2.content && <div className="boardErrorMessage">최소 5자 이상 작성해주세요.</div>}
                                        </div>

                                        <button type="submit">편집 완료</button>
                                    </BDAnswerMainEditForm>
                                ) : (
                                    <div className="answerMainText">{answer.content}</div>
                                )}
                            </BDAnswerMain>
                        </div>
                    )}
                </BDAnswerWrapper>
            )}

            <BDAnswerMainForm
                onSubmit={handleSubmit((data) => {
                    data.id = Number(id);
                    data.commentWriterId = "답글 작성자";
                    data.createdAt = "2023 / 01 / 06";
                    postComment(data);
                })}
            >
                <BDAnswerTextareaContainer>
                    <textarea
                        placeholder="작성자에게 따듯한 응원과 격려를 보내주세요."
                        className={errors.content ? "boardErrorTextarea1" : "boardTextarea1"}
                        {...register("content", {
                            required: true,
                            minLength: 5,
                        })}
                    />
                    <button type="submit">답글 등록</button>
                </BDAnswerTextareaContainer>

                {errors.content && <div className="boardErrorMessage">최소 5자 이상 작성해주세요.</div>}
            </BDAnswerMainForm>
        </>
    );
};

export default BoardDetailAnswer;

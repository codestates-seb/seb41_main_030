import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { dateCalculation } from "./dateCalculation";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../states";

// ! 전문가 회원 구현되면  전문가만 따로 표시하도록 수정
const BoardDetailAnswer = ({ answer }) => {
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const [isEdit, setIsEdit] = useState(false);
    const memberId = useRecoilValue(memberIdState);

    // 답글 수정 form
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
            .patch(`${url}/comments/${answer.commentId}`, data)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 답글 삭제 요청 함수
    const deleteComment = () => {
        axios
            .delete(`${url}/comments/${answer.commentId}`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    // 공감 버튼
    const heartBtnHandle = () => {
        axios
            .post(`${url}/comments/${answer.commentId}/votes?memberId=${memberId}&voteCheck=true`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <BDAContainer key={answer.commentId}>
                <BDAHeaderWrapper>
                    <BDAInfo>
                        <BDAInfoProfile></BDAInfoProfile>
                        <BDAInfoWriterInfo>
                            <div>{answer.nickName}</div>
                        </BDAInfoWriterInfo>
                    </BDAInfo>

                    <BDAEditBtn>
                        {memberId === answer.memberId ? (
                            <div className="BDAEditBtns">
                                <button type="button" onClick={editBtnHandle}>
                                    {isEdit ? "편집 취소" : "편집"}
                                </button>
                                <button type="button" onClick={deleteComment}>
                                    삭제
                                </button>
                            </div>
                        ) : null}
                        <div className="BDAEditBtnTime">
                            <i className="fa-regular fa-clock"></i>
                            <div>{dateCalculation(new Date(answer.createdAt))}</div>
                        </div>
                    </BDAEditBtn>
                </BDAHeaderWrapper>

                <BDAMain>
                    {isEdit ? (
                        <BDAMainEditForm
                            onSubmit={handleSubmit2((data) => {
                                data.commentId = answer.commentId;
                                editComment(data);
                            })}
                        >
                            <div className="BDAMainEditFormTextareaWrapper">
                                <textarea
                                    className={errors2.content ? "boardErrorTextarea1" : "boardTextarea1"}
                                    {...register2("content", {
                                        required: true,
                                        minLength: 10,
                                    })}
                                    defaultValue={answer.content}
                                />
                                {errors2.content && <div className="boardErrorMessage">최소 10자 이상 작성해주세요.</div>}
                            </div>

                            <button type="submit">편집 완료</button>
                        </BDAMainEditForm>
                    ) : (
                        <div className="BDAMainText">{answer.content}</div>
                    )}
                </BDAMain>

                <BDAResponseInfo>
                    <button onClick={heartBtnHandle}>
                        <i className="fa-solid fa-heart"></i>
                    </button>

                    <div>{answer.voteCount}명 공감</div>
                </BDAResponseInfo>
            </BDAContainer>
        </>
    );
};

// ------------- answer 하나 wrapper ------------- //
const BDAContainer = styled.li`
    padding: 40px;

    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;
    }
`;

// ------------- answer header wrapper ------------- //
const BDAHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    padding-bottom: 15px;
    border-bottom: 1px solid var(--green);

    @media screen and (max-width: 380px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`;

// ------------- answer header 중 왼쪽 파트 ------------- //
const BDAInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BDAInfoProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--lightgreen);

    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const BDAInfoWriterInfo = styled.div`
    font-family: "Nanum Gothic", sans-serif;
    font-weight: var(--font-bold);
    color: var(--darkgreen);

    @media screen and (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

// ------------- answer header 중 오른쪽 파트 ------------- //
const BDAEditBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    font-family: "Nanum Gothic", sans-serif;
    font-size: 0.9rem;

    .BDAEditBtns {
        button {
            padding: 5px;
            background-color: white;
            color: var(--green);
            font-size: 0.9rem;
            font-family: "Nanum Gothic", sans-serif;
        }

        button:hover {
            font-weight: var(--font-bold);
        }
    }

    .BDAEditBtnTime {
        display: flex;
        gap: 3px;

        color: var(--green);

        i {
            margin-top: 1px;
        }
    }

    @media screen and (max-width: 768px) {
        font-size: 0.8rem;

        .BDAEditBtns {
            button {
                font-size: 0.8rem;
            }
        }
    }
`;

// ------------- answer main  ------------- //
const BDAMain = styled.div`
    margin: 30px 0;

    color: var(--darkgreen);
    font-family: "Nanum Gothic", sans-serif;
    font-size: 1rem;

    .BDAMainText {
        line-height: 1.2rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px 0;
        font-size: 0.9rem;
    }
`;

const BDAMainEditForm = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    .BDAMainEditFormTextareaWrapper {
        width: 100%;

        textarea {
            width: 100%;
            height: 200px;
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

// ------------- ResponseInfo  ------------- //
const BDAResponseInfo = styled.div`
    border-top: 1px solid var(--darkgreen);
    padding: 15px 0 0;

    display: flex;
    align-items: center;
    gap: 5px;

    color: var(--darkgreen);
    font-size: 0.9rem;
    font-family: "Nanum Gothic", sans-serif;

    button {
        padding: 0px;
        background-color: white;
        color: var(--darkgreen);
        font-size: 1.5rem;
    }

    button:hover {
        animation: heartbeat 1s ease-in infinite;
        cursor: pointer;
    }

    @keyframes heartbeat {
        0% {
            transform: scale(0.9);
        }
        25% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(0.9);
        }
        75% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(0.9);
        }
    }

    @media screen and (max-width: 768px) {
        font-size: 0.8rem;

        .BDQResponseInfoBtnWrapper {
            button {
                font-size: 1.2rem;
            }
        }
    }
`;

export default BoardDetailAnswer;

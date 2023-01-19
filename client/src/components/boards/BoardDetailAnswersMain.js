import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { dateCalculation } from "./dateCalculation";

// ! 전문가 회원 구현되면  전문가만 따로 표시하도록 수정
const BoardDetailAnswerMain = ({ answer }) => {
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const [isEdit, setIsEdit] = useState(false);

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

    return (
        <>
            <BDAContainer key={answer.commentId}>
                <BDAHeaderWrapper>
                    <BDAInfo>
                        <BDAInfoProfile></BDAInfoProfile>
                        <BDAInfoWriterInfo>
                            <div className="BDAInfoWriterInfoName">{answer.nickName}</div>
                            <div className="BDAInfoWriterInfoTime">
                                <i className="fa-regular fa-clock"></i>
                                <div>{dateCalculation(new Date(answer.createdAt))}</div>
                            </div>
                        </BDAInfoWriterInfo>
                    </BDAInfo>

                    <BDAEditBtn>
                        <button type="button" onClick={editBtnHandle}>
                            {isEdit ? "편집 취소" : "편집"}
                        </button>

                        <button type="button" onClick={deleteComment}>
                            삭제
                        </button>
                    </BDAEditBtn>
                </BDAHeaderWrapper>

                <BDAMain>
                    {isEdit ? (
                        <BDAMainEditForm
                            onSubmit={handleSubmit2((data) => {
                                // ! 로그인 구현시 commentId 수정
                                data.commentId = 1;
                                editComment(data);
                            })}
                        >
                            <div>
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
                    <div>{answer.score}명 공감</div>
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

    @media screen and (max-width: 304px) {
        flex-direction: column;
        align-items: baseline;
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
    display: flex;
    flex-direction: column;
    gap: 5px;

    .BDAInfoWriterInfoName {
        color: var(--darkgreen);
        font-size: 16px;
        font-weight: 700;
    }

    .BDAInfoWriterInfoTime {
        display: flex;
        gap: 3px;

        color: var(--green);
        font-size: 13px;
    }

    @media screen and (max-width: 768px) {
        .BDAInfoWriterInfoName {
            font-size: 14px;
        }

        .BDAInfoWriterInfoTime {
            font-size: 12px;
        }
    }
`;

// ------------- answer header 중 오른쪽 파트 ------------- //
const BDAEditBtn = styled.div`
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

// ------------- answer main  ------------- //
const BDAMain = styled.div`
    margin: 30px 0;

    color: var(--darkgreen);
    font-size: 16px;

    .BDAMainText {
        line-height: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px 0;
        font-size: 14px;
    }
`;

const BDAMainEditForm = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    & > div {
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
    gap: 10px;

    color: var(--darkgreen);
    font-size: 14px;
`;

export default BoardDetailAnswerMain;

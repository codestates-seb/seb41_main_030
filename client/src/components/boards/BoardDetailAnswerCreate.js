import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { boardState, memberIdState } from "../../states";

const BoardDetailAnswerCreate = ({ setIsLogin }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const board = useRecoilValue(boardState);
    const memberId = useRecoilValue(memberIdState);
    const token = sessionStorage.getItem("loginToken");

    // 답글 등록 form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 답글 등록 요청 함수
    const postComment = (data) => {
        if (token && token !== "undefined") {
            setIsLogin(false);

            axios
                .post(`${url}/comments`, data)
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        } else {
            setIsLogin(true);
        }
    };

    return (
        <BDAnswerCreateWrapper>
            <BDAMainForm
                onSubmit={handleSubmit((data) => {
                    data.memberId = memberId;
                    data.boardId = Number(board.boardId);
                    postComment(data);
                })}
            >
                <BDMainTextareaWrapper>
                    <textarea
                        placeholder="작성자에게 따듯한 응원과 격려를 보내주세요."
                        className={errors.content ? "boardErrorTextarea1" : "boardTextarea1"}
                        {...register("content", {
                            required: true,
                            minLength: 10,
                        })}
                    />

                    <div>
                        {errors.content ? <div className="boardErrorMessage">최소 10자 이상 작성해주세요.</div> : <div></div>}
                        <button type="submit">답글 등록</button>
                    </div>
                </BDMainTextareaWrapper>
            </BDAMainForm>
        </BDAnswerCreateWrapper>
    );
};

export default BoardDetailAnswerCreate;

// styled components
const BDAnswerCreateWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

// ------------- textarea wrapper ------------- //
const BDAMainForm = styled.form`
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

// ------------- textarea ------------- //
const BDMainTextareaWrapper = styled.div`
    textarea {
        resize: none;
        width: 100%;
        max-width: 1300px;
        height: 80px;
        padding: 10px;

        border: none;
        border-radius: 5px;

        font-family: "Nanum Gothic", sans-serif;
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3px;
    }

    button {
        font-family: "Nanum Gothic", sans-serif;
        width: fit-content;
        padding: 6px 10px;
    }

    @media screen and (max-width: 768px) {
        button {
            margin-top: 5px;
            padding: 5px 6px;
            font-size: 0.75rem;
        }
    }
`;

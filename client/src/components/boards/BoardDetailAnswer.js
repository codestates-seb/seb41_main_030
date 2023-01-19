import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { answerState, boardState } from "../../states";
import BoardDetailAnswerMain from "./BoardDetailAnswersMain";

// ! 나중에 서버 연결시 데이터 받아서 랜더링되도록 수정할 것
const BoardDetailAnswer = () => {
    const answers = useRecoilValue(answerState);
    const board = useRecoilValue(boardState);
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";

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

    return (
        <>
            <BDAWrapper>{answers && answers.map((answer, idx) => <BoardDetailAnswerMain answer={answer} key={idx} />)}</BDAWrapper>

            <BDAMainForm
                onSubmit={handleSubmit((data) => {
                    // ! 로그인 구현시 commentId 수정
                    data.memberId = 1;
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
        </>
    );
};

// styled components
// ------------- answers wrapper ------------- //
const BDAWrapper = styled.ul`
    margin-top: 40px;
    width: 80%;
    max-width: 1300px;

    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

// ------------- textarea wrapper ------------- //
const BDAMainForm = styled.form`
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
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3px;
    }

    button {
        width: fit-content;
        padding: 6px 10px;
    }

    @media screen and (max-width: 768px) {
        div {
            flex-direction: column;
            align-items: flex-start;
        }
        button {
            margin-top: 5px;
            padding: 5px 6px;
            font-size: 12px;
        }
    }
`;

const BDMainTextareaContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;

    /* @media screen and (max-width: 768px) {
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
    } */
`;

export default BoardDetailAnswer;

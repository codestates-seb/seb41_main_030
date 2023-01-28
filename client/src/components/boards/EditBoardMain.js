import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, memberIdState } from "../../states";

// component
const EditBoardMain = () => {
    const url = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();
    const [board, setBoard] = useRecoilState(boardState);
    const memberId = useRecoilValue(memberIdState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 태그
    const initialTags = board.tags.split(",");
    const deleteBlankTags = initialTags.filter((el) => el !== "");
    const tagData = ["일반", "학업", "진로", "취업", "커리어", "가족", "대인관계", "금전", "기타"];
    const [tags, setTags] = useState([...deleteBlankTags]);

    // 태그 버튼 이벤트 핸들러
    const handleTags = (e) => {
        const str = e.target.value;

        if (tags.includes(str)) {
            const result = tags.filter((el) => el !== `${str}`);
            return setTags(result);
        }

        if (!tags.includes(str)) {
            return setTags([...tags, str]);
        }
    };

    // 게시글 수정 요청 함수
    const patchBoard = (data) => {
        axios
            .patch(`${url}/boards/${board.boardId}/`, data)
            .then((res) => {
                navigate(`/community/${board.boardId}`);
                setBoard(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <EBMainWrapper>
            <form
                onSubmit={handleSubmit((data) => {
                    data.tags = tags.join();
                    data.memberId = memberId;
                    data.boardId = board.boardId;
                    patchBoard(data);
                })}
            >
                <EBMainTitle>
                    <label htmlFor="EBInputTile">고민을 한줄로 요약해 알려주세요.</label>
                    <input
                        id="EBInputTile"
                        placeholder="최소 10자 이상 작성해주세요."
                        className={errors.title && "createBoardErrorInput"}
                        defaultValue={board.title}
                        {...register("title", {
                            required: "Required",
                            minLength: {
                                value: 10,
                                message: "최소 10자 이상 작성해주세요.",
                            },
                        })}
                    />
                    {errors.title && <div className="createBoardErrorMessage">최소 10자 이상 작성해주세요!</div>}
                </EBMainTitle>

                <EBMainText>
                    <label htmlFor="EBInputContent">고민 내용을 편하게 털어놓으세요.</label>
                    <textarea
                        id="EBInputContent"
                        placeholder="고민을 적어주세요."
                        className={errors.content && "createBoardErrorTextarea"}
                        defaultValue={board.content}
                        {...register("content", { required: true })}
                    />
                    {errors.content && <div className="createBoardErrorMessage">고민을 적어주세요!</div>}
                </EBMainText>

                <EBTags>
                    <label htmlFor="createBoardTagsInput">아래의 태그 중 하나를 선택해주세요.</label>
                    <ul>
                        {tagData.map((tag, idx) => (
                            <li key={idx}>
                                <button type="button" value={tag} onClick={handleTags} className={tags.includes(tag) ? "tagBtnActive" : null}>
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </EBTags>

                <EBSubmitBtn>
                    <button type="submit">
                        고민 수정하기 <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </EBSubmitBtn>
            </form>
        </EBMainWrapper>
    );
};

export default EditBoardMain;

// styled components
const EBMainWrapper = styled.div`
    padding: 60px 100px;

    font-family: "Nanum Gothic", sans-serif;

    label {
        color: var(--darkgreen);
        font-weight: var(--font-bold);
        font-size: 1.2rem;
        margin-bottom: 5px;
    }

    .createBoardErrorInput,
    .createBoardErrorInput:focus {
        border-bottom: 2px solid red;
    }

    .createBoardErrorMessage {
        color: red;
        font-size: 0.85rem;
        margin-left: 4px;
    }

    @media screen and (max-width: 630px) {
        padding: 40px;

        label {
            font-size: 1.1rem;
        }
    }
`;

// ------------- title wrapper ------------- //
const EBMainTitle = styled.div`
    margin: 0 auto 60px;
    max-width: 1500px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
        padding: 10px;
        font-family: "Nanum Gothic", sans-serif;
        font-size: 1rem;
        border-bottom: 2px solid var(--green);
        cursor: text;
    }
    input:focus {
        border-bottom: 2px solid var(--lightgreen);
    }
`;

// ------------- main textarea wrapper ------------- //
const EBMainText = styled.div`
    margin: 0 auto 60px;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    textarea {
        resize: none;
        height: 300px;
        padding: 20px;

        border: none;
        border-radius: 20px;
        outline: 2px solid var(--green);

        font-family: "Nanum Gothic", sans-serif;
        font-size: 1rem;
    }

    textarea:focus {
        outline: 2px solid var(--lightgreen);
    }

    .createBoardErrorTextarea,
    .createBoardErrorTextarea:focus {
        outline: 2px solid red;
    }
`;

// ------------- tag wrapper ------------- //
const EBTags = styled.div`
    margin: 0 auto 60px;
    max-width: 1500px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 15px;
        border: none;
        border-radius: 20px;
        outline: 2px solid var(--green);
    }

    button {
        width: fit-content;
        padding: 8px 15px;
        border-radius: 20px;
        background-color: var(--lightgreen2);
        color: var(--darkgreen);

        font-family: "Nanum Gothic", sans-serif;
        font-size: 0.8rem;
        font-weight: var(--font-medium);
    }

    .tagBtnActive {
        background-color: var(--green);
        color: white;
    }

    @media screen and (max-width: 630px) {
        button {
            padding: 5px 10px;
            font-size: 0.75rem;
        }
    }
`;

// ------------- 제출 wrapper ------------- //
const EBSubmitBtn = styled.div`
    margin: 0 auto;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    button {
        border-radius: 30px;
        width: 300px;
        font-size: 1rem;
    }

    i {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 2px 3px;
        margin-left: 5px;
    }

    @media screen and (max-width: 630px) {
        button {
            width: 100%;
            font-size: 0.8rem;
        }

        i {
            margin-left: 2px;
        }
    }
`;

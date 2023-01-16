import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styled components
const CreateBoardMainWrapper = styled.div`
    padding: 60px 100px;

    label {
        color: var(--darkgreen);
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        font-size: 16px;
        border-bottom: 2px solid var(--green);
        cursor: text;
    }

    input:focus {
        border-bottom: 2px solid var(--lightgreen);
    }

    .createBoardErrorInput,
    .createBoardErrorInput:focus {
        border-bottom: 2px solid red;
    }

    .createBoardErrorMessage {
        color: red;
        font-size: 14px;
        margin-left: 4px;
    }

    @media screen and (max-width: 630px) {
        padding: 40px;
    }
`;

const CreateBoardMainContainer = styled.div`
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

        font-size: 16px;
    }

    textarea:focus {
        outline: 2px solid var(--lightgreen);
    }

    .createBoardErrorTextarea,
    .createBoardErrorTextarea:focus {
        outline: 2px solid red;
    }

    @media screen and (max-width: 630px) {
        label {
            font-size: 20px;
        }
    }
`;

const CreateBoardTagsWrapper = styled.div`
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

        font-size: 14px;
        font-weight: 500;
    }

    .tagBtnActive {
        background-color: var(--green);
        color: white;
    }
`;

const CreateBoardSubmitBtnWrapper = styled.div`
    margin: 0 auto;
    max-width: 1500px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    button {
        border-radius: 30px;
        width: 300px;
        font-size: 16px;
    }

    i {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 2px 3px;
        margin-left: 5px;
    }
`;

// component
const CreateBoardMain = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const url = `http://localhost:3001`;
    const navigate = useNavigate();

    // 태그
    const tagData = ["일반", "학업", "진로", "취업", "커리어", "가족", "대인관계", "금전", "기타"];
    const [tags, setTags] = useState(["일반"]);

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

    // 게시글 등록 요청 함수
    const postCreateBoard = (data) => {
        axios
            .post(`${url}/boards`, data)
            .then((res) => {
                navigate("/community");
            })
            .catch((err) => console.log(err));
    };

    return (
        <CreateBoardMainWrapper>
            <form
                onSubmit={handleSubmit((data) => {
                    data.tag = [...tags];
                    data.BoardWriterId = "작성자";
                    data.createdAt = "2023 / 01 / 06";
                    postCreateBoard(data);
                })}
            >
                <CreateBoardMainContainer>
                    <label htmlFor="createBoardInputTile">고민을 한줄로 요약해 알려주세요.</label>
                    <input
                        id="createBoardInputTile"
                        placeholder="최소 10자 이상 작성해주세요."
                        className={errors.title && "createBoardErrorInput"}
                        {...register("title", {
                            required: "Required",
                            minLength: {
                                value: 10,
                                message: "최소 10자 이상 작성해주세요.",
                            },
                        })}
                    />
                    {errors.title && <div className="createBoardErrorMessage">최소 10자 이상 작성해주세요!</div>}
                </CreateBoardMainContainer>

                <CreateBoardMainContainer>
                    <label htmlFor="createBoardInputContent">고민 내용을 편하게 털어놓으세요.</label>
                    <textarea id="createBoardInputContent" placeholder="고민을 적어주세요." className={errors.content && "createBoardErrorTextarea"} {...register("content", { required: true })} />
                    {errors.content && <div className="createBoardErrorMessage">고민을 적어주세요!</div>}
                </CreateBoardMainContainer>

                <CreateBoardTagsWrapper>
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
                </CreateBoardTagsWrapper>

                <CreateBoardSubmitBtnWrapper>
                    <button type="submit">
                        고민 등록하기 <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </CreateBoardSubmitBtnWrapper>
            </form>
        </CreateBoardMainWrapper>
    );
};

export default CreateBoardMain;
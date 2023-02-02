import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, memberIdState, questionImgState } from "../../states/";
import { dateCalculation } from "./dateCalculation";

// component
const BoardDetailQuestion = ({ setIsLogin }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();
    const [board, setBoard] = useRecoilState(boardState);
    const memberId = useRecoilValue(memberIdState);
    const token = sessionStorage.getItem("loginToken");
    const imgUrl = useRecoilValue(questionImgState);

    // 질문 삭제
    const deleteQuestion = () => {
        axios.delete(`${url}/boards/${board.boardId}`).then((res) => {
            navigate("/community");
            setBoard(null);
        });
    };

    // 공감 버튼
    const heartBtnHandle = () => {
        if (token && token !== "undefined") {
            setIsLogin(false);
            postHeart();
        } else {
            setIsLogin(true);
        }
    };

    // 공감 서버 요청 함수
    const postHeart = () => {
        axios
            .post(`${url}/boards/${board.boardId}/votes?memberId=${memberId}&voteCheck=true`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    return (
        <BDQWrapper>
            {board && (
                <>
                    <BDQTagsWrapper>
                        {board.tags === ""
                            ? null
                            : (board.tags || "").split(",").map((tag, idx) => (
                                  <div key={idx} className="BDQTag">
                                      {tag}
                                  </div>
                              ))}
                    </BDQTagsWrapper>

                    <div className="BDQHeader">
                        <BDQHeaderTitle>{board.title}</BDQHeaderTitle>

                        <BDQHeaderMain>
                            <BDQInfo>
                                <BDQInfoProfile className="infoProfile">
                                    <img src={imgUrl.imgList[0]} alt="댓글 작성자의 프로필 사진" className={imgUrl.fail ? "failImg" : "profileImg"} />
                                </BDQInfoProfile>
                                <BDQInfoWriter>
                                    <div>{board.nickName}</div>
                                </BDQInfoWriter>
                            </BDQInfo>

                            <BDQEditBtn>
                                {memberId === board.memberId ? (
                                    <div className="BDQEditBtnWrapper">
                                        <Link to="/community/edit">
                                            <button type="button">편집</button>
                                        </Link>
                                        <button type="button" onClick={deleteQuestion}>
                                            삭제
                                        </button>
                                    </div>
                                ) : null}

                                <div className="BDQEditBtnTime">
                                    <i className="fa-regular fa-clock"></i>
                                    <div>{dateCalculation(new Date(board.createdAt))}</div>
                                </div>
                            </BDQEditBtn>
                        </BDQHeaderMain>
                    </div>

                    <BDQMain>
                        <div>{board.content}</div>
                    </BDQMain>

                    <BDQResponseInfo>
                        <div className="BDQResponseInfoBtnWrapper">
                            <button onClick={heartBtnHandle}>
                                <i className="fa-solid fa-heart"></i>
                            </button>
                            <div>{board.voteCount}명 공감</div>
                        </div>

                        <div>댓글 {board.commentCount}개</div>
                    </BDQResponseInfo>
                </>
            )}
        </BDQWrapper>
    );
};

export default BoardDetailQuestion;

// styled components
const BDQWrapper = styled.div`
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

// ------------- tag ------------- //
const BDQTagsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    margin-bottom: 25px;

    .BDQTag {
        width: fit-content;
        padding: 7px 10px;
        border-radius: 20px;
        background-color: var(--lightgreen2);
        color: var(--darkgreen);

        font-size: 0.85rem;
        font-family: "Nanum Gothic", sans-serif;
    }

    @media screen and (max-width: 597px) {
        flex-wrap: wrap;
        gap: 2px;

        .BDQTag {
            padding: 5px 7px;
            font-size: 0.7rem;
            margin-bottom: 2px;
        }
    }

    @media screen and (min-width: 598px) and (max-width: 935px) {
        .BDQTag {
            font-size: 0.8rem;
        }
    }
`;

// ------------- header  ------------- //
const BDQHeaderTitle = styled.div`
    font-family: "Nanum Gothic", sans-serif;
    font-size: 1.8rem;
    font-weight: var(--font-bold);
    line-height: 2.1rem;
    color: var(--darkgreen);
    margin-bottom: 30px;

    word-wrap: break-word;
    word-break: break-all;

    @media screen and (max-width: 768px) {
        font-size: 1.3rem;
        line-height: 1.7rem;
        margin-bottom: 25px;
    }
`;

const BDQHeaderMain = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 0 0 15px;
    border-bottom: 1px solid var(--green);

    @media screen and (max-width: 380px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`;

const BDQInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BDQInfoProfile = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--green);

    .failImg {
        display: none;
    }

    .profileImg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const BDQInfoWriter = styled.div`
    color: var(--darkgreen);
    font-size: 1.1rem;
    font-weight: var(--font-bold);
    font-family: "Nanum Gothic", sans-serif;

    @media screen and (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

const BDQEditBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    .BDQEditBtnWrapper {
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

    .BDQEditBtnTime {
        color: var(--green);
        font-size: 0.9rem;
        font-family: "Nanum Gothic", sans-serif;

        display: flex;
        gap: 3px;

        i {
            margin-top: 1px;
        }
    }

    @media screen and (max-width: 768px) {
        .BDQEditBtnTime {
            font-size: 0.8rem;
        }

        .BDQEditBtnWrapper {
            button {
                font-size: 0.8rem;
            }
        }
    }
`;

// ------------- main  ------------- //
const BDQMain = styled.div`
    width: 100%;
    margin: 30px 0;
    color: var(--darkgreen);
    font-size: 1rem;
    font-family: "Nanum Gothic", sans-serif;

    div {
        line-height: 1.2rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
        margin: 20px 0;

        div {
            font-size: 0.9rem;
        }
    }
`;

// ------------- ResponseInfo  ------------- //
const BDQResponseInfo = styled.div`
    border-top: 1px solid var(--darkgreen);
    padding: 15px 0 0;

    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--darkgreen);
    font-size: 0.9rem;
    font-family: "Nanum Gothic", sans-serif;

    .BDQResponseInfoBtnWrapper {
        display: flex;
        align-items: center;
        gap: 5px;

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

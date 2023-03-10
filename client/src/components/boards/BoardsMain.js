import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import BoardCard from "./BoardCard";
import { Link } from "react-router-dom";
import loadingImg from "../../icons/Spinner-1s-200px.gif";
import { questionImgState } from "../../states";
import { useSetRecoilState } from "recoil";

const BoardsMain = () => {
    const url = process.env.REACT_APP_SERVER_URL;

    // 페이지 관련 상태
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [loading, setLoading] = useState(true);

    // 태그
    const tagData = ["전체", "일반", "학업", "진로", "취업", "커리어", "가족", "대인관계", "금전", "기타"];
    const [tagState, setTagState] = useState("전체");

    // 태그 상태에 따른 데이터 요청 함수
    const getBoardList = () => {
        if (tagState === "전체") {
            axios
                .get(`${url}/boards?page=${current}&size=8`)
                .then((res) => {
                    setList(res.data.data);
                    setTotal(res.data.pageInfo.totalElements);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            axios
                .get(`${url}/boards/all`)
                .then((res) => {
                    const tagFilterArr = res.data.filter((el) => el.tags.includes(`${tagState}`));
                    tagFilterArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    const indexOfLast = current * 8;
                    const indexOfFirst = indexOfLast - 8;

                    setList(tagFilterArr.slice(indexOfFirst, indexOfLast));
                    setTotal(tagFilterArr.length);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    // 랜덤 사진
    const unsplashId = process.env.REACT_APP_UNSPLASH_KEY;
    const setImgUrl = useSetRecoilState(questionImgState);

    const getImg = () => {
        axios
            .get(`https://api.unsplash.com/photos/random`, {
                params: {
                    client_id: unsplashId,
                    count: 100,
                },
            })
            .then((res) => {
                setImgUrl({
                    imgList: res.data.map((img) => img.urls.full),
                    fail: false,
                });
            })
            .catch(() => {
                setImgUrl({
                    imgList: [],
                    fail: true,
                });
            });
    };

    useEffect(() => {
        setLoading(true);
        setImgUrl({ imgList: [], fail: true });

        setTimeout(() => {
            getBoardList(); // 게시판 목록 데이터 요청 함수
        }, 300);

        setTimeout(() => {
            getImg(); // 게시판 목록 데이터 요청 함수
        }, 500);

        // 사진
    }, [tagState, current]);

    return (
        <BoardsMainWrapper>
            <BoardsMainTagsBtnWrapper>
                {tagData.map((el, idx) => (
                    <li key={idx + 100000}>
                        <button
                            value={el}
                            onClick={(e) => {
                                setTagState(e.target.value);
                                setCurrent(1);
                            }}
                            className={tagState === el ? "activeTag" : null}
                        >
                            {el}
                        </button>
                    </li>
                ))}
            </BoardsMainTagsBtnWrapper>

            {loading ? (
                <BoardsMainLoading>
                    <img src={loadingImg} alt="loading img" />
                </BoardsMainLoading>
            ) : (
                <>
                    {list.length === 0 ? (
                        <BoardsListNone>
                            <div>태그에 해당하는 고민이 없습니다.</div>
                        </BoardsListNone>
                    ) : (
                        <>
                            <BoardsList>
                                {list.map((post, idx) => (
                                    <li key={idx}>
                                        <BoardsCardLink to={`/community/${post.boardId}`}>
                                            <BoardCard post={post} idx={idx} />
                                        </BoardsCardLink>
                                    </li>
                                ))}
                            </BoardsList>

                            <PagingWrapper>
                                <Pagination
                                    activePage={current}
                                    itemsCountPerPage={8}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={(current) => {
                                        setCurrent(current);
                                        window.scrollTo(0, 0);
                                    }}
                                    hideFirstLastPages={true}
                                />
                            </PagingWrapper>
                        </>
                    )}
                </>
            )}
        </BoardsMainWrapper>
    );
};

export default BoardsMain;

// ------------- body ------------- //
const BoardsMainWrapper = styled.main`
    width: 100%;
    background-color: var(--lightgreen2);
`;

const BoardsMainLoading = styled.div`
    width: 100%;
    height: 50vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// ------------- tag filter btn wrapper------------- //
const BoardsMainTagsBtnWrapper = styled.ul`
    width: 100%;
    padding: 60px 100px 0px;

    display: grid;
    grid-template-columns: repeat(10, 1fr);

    button {
        width: 100%;
        height: 40px;

        border-radius: 0;
        border-right: 1px solid var(--darkgreen);
        background-color: white;
        color: var(--darkgreen);
        font-family: "Nanum Gothic", sans-serif;
    }

    .activeTag {
        background-color: var(--darkgreen);
        color: white;
    }

    li:nth-child(1) {
        button {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
    }

    li:last-child {
        button {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border-right: none;
        }
    }

    @media screen and (max-width: 920px) {
        padding: 40px 40px 0;

        button {
            font-size: 0.8rem;
        }
    }

    @media screen and (max-width: 771px) {
        grid-template-columns: repeat(5, 1fr);
        grid-row-gap: 8px;

        li:nth-child(5) {
            button {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                border-right: none;
            }
        }

        li:nth-child(6) {
            button {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
    }

    @media screen and (max-width: 439px) {
        grid-template-columns: repeat(3, 1fr);

        button {
            font-size: 0.7rem;
            padding: 5px;
        }

        li:nth-child(3n) {
            button {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                border-right: none;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }

        li:nth-child(3n + 1) {
            button {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                border-right: none;
            }
        }

        li:nth-child(3n + 2) {
            button {
                border-radius: 0;
                border-right: 1px solid var(--darkgreen);
                border-left: 1px solid var(--darkgreen);
            }
        }
    }
`;

// ------------- 게시글 리스트 wrapper ------------- //
const BoardsList = styled.ul`
    padding: 60px 100px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 920px) {
        padding: 40px;
    }

    @media screen and (min-width: 1921px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

// ------------- 게시글 카드 wrapper ------------- //
const BoardsCardLink = styled(Link)`
    width: 100%;
    height: 200px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: white;
    border-radius: 10px;

    font-family: "Nanum Gothic", sans-serif;

    &:hover {
        box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.3);
        transform: scale(1.02);
        transition: 0.2s;
    }

    @media screen and (max-width: 1201px) {
        height: 230px;
    }
`;

// ------------- 태그에 해당되는 리스트 없음 wrapper ------------- //
const BoardsListNone = styled.div`
    width: 100%;
    height: 50vh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Nanum Gothic", sans-serif;
    color: var(--darkgreen);
    font-weight: var(--font-bold);

    @media screen and (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

// ------------- 페이지네이션 wrapper ------------- //
const PagingWrapper = styled.div`
    .pagination {
        padding: 20px 0 60px;

        display: flex;
        justify-content: center;
        gap: 5px;

        font-family: "Roboto", sans-serif;
    }

    .pagination > li {
        width: 35px;
        height: 35px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.1rem;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
    }

    .pagination > li:hover {
        color: #1a2d27;
        background-color: rgba(63, 114, 77, 0.2);
        border-radius: 10px;
        cursor: pointer;
    }

    ul.pagination li.active {
        background-color: rgba(63, 114, 77, 0.5);
        border-radius: 10px;
        color: white;
    }
`;

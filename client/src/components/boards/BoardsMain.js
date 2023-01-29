import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import BoardCard from "./BoardCard";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { boardState, answerState } from "../../states";

const BoardsMain = () => {
    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";
    const setBoard = useSetRecoilState(boardState);
    const setAnswer = useSetRecoilState(answerState);

    const [loading, setLoading] = useState(true);

    // 페이지 관련 상태
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    // 게시판 목록 데이터 요청 함수
    useEffect(() => {
        axios.get(`${url}/boards?page=${current}&size=8`).then((res) => {
            setList(res.data.data);
            setTotal(res.data.pageInfo.totalElements);
        });
    }, [current]);

    return (
        <BoardsMainWrapper>
            <BoardsList>
                {list.map((post, idx) => (
                    <li key={idx}>
                        <BoardsCardLink to={`/community/${post.boardId}`}>
                            <BoardCard post={post} />
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
        </BoardsMainWrapper>
    );
};

export default BoardsMain;

// styled components
// ------------- body ------------- //
const BoardsMainWrapper = styled.main`
    width: 100%;
    background-color: var(--lightgreen2);
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

    @media screen and (max-width: 1201px) {
        height: 230px;
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

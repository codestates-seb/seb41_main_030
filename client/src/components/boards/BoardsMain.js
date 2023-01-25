import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const BoardsMain = () => {
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";

    // 페이지 관련 상태
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    // 게시판 목록 데이터 요청 함수
    useEffect(() => {
        axios.get(`/boards?page=${current}&size=8`).then((res) => {
            setList(res.data.data);
            setTotal(res.data.pageInfo.totalElements);
        });
    }, [current]);

    return (
        <BoardsMainWrapper>
            <BoardsList>
                {list.map((post) => (
                    <li key={post.boardId}>
                        <BoardsCardLink to={`/community/${post.boardId}`}>
                            <BoardsTitle>{post.title}</BoardsTitle>
                            <BoardsTagWrapper>{post.tags === "" ? null : post.tags.split(",").map((el, index) => <BoardsTag key={index}>{el}</BoardsTag>)}</BoardsTagWrapper>
                            <BoardsContent>{post.content}</BoardsContent>
                            <BoardsInfo>
                                {post.voteCount === 0 ? <div>♡ 공감해주세요</div> : <div>♡ {post.voteCount}명이 공감</div>}
                                <div>{post.nickName}</div>
                            </BoardsInfo>
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

// styled components
// ------------- body ------------- //
const BoardsMainWrapper = styled.main`
    width: 100%;
    background-color: var(--lightgreen2);
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

    @media screen and (max-width: 1201px) {
        height: 230px;
    }
`;

const BoardsTitle = styled.div`
    color: var(--darkgreen);
    font-size: 1.15rem;
    font-weight: var(--font-bold);
    margin-bottom: 12px;

    // 줄넘침
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    // 영어
    word-wrap: break-word;
    word-break: break-all;

    @media screen and (max-width: 319px) {
        font-size: 1rem;
    }
`;

const BoardsTagWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 12px;
`;

const BoardsTag = styled.li`
    width: fit-content;
    padding: 5px 8px;

    border-radius: 15px;
    background-color: var(--lightgreen);
    color: white;
    font-size: 0.75rem;

    @media screen and (max-width: 319px) {
        padding: 3px;
        font-size: 0.5rem;
    }
`;

const BoardsContent = styled.div`
    margin-bottom: 20px;

    color: var(--darkgreen);
    font-size: 0.95rem;

    line-height: 1.1rem;

    // 줄넘침
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    // 영어
    word-wrap: break-word;
    word-break: break-all;

    @media screen and (max-width: 319px) {
        font-size: 0.8rem;
    }
`;

const BoardsInfo = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: 0.8rem;
    color: var(--darkgreen);

    @media screen and (max-width: 319px) {
        font-size: 0.65rem;
        flex-direction: column;
        gap: 2px;
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

export default BoardsMain;

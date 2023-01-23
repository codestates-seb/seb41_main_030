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
                {list &&
                    list.map((post) => (
                        <li key={post.boardId}>
                            <BoardsCardLink to={`/community/${post.boardId}`}>
                                <BoardsTitle>{post.title}</BoardsTitle>
                                {post.tag ? <BoardsTagWrapper>{post.tag && post.tag.map((el, index) => <BoardsTag key={index}>{el}</BoardsTag>)}</BoardsTagWrapper> : null}
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
const BoardsMainWrapper = styled.main`
    background-color: var(--lightgreen2);
    width: 100%;
`;

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

const BoardsCardLink = styled(Link)`
    background-color: white;
    border-radius: 10px;
    width: 100%;
    height: 210px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const BoardsTitle = styled.div`
    font-size: 20px;
    color: var(--darkgreen);
    font-weight: 700;
    height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-wrap: break-word;
    word-break: break-all;
`;

const BoardsTagWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

const BoardsTag = styled.li`
    background-color: var(--lightgreen);
    color: white;
    font-size: 14px;
    border-radius: 15px;
    padding: 5px 8px;
    width: fit-content;
    @media screen and (max-width: 319px) {
        padding: 3px;
    }
`;

const BoardsContent = styled.div`
    color: var(--darkgreen);
    font-size: 14px;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    word-wrap: break-word;
    word-break: break-all;
`;

const BoardsInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--darkgreen);
    @media screen and (max-width: 319px) {
        font-size: 14px;
    }
`;

const PagingWrapper = styled.div`
    .pagination {
        padding: 20px 0 60px;
        font-family: "Roboto", sans-serif;
        display: flex;
        justify-content: center;
        gap: 5px;
    }
    .pagination > li {
        width: 35px;
        height: 35px;
        font-size: 18px;
        font-weight: 600;
        color: var(--darkgreen);
        display: flex;
        justify-content: center;
        align-items: center;
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

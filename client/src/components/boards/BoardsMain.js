import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { link } from "@uiw/react-md-editor";

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
`;

const BoardsInfo = styled.div`
    display: flex;
    justify-content: space-between;

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

// component
const BoardsMain = () => {
    const url = `http://localhost:3001`;

    // 페이지 관련 상태
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    // api 요청
    useEffect(() => {
        // ! 일단 임시 구현으로 요청 두번 보내서 요청1) 전체 데이터 받아서 갯수 구함, 요청2) 페이지 네이션 데이터 받음
        axios.get(`${url}/boards`).then((res) => {
            setTotal(res.data.length);
        });
        axios.get(`${url}/boards?_page=${current}&_limit=10`).then((res) => {
            setList(res.data);
        });
    }, [current]);

    return (
        <BoardsMainWrapper>
            <BoardsList>
                {list &&
                    list.map((post) => (
                        <li key={post.id}>
                            <BoardsCardLink to={`/community/${post.id}`}>
                                <BoardsTitle>{post.title}</BoardsTitle>
                                <BoardsTagWrapper>{post.tag && post.tag.map((el, index) => <BoardsTag key={index}>{el}</BoardsTag>)}</BoardsTagWrapper>
                                <BoardsContent>{post.content}</BoardsContent>
                                <BoardsInfo>
                                    <div>{post.createdAt}</div>
                                    <div>{post.BoardWriterId}</div>
                                </BoardsInfo>
                            </BoardsCardLink>
                        </li>
                    ))}
            </BoardsList>

            <PagingWrapper>
                <Pagination
                    activePage={current}
                    itemsCountPerPage={10}
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

import UserPost from "./UserPost";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyPageAnswer = ({ userData }) => {
    const [answerListData, setAnswerListData] = useState(undefined); // 전체 답변
    const [postListData, setPostListData] = useState(undefined); // 전체 게시글
    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";
    const navigate = useNavigate();

    useEffect(() => {
        // 답변
        axios
            .get(`${url}/comments/all`)
            .then((res) => {
                setAnswerListData(res.data);
            })
            .catch((error) => console.log(error));

        // 전체 게시글
        axios
            .get(`${url}/boards/all`)
            .then((res) => {
                setPostListData(res.data);
            })
            .catch((error) => console.log(error.response));
    }, []);

    // 작성한 답변 데이터
    const userAnswerData = answerListData && userData && answerListData.filter((answerData) => answerData.nickName === userData.nickName);

    // 전체 게시글 중 답변을 단 게시글
    postListData && userAnswerData && postListData.filter(({ boardId: id1 }) => userAnswerData.some(({ boardId: id2 }) => id1 === id2));

    // 작성한 답변 데이터(userAnswerData)에 답변 대상 게시글의 title 추가
    postListData &&
        userAnswerData &&
        userAnswerData.map((answer) => {
            postListData.forEach((post) => {
                if (post.boardId === answer.boardId) {
                    answer["title"] = post.title;
                }
            });
        });

    return (
        <>
            {answerListData && userAnswerData.length === 0 ? (
                <Alert>
                    작성하신 답변이 없습니다.
                    <br />
                    MENTALTAL 회원들과 이야기를 나누어 보세요!
                    <button onClick={() => navigate("/community")}>커뮤니티 보러가기</button>
                </Alert>
            ) : (
                answerListData &&
                userAnswerData.map((answer, index) => {
                    return <UserPost key={index} title={answer.title} content={answer.content} createdAt={answer.createdAt} answerCount={false} boardId={answer.boardId} />;
                })
            )}
        </>
    );
};

export default MyPageAnswer;

const Alert = styled.div`
    font-size: 120%;
    font-weight: var(--font-bold);
    color: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 6%;
    line-height: 160%;
    text-align: center;
    flex-direction: column;

    button {
        font-family: "Nanum Gothic", sans-serif;
        font-size: 90%;
        font-weight: var(--font-bold);
        margin-top: 3%;
        padding: 1.2%;
        width: 30%;
        border-radius: 50px;
    }
`;

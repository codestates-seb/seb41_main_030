import UserPost from "./UserPost";
import { useState, useEffect } from "react";
import axios from "axios";

const MyPageAnswer = ({ userData }) => {
    const [answerListData, setAnswerListData] = useState(undefined); // 전체 답변
    const [postListData, setPostListData] = useState(undefined); // 전체 게시글
    const url = `http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080`;

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
    const answeredBoards = postListData && userAnswerData && postListData.filter(({ boardId: id1 }) => userAnswerData.some(({ boardId: id2 }) => id1 === id2));

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
            {answerListData &&
                userAnswerData.map((answer, index) => {
                    return <UserPost key={index} title={answer.title} content={answer.content} createdAt={answer.createdAt} answerCount={false} boardId={answer.boardId} />;
                })}
        </>
    );
};

export default MyPageAnswer;

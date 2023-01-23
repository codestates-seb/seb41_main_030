import UserPost from "./UserPost";
import { useState, useEffect } from "react";
import axios from "axios";

const MyPageAnswer = ({ userData }) => {
    const [answerListData, setAnswerListData] = useState(undefined);
    const url = `http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080`;
    let memberId = undefined;
    if (userData) {
        memberId = userData.memberId;
    }

    useEffect(() => {
        axios.get(`${url}/comments/all`).then((res) => {
            setAnswerListData(res.data);
        });
    }, []);

    const userAnswerData = answerListData && answerListData.filter((answerData) => answerData.memberId === memberId);

    return (
        <>
            {answerListData &&
                userAnswerData.map((answer, index) => {
                    return <UserPost key={index} title={answer.title} content={answer.content} createdAt={answer.createdAt} answerCount={false} />;
                })}
        </>
    );
};

export default MyPageAnswer;

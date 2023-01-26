import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardState, answerState } from "../states";

// components
import BoardDetailQuestion from "../components/boards/BoardDetailQuestion";
import BoardDetailAnswerList from "../components/boards/BoardDetailAnswerList";
import BoardDetailAnswerCreate from "../components/boards/BoardDetailAnswerCreate";
import BoardModal from "../components/boards/BoardModal";

const BoardDetail = ({ setIsFooter }) => {
    const { id } = useParams();
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const [board, setBoard] = useRecoilState(boardState);
    const setAnswer = useSetRecoilState(answerState);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsFooter(true);

        axios
            .get(`${url}/boards/${id}`)
            .then((res) => {
                setBoard(res.data.data);
                setAnswer(res.data.data.comment);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <BoardDetailWrapper>
            <BoardDetailQuestion setIsLogin={setIsLogin} />
            {/* {board.commentCount === 0 ? null : <BoardDetailAnswerList />} */}
            <BoardDetailAnswerList setIsLogin={setIsLogin} />
            <BoardDetailAnswerCreate setIsLogin={setIsLogin} />
            {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
        </BoardDetailWrapper>
    );
};

// styled components
const BoardDetailWrapper = styled.div`
    margin-top: 65px;
    padding: 40px;

    background-color: var(--lightgreen2);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    position: relative; // modal 위치
`;

export default BoardDetail;

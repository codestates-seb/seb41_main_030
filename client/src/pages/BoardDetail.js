import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { boardState, answerState } from "../states";

// components
import BoardDetailQuestion from "../components/boards/BoardDetailQuestion";
import BoardDetailAnswerList from "../components/boards/BoardDetailAnswerList";
import BoardDetailAnswerCreate from "../components/boards/BoardDetailAnswerCreate";
import BoardModal from "../components/boards/BoardModal";

const BoardDetail = ({ setIsFooter }) => {
    const { id } = useParams();
    const url = process.env.REACT_APP_SERVER_URL;
    const setBoard = useSetRecoilState(boardState);
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
            <BoardDetailAnswerList setIsLogin={setIsLogin} />
            <BoardDetailAnswerCreate setIsLogin={setIsLogin} />
            {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
        </BoardDetailWrapper>
    );
};

export default BoardDetail;

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

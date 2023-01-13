import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardDetailQuestion from "../components/boards/BoardDetailQuestion";
import BoardDetailAnswer from "../components/boards/BoardDetailAnswer";

// styled components
const BoardDetailWrapper = styled.div`
    margin-top: 65px;
    padding: 40px;

    background-color: var(--lightgreen2);

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BoardDetail = ({ setIsFooter }) => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [answerError, setAnswerError] = useState(true);

    // ! 서버 열리면 이후 수정 예정
    useEffect(() => {
        setIsFooter(true);

        axios
            .get(`http://localhost:3001/boards/${id}`)
            .then((res) => setBoard(res.data))
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:3001/comments/${id}`)
            .then((res) => {
                setAnswer(res.data);
                setAnswerError(false);
            })
            .catch((err) => {
                setAnswerError(true);
            });
    }, []);

    return (
        <BoardDetailWrapper>
            <BoardDetailQuestion id={id} board={board} setBoard={setBoard}></BoardDetailQuestion>
            <BoardDetailAnswer id={id} answer={answer} setAnswer={setAnswer} answerError={answerError}></BoardDetailAnswer>
        </BoardDetailWrapper>
    );
};

export default BoardDetail;

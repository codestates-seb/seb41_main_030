import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardState, answerState } from "../states";
import BoardDetailQuestion from "../components/boards/BoardDetailQuestion";
import BoardDetailAnswerList from "../components/boards/BoardDetailAnswerList";
import BoardDetailAnswerCreate from "../components/boards/BoardDetailAnswerCreate";

const BoardDetail = ({ setIsFooter }) => {
    const { id } = useParams();
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const [board, setBoard] = useRecoilState(boardState);
    const setAnswer = useSetRecoilState(answerState);

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
            <BoardDetailQuestion></BoardDetailQuestion>
            {/* {board.commentCount === 0 ? null : <BoardDetailAnswerList />} */}
            <BoardDetailAnswerList />
            <BoardDetailAnswerCreate />
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
`;

export default BoardDetail;

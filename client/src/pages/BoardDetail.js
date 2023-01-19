import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { boardState, answerState } from "../states";
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
    const url = "http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080";
    const setBoard = useSetRecoilState(boardState);
    const setAnswer = useSetRecoilState(answerState);

    // ! 서버 열리면 이후 수정 예정
    useEffect(() => {
        setIsFooter(true);
        window.scrollTo(0, 0);

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
            <BoardDetailAnswer></BoardDetailAnswer>
        </BoardDetailWrapper>
    );
};

export default BoardDetail;

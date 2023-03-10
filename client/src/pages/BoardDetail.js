import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { boardState, answerState } from "../states";
import LoadingImg from "../icons/Spinner-1s-200px.gif";

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
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setIsFooter(true);
        window.scrollTo(0, 0);

        setTimeout(() => {
            axios
                .get(`${url}/boards/${id}`)
                .then((res) => {
                    setBoard(res.data.data);
                    setAnswer(res.data.data.comment);
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsPending(false);
                });
        }, 500);
    }, []);

    return (
        <BoardDetailWrapper>
            {isPending ? (
                <BoardDetailLoading>
                    <img src={LoadingImg} alt="loading img" />
                </BoardDetailLoading>
            ) : (
                <>
                    <BoardDetailQuestion setIsLogin={setIsLogin} />
                    <BoardDetailAnswerList setIsLogin={setIsLogin} />
                    <BoardDetailAnswerCreate setIsLogin={setIsLogin} />
                    {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
                </>
            )}
        </BoardDetailWrapper>
    );
};

export default BoardDetail;

// styled components
const BoardDetailWrapper = styled.div`
    margin-top: 65px;
    padding: 60px 40px;

    background-color: var(--lightgreen2);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const BoardDetailLoading = styled.div`
    padding: 40px;
    height: 70vh;
    width: 80%;
    max-width: 1300px;

    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 20px;
    }
`;

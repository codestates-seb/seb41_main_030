import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardDetailQuestion from "../components/boards/BoardDetailQuestion";

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

    useEffect(() => {
        setIsFooter(true);

        axios
            .get(`http://localhost:3001/boards/${id}`)
            .then((res) => setBoard(res.data))
            .catch((err) => console.log(err));
    }, [`http://localhost:3001/boards/${id}`]);

    return (
        <BoardDetailWrapper>
            <BoardDetailQuestion board={board} setBoard={setBoard}></BoardDetailQuestion>
        </BoardDetailWrapper>
    );
};

export default BoardDetail;

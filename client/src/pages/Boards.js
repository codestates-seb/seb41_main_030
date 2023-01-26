import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

// components
import BoardsHeader from "../components/boards/BoardsHeader";
import BoardsMain from "../components/boards/BoardsMain";
import BoardModal from "../components/boards/BoardModal";

const Boards = ({ setIsFooter }) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <BoardsWrapper>
            <BoardsHeader setIsLogin={setIsLogin} />
            <BoardsMain />
            {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
        </BoardsWrapper>
    );
};

const BoardsWrapper = styled.div`
    margin-top: 65px;
    position: relative; // modal 위치
`;

export default Boards;

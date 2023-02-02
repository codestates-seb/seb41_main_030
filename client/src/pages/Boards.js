import styled from "styled-components";
import { useEffect, useState } from "react";

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
            <BoardsHeader />
            <BoardsMain />
            {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
        </BoardsWrapper>
    );
};

const BoardsWrapper = styled.div`
    margin-top: 65px;
`;

export default Boards;

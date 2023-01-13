import styled from "styled-components";
import { useEffect } from "react";
import BoardsHeader from "../components/boards/BoardsHeader";
import BoardsMain from "../components/boards/BoardsMain";

const BoardsWrapper = styled.div`
    margin-top: 65px;
`;

const Boards = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <BoardsWrapper>
            <BoardsHeader />
            <BoardsMain />
        </BoardsWrapper>
    );
};

export default Boards;

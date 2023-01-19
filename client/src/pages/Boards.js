import styled from "styled-components";
import { useEffect } from "react";
import BoardsHeader from "../components/boards/BoardsHeader";
import BoardsMain from "../components/boards/BoardsMain";

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

const BoardsWrapper = styled.div`
    margin-top: 65px;
`;

export default Boards;

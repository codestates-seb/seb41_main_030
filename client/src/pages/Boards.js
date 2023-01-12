import styled from "styled-components";
import BoardsHeader from "../components/boards/BoardsHeader";
import BoardsMain from "../components/boards/BoardsMain";
import Footer from "../components/Footer";

const BoardsWrapper = styled.div`
    margin-top: 65px;
`;

const Boards = () => {
    return (
        <BoardsWrapper>
            <BoardsHeader />
            <BoardsMain />
        </BoardsWrapper>
    );
};

export default Boards;

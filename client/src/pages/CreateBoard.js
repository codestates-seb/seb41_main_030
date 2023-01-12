import styled from "styled-components";
import { useEffect } from "react";
import CreateBoardHeader from "../components/boards/CreateBoardHeade";
import CreateBoardMain from "../components/boards/CreateBoardMain";

const CreateBoardsWrapper = styled.div`
    margin-top: 65px;
    background-color: white;
    height: 600px;
`;

const CreateBoard = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    return (
        <>
            <CreateBoardsWrapper>
                <CreateBoardHeader></CreateBoardHeader>
                <CreateBoardMain></CreateBoardMain>
            </CreateBoardsWrapper>
        </>
    );
};

export default CreateBoard;

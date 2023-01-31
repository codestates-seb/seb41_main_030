import styled from "styled-components";
import { useEffect } from "react";
import CreateBoardHeader from "../components/boards/CreateBoardHeader";
import CreateBoardMain from "../components/boards/CreateBoardMain";

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

const CreateBoardsWrapper = styled.div`
    margin-top: 65px;
    background-color: white;
    height: 600px;
`;

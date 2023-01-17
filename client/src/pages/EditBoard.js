import styled from "styled-components";
import { useEffect } from "react";
import CreateBoardHeader from "../components/boards/CreateBoardHeader";
import EditBoardMain from "../components/boards/EditBoardMain";

const EditBoardWrapper = styled.div`
    margin-top: 65px;
    background-color: white;
    height: 600px;
`;

const EditBoard = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    return (
        <>
            <EditBoardWrapper>
                <CreateBoardHeader></CreateBoardHeader>
                <EditBoardMain></EditBoardMain>
            </EditBoardWrapper>
        </>
    );
};

export default EditBoard;

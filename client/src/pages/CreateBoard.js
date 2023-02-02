import styled from "styled-components";
import { useEffect, useState } from "react";
import CreateBoardHeader from "../components/boards/CreateBoardHeader";
import CreateBoardMain from "../components/boards/CreateBoardMain";
import BoardModal from "../components/boards/BoardModal";

const CreateBoard = ({ setIsFooter }) => {
    // 로그인 상태 확인
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsFooter(false);
    });

    return (
        <>
            <CreateBoardsWrapper>
                <CreateBoardHeader></CreateBoardHeader>
                <CreateBoardMain setIsLogin={setIsLogin}></CreateBoardMain>
                {isLogin ? <BoardModal setIsLogin={setIsLogin} /> : null}
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

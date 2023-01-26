import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import BoardsHeader from "../components/boards/BoardsHeader";
import BoardsMain from "../components/boards/BoardsMain";

const Boards = ({ setIsFooter }) => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const modalHandle = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <BoardsWrapper>
            <BoardsHeader setIsLogin={setIsLogin} />
            <BoardsMain />

            {isLogin ? (
                <BoardsModalWrapper onClick={modalHandle}>
                    <BoardsModalContainer>
                        <div>로그인 후 이용해주세요.</div>
                        <button
                            onClick={() => {
                                navigate("/login");
                                setIsLogin(false);
                            }}
                        >
                            바로가기
                        </button>
                    </BoardsModalContainer>
                </BoardsModalWrapper>
            ) : null}
        </BoardsWrapper>
    );
};

const BoardsWrapper = styled.div`
    margin-top: 65px;

    position: relative;
`;

// ------------- modal ------------- //
const BoardsModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
`;

const BoardsModalContainer = styled.div`
    position: absolute;
    top: 300px;

    width: 280px;
    height: 150px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 30px;
    background-color: white;

    div {
        color: var(--darkgreen);
        font-family: "Nanum Gothic", sans-serif;
        font-weight: var(--font-bold);
        margin-bottom: 15px;
    }

    button {
        font-family: "Nanum Gothic", sans-serif;
    }
`;

export default Boards;

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardModal = ({ setIsLogin }) => {
    const navigate = useNavigate();

    return (
        <BMWrapper onClick={() => setIsLogin(false)}>
            <BMContainer>
                <div>로그인 후 이용해주세요.</div>
                <button
                    onClick={() => {
                        navigate("/login");
                        setIsLogin(false);
                    }}
                >
                    바로가기
                </button>
            </BMContainer>
        </BMWrapper>
    );
};

const BMWrapper = styled.div`
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

const BMContainer = styled.div`
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

export default BoardModal;

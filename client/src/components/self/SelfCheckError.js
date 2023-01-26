import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { selfCheckErrorState } from "../../states";

const SelfCheckError = () => {
    const setError = useSetRecoilState(selfCheckErrorState);

    const closeBtnHandle = () => {
        setError(false);
    };

    return (
        <SCErrorWrapper onClick={closeBtnHandle}>
            <SCErrorModalWrapper>
                <div>모든 항목에 체크했는지 확인해주세요!</div>
                <button onClick={closeBtnHandle}>확인</button>
            </SCErrorModalWrapper>
        </SCErrorWrapper>
    );
};

const SCErrorWrapper = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
`;

const SCErrorModalWrapper = styled.div`
    width: 350px;
    height: 25%;
    border-radius: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: white;

    font-family: "Nanum Gothic", sans-serif;
    font-size: 18px;

    div {
        color: var(--darkgreen);
        padding-bottom: 5%;
        font-weight: var(--font-medium);
    }

    button {
        width: 80px;
        border-radius: 50px;
        background-color: var(--darkgreen);

        font-size: 1.1rem;
    }

    button:hover {
        cursor: pointer;
        background-color: var(--lightgreen);
        transition: 0.5s;
    }
`;

export default SelfCheckError;

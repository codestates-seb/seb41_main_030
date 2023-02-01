import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const SelfCheckHeader = () => {
    return (
        <SCHeaderWrapper>
            <SCHeaderBox>
                <SCHeaderTitle>
                    <div>자가진단</div>
                    <div>본 자가검진은 간단하게 알아보는 심리 검사입니다.</div>
                    <div>점수와 관계없이 일상생활에 불편함이 있다면, {useMediaQuery({ maxWidth: 687 }) ? <br /> : null}면담을 통해 현재 상태를 정확하게 파악해보는 것이 필요합니다.</div>
                </SCHeaderTitle>
            </SCHeaderBox>
        </SCHeaderWrapper>
    );
};

// styled components
const SCHeaderWrapper = styled.header`
    margin-top: 65px;
    width: 100%;
    height: 335px;

    display: flex;
    justify-content: center;

    @media screen and (max-width: 1100px) {
        height: 200px;
    }
`;

const SCHeaderBox = styled.div`
    max-width: 1500px;
    width: 100%;
    height: 100%;
    padding: 60px 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    font-family: "Nanum Gothic", sans-serif;
    line-height: 17px;

    @media screen and (max-width: 920px) {
        padding: 40px;
    }
`;

const SCHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 20px;
    }

    & :not(:nth-child(1)) {
        font-size: 1rem;
        line-height: 140%;
    }

    @media screen and (max-width: 1100px) {
        & :nth-child(1) {
            font-size: 28px;
        }

        & :not(:nth-child(1)) {
            font-size: 13px;
        }
    }
    @media screen and (max-width: 768px) {
        text-align: center;
    }

    @media screen and (max-width: 436px) {
        padding: 60px 0;
    }
`;

export default SelfCheckHeader;

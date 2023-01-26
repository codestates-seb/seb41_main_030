import styled from "styled-components";

const SelfCheckResultHeader = () => {
    return (
        <SCResultHeaderWrapper>
            <SCResultHeaderTitle>
                <div>자가진단 테스트 결과</div>
                <div>본 자가검진은 간단하게 알아보는 심리 검사입니다.</div>
                <div>점수와 관계없이 일상생활에 불편함이 있다면, 면담을 통해 현재 상태를 정확하게 파악해보는 것이 필요합니다.</div>
            </SCResultHeaderTitle>
        </SCResultHeaderWrapper>
    );
};

// styled components
const SCResultHeaderWrapper = styled.header`
    margin-top: 65px;
    width: 100%;
    height: 220px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--lightgreen2);
`;

const SCResultHeaderTitle = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;
    padding: 60px 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    font-family: "Nanum Gothic", sans-serif;
    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 2.4rem;
        font-weight: var(--font-bold);
        margin-bottom: 10px;
    }

    & :not(:nth-child(1)) {
        font-size: 1rem;
    }

    @media screen and (max-width: 920px) {
        padding: 40px;

        & :nth-child(1) {
            font-size: 1.7rem;
        }

        & :not(:nth-child(1)) {
            font-size: 0.8rem;
        }
    }
`;

export default SelfCheckResultHeader;

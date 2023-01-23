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
    width: 73%;

    display: flex;
    flex-direction: column;

    gap: 10px;

    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 40px;
        font-weight: 900;
        margin-bottom: 10px;
    }

    & :not(:nth-child(1)) {
        font-size: 16px;
    }

    @media screen and (max-width: 1100px) {
        width: 90%;

        & :nth-child(1) {
            font-size: 28px;
        }

        & :not(:nth-child(1)) {
            font-size: 13px;
        }
    }
`;

export default SelfCheckResultHeader;

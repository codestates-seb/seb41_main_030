import styled from "styled-components";

//전문가 페이지 header
// 기존 다른 페이지와 같은 방식으로 작성
const CounselorHeader = () => {
    return (
        <BoardsHeaderWrapper>
            <CounselorTitle>
                <div className="logo">MENTALTAL 전문가</div>
                <p>전문가의 도움이 필요하신가요?</p>
                <p>MENTALTAL 전문가 프로필을 확인하고 나에게 딱 맞는 전문 상담을 받아보세요.</p>
            </CounselorTitle>
        </BoardsHeaderWrapper>
    );
};

const BoardsHeaderWrapper = styled.header`
    display: flex;
    width: 100%;
    height: 300px;
    padding: 60px 100px;
    background-color: var(--lightgreen2);
    justify-content: space-between;
    align-items: center;
    font-family: "Nanum Gothic", sans-serif;
`;

const CounselorTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 40px;
        font-weight: 900;
        margin-bottom: 12px;
    }

    & :not(:nth-child(1)) {
        font-size: 16px;
    }

    @media screen and (max-width: 387px) {
        gap: 5px;

        & :nth-child(1) {
            width: 120px;
        }
    }

    @media screen and (max-width: 768px) {
        & :nth-child(1) {
            font-size: 33px;
        }

        & :not(:nth-child(1)) {
            font-size: 14px;
        }
    }
`;

export default CounselorHeader;

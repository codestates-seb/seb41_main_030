import styled from "styled-components";

//전문가 페이지 header
// 기존 다른 페이지와 같은 방식으로 작성
const CounselorHeader = () => {
    return (
        <BoardsHeaderWrapper>
            <CounselorTitle>
                <div className="logo">MENTALTAL 전문가</div>
                <p>고민을 나눌 수 있는 전문가를 소개하는 공간입니다.</p>
                <p>전문가는 언제든 당신의 고민을 듣고 조언해줄 수 있습니다.</p>
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
    align-items: flex-end;
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

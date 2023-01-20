import styled from "styled-components";

const CreateBoardHeader = () => {
    return (
        <CBHeaderWrapper>
            <CBHeaderTitle>
                <div>어떤 고민을 하고 계신가요?</div>
                <div>말하지 못했던 괴로움, 고민을 여기에 마음껏 털어놓아보세요.</div>
            </CBHeaderTitle>
        </CBHeaderWrapper>
    );
};

// styled components
const CBHeaderWrapper = styled.header`
    padding: 60px 100px;
    background-color: var(--lightgreen2);

    @media screen and (max-width: 630px) {
        padding: 40px;
    }
`;

// ------------- title wrapper ------------- //
const CBHeaderTitle = styled.div`
    margin: 0 auto;
    max-width: 1500px;
    height: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    & :nth-child(1) {
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 20px;
        color: var(--darkgreen);
    }

    & :not(:nth-child(1)) {
        font-size: 16px;
        color: var(--green);
    }

    @media screen and (max-width: 630px) {
        height: 60px;

        & :nth-child(1) {
            font-size: 22px;
            margin-bottom: 15px;
        }

        & :not(:nth-child(1)) {
            font-size: 13px;
        }
    }
`;

export default CreateBoardHeader;

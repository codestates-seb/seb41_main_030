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

export default CreateBoardHeader;

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
    height: 216px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    font-family: "Nanum Gothic", sans-serif;

    & :nth-child(1) {
        margin-bottom: 30px;

        font-size: 2.5rem;
        font-weight: var(--font-bold);
        color: var(--darkgreen);

        @media screen and (max-width: 683px) {
            font-size: 2.3rem;
        }
    }

    & :not(:nth-child(1)) {
        font-size: 1rem;
        color: var(--green);
        line-height: 130%;
    }

    @media screen and (max-width: 630px) {
        height: 60px;

        & :nth-child(1) {
            font-size: 1.4rem;
            margin-bottom: 15px;
        }

        & :not(:nth-child(1)) {
            font-size: 0.8rem;
        }
    }
`;

import styled from "styled-components";

const IntroMain = () => {
    return (
        <>
            <NavSize />
            <IntroMainContainer>
                <TypingContainer>
                    <span className="typed-text">가만히 있어도 불안해요.</span>
                    <span className="cursor blink">&nbsp;|</span>
                </TypingContainer>
                <div className="subTitle">이런 고민, 이곳에 탈탈 털어놓으세요.</div>
                <div className="logo">MENTALTAL</div>
                <div className="button">MENTALTAL 둘러보기</div>
            </IntroMainContainer>
        </>
    );
};

export default IntroMain;

const NavSize = styled.div`
    height: 65px;
`;

const IntroMainContainer = styled.div`
    background-color: var(--green);
    width: 100%;
    /* height: 1080px; */
    height: 840px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--white);
    font-family: "Nanum Gothic", sans-serif;

    .subTitle {
        /* height: 100px; */
        padding-top: 15px;
        font-size: 27px;
        font-weight: var(--font-bold);
    }

    .logo {
        font-size: 91.42px;
        padding: 40px 0 60px 0;
    }

    .button {
        background-color: white;
        color: var(--green);
        font-size: 18px;
        font-weight: var(--font-bold);
        border-radius: 50px;
        padding: 15px 30px;
    }
`;

const TypingContainer = styled.div`
    font-size: 22px;

    .cursor.blink {
        animation: blink 0.8s ease-in-out infinite;
    }
`;

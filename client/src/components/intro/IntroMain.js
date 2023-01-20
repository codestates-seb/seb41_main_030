import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import useScrollFadeIn from "./useScrollFadeIn";

const IntroMain = () => {
    const introMessage = [
        `가만히 있어도 불안해요.`,
        1000,
        `이직한 회사에서 적응이 힘들어요.`,
        1000,
        `집중력이 떨어져서 고민이에요.`,
        1000,
        `과거의 상처를 잊지 못하겠어요.`,
        1000,
        `잘하고 있는지 확신이 들지 않아요.`,
        1000,
    ];

    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 2, 1),
        2: useScrollFadeIn("down", 3, 2),
        3: useScrollFadeIn("down", 4, 3),
    };

    // const animatedItem = useScrollFadeIn("down", 1, 0);
    // const animatedItem2s = useScrollFadeIn("down", 2, 1);
    // const animatedItem3s = useScrollFadeIn("down", 3, 2);
    // const animatedItem4s = useScrollFadeIn("down", 4, 3);

    return (
        <>
            <NavSize />
            <IntroMainContainer>
                <IntroMainContent>
                    <TypingContainer {...animatedItem[0]}>
                        <TypeAnimation sequence={introMessage} wrapper="div" speed={0} repeat={Infinity} cursor={true} />
                    </TypingContainer>
                    <div className="subTitle" {...animatedItem[1]}>
                        이런 고민, 이곳에 탈탈 털어놓으세요.
                    </div>
                    <div className="logo" {...animatedItem[2]}>
                        MENTALTAL
                    </div>
                    <div className="button" {...animatedItem[3]}>
                        MENTALTAL 둘러보기
                    </div>
                </IntroMainContent>
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IntroMainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--white);
    font-family: "Nanum Gothic", sans-serif;

    .subTitle {
        /* height: 100px; */
        padding-top: 15px;
        padding-bottom: 40px;
        font-size: 27px;
        font-weight: var(--font-bold);
    }

    .logo {
        font-size: 91.42px;
        padding-bottom: 60px;
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

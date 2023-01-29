import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import useScrollFadeIn from "./useScrollFadeIn";
import { Link } from "react-router-dom";

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
        1: useScrollFadeIn("down", 2, 1.5),
        2: useScrollFadeIn("down", 2, 2.5),
        3: useScrollFadeIn("down", 2, 3.5),
    };

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
                    <Link to="/main">
                        <div className="button" {...animatedItem[3]}>
                            MENTALTAL 둘러보기
                        </div>
                    </Link>
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

    .subTitle {
        padding-top: 15px;
        padding-bottom: 40px;
        font-size: 169%;
        font-weight: var(--font-bold);
        @media screen and (max-width: 768px) {
            font-size: 147%;
        }
        @media screen and (max-width: 510px) {
            font-size: 137%;
            padding-bottom: 30px;
        }
        @media screen and (max-width: 430px) {
            font-size: 127%;
            padding-bottom: 20px;
        }
        @media screen and (max-width: 414px) {
            font-size: 117%;
            padding-bottom: 15px;
        }
        @media screen and (max-width: 375px) {
            font-size: 107%;
            padding-top: 12px;
        }
    }

    .logo {
        font-size: 570%;
        padding-bottom: 60px;
        @media screen and (max-width: 768px) {
            font-size: 530%;
        }
        @media screen and (max-width: 545px) {
            font-size: 510%;
        }
        @media screen and (max-width: 510px) {
            font-size: 480%;
            padding-bottom: 50px;
        }
        @media screen and (max-width: 470px) {
            font-size: 450%;
        }
        @media screen and (max-width: 460px) {
            font-size: 420%;
        }
        @media screen and (max-width: 430px) {
            font-size: 390%;
            padding-bottom: 40px;
        }
        @media screen and (max-width: 414px) {
            font-size: 360%;
            padding-bottom: 35px;
        }
        @media screen and (max-width: 375px) {
            font-size: 340%;
            padding-bottom: 30px;
        }
    }

    .button {
        background-color: white;
        color: var(--green);
        font-size: 113%;
        font-weight: var(--font-bold);
        border-radius: 50px;
        padding: 15px 30px;
        &:hover {
            cursor: pointer;
        }
        @media screen and (max-width: 768px) {
            font-size: 100%;
        }
        @media screen and (max-width: 460px) {
            font-size: 90%;
        }
        @media screen and (max-width: 375px) {
            font-size: 80%;
        }
    }
`;

const TypingContainer = styled.div`
    font-size: 137%;

    .cursor.blink {
        animation: blink 0.8s ease-in-out infinite;
    }
    @media screen and (max-width: 768px) {
        font-size: 115%;
    }
    @media screen and (max-width: 430px) {
        font-size: 110%;
    }
    @media screen and (max-width: 414px) {
        font-size: 105%;
    }
    @media screen and (max-width: 375px) {
        font-size: 100%;
    }
`;

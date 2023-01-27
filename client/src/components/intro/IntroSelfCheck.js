import styled from "styled-components";
import useScrollFadeIn from "./useScrollFadeIn";
import { Link } from "react-router-dom";
import selfCheckImg from "../../icons/intro-selfcheck-img.png";
import { useMediaQuery } from "react-responsive";

const IntroSelfCheck = () => {
    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 1, 1),
        3: useScrollFadeIn("down", 1, 1.5),
    };

    return (
        <>
            <IntroSelfCheckContainer>
                <LeftContent>
                    <div className="title" {...animatedItem[0]}>
                        심리 자가진단
                    </div>
                    <div className="subTitle" {...animatedItem[1]}>
                        MENTALTAL이 알려주는 {useMediaQuery({ maxWidth: 870 }) ? <br /> : null}자가진단 서비스
                    </div>
                    <div className="description" {...animatedItem[2]}>
                        성인우울증, 스트레스 항목 중
                        <br />
                        검사받고 싶은 항목을 선택하고, {useMediaQuery({ maxWidth: 1020 }) ? <br /> : null}각 문항을 체크해서
                        <br />
                        나의 마음 상태를 간단하게 확인해보세요.
                    </div>
                    <div className="buttonContainer" {...animatedItem[3]}>
                        <Link to="/selfcheck">
                            <button>자가진단하러 가기</button>
                        </Link>
                    </div>
                </LeftContent>
                <RightContent>
                    <img src={`${selfCheckImg}`} />
                </RightContent>
            </IntroSelfCheckContainer>
        </>
    );
};

export default IntroSelfCheck;

const IntroSelfCheckContainer = styled.div`
    background-color: var(--green);
    display: flex;
    width: 100%;
    height: 100%;
    padding: 100px;

    @media screen and (max-width: 1162px) {
        padding-right: 50px;
    }
`;

const LeftContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        font-size: 43px;
        font-weight: var(--font-bold);

        @media screen and (max-width: 1162px) {
            font-size: 41px;
        }
        @media screen and (max-width: 1020px) {
            font-size: 39px;
        }
    }
    .subTitle {
        font-size: 23px;
        font-weight: var(--font-bold);
        padding: 30px 0;
        line-height: 150%;
        @media screen and (max-width: 1162px) {
            font-size: 21px;
        }
        @media screen and (max-width: 1020px) {
            font-size: 19px;
        }
    }
    .description {
        font-size: 21px;
        line-height: 35px;
        @media screen and (max-width: 1162px) {
            font-size: 19px;
        }
        @media screen and (max-width: 1020px) {
            font-size: 17px;
        }
    }
    .buttonContainer {
        padding-top: 30px;
        button {
            background-color: var(--white);
            color: var(--green);
            border-radius: 50px;
            font-size: 18px;
            font-weight: var(--font-bold);
            padding: 10px 30px;
            font-family: "Nanum Gothic", sans-serif;

            :hover {
                background-color: var(--lightgreen);
                color: var(--white);
            }
            @media screen and (max-width: 1020px) {
                font-size: 16px;
            }
        }
    }
`;

const RightContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 786px) {
        display: none;
    }

    img {
        width: 100%;
        height: auto;
        padding-top: 10%;

        @media screen and (max-width: 1420px) {
            padding-top: 0;
        }
    }
`;

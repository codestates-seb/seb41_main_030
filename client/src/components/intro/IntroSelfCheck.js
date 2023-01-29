import styled from "styled-components";
import useScrollFadeIn from "./useScrollFadeIn";
import { Link } from "react-router-dom";
import selfCheckImg from "../../icons/intro-selfcheck-img.png";

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
                        <p>MENTALTAL이 알려주는&nbsp;</p>
                        <p>자가진단 서비스</p>
                    </div>
                    <div className="description" {...animatedItem[2]}>
                        <p>성인우울증, 스트레스 항목 중</p>
                        <div className="responsiveLine">
                            <p>검사받고 싶은 항목을 선택하고,&nbsp;</p>
                            <p>각 문항을 체크해서</p>
                        </div>
                        <p>나의 마음 상태를 간단하게 확인해보세요.</p>
                    </div>
                    <div className="buttonContainer" {...animatedItem[3]}>
                        <Link to="/selfcheck">
                            <button>자가진단하러 가기</button>
                        </Link>
                    </div>
                </LeftContent>
                <RightContent>
                    <img src={`${selfCheckImg}`} alt="MENTALTAL 자가진단 페이지 모바일 목업 이미지" />
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
    @media screen and (max-width: 700px) {
        padding: 0;
    }
`;

const LeftContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 700px) {
        align-items: center;
    }

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
        display: flex;
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
        @media screen and (max-width: 880px) {
            flex-direction: column;
        }
        @media screen and (max-width: 700px) {
            flex-direction: row;
        }
    }
    .description {
        font-size: 21px;
        line-height: 35px;
        .responsiveLine {
            display: flex;
        }

        @media screen and (max-width: 1162px) {
            font-size: 19px;
        }
        @media screen and (max-width: 1080px) {
            .responsiveLine {
                flex-direction: column;
            }
        }
        @media screen and (max-width: 870px) {
            display: none;
        }
        @media screen and (max-width: 700px) {
            display: block;
            text-align: center;
            .responsiveLine {
                flex-direction: row;
            }
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
            @media screen and (max-width: 700px) {
                font-size: 18px;
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
    @media screen and (max-width: 700px) {
        display: none;
    }

    img {
        width: 90%;
        height: auto;
        padding-top: 10%;

        @media screen and (max-width: 1420px) {
            padding-top: 0;
        }
        @media screen and (max-width: 1300px) {
            width: 100%;
            transition: 0.5s;
        }
    }
`;

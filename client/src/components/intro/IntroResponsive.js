import styled from "styled-components";
import Footer from "../Footer";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import useScrollFadeIn from "./useScrollFadeIn";
import desktopImg from "../../icons/intro-responsive-img.png";
import mobileImg from "../../icons/intro-mobile-responsive-img.png";

const IntroResponsive = () => {
    // false인 경우 데스크탑 목업 이미지, true인 경우 모바일 목업 이미지
    const [btnClick, setBtnClick] = useState(false);
    const handleBtnClick = () => {
        setBtnClick(!btnClick);
    };

    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 1, 1),
    };

    return (
        <>
            <IntroResponsivePageContainer>
                <IntroResponsiveContainer>
                    <LeftContainer clickWhite={btnClick ? "#fff" : "#3f724d"} clickGreen={btnClick ? "#3f724d" : "#fff"}>
                        <div className="title" {...animatedItem[0]}>
                            반응형 웹 서비스
                        </div>
                        <div className="description" {...animatedItem[1]}>
                            다양한 환경을 고려하여
                            <br />
                            화면 크기에 맞게{useMediaQuery({ maxWidth: 606 }) ? <br /> : null} 반응형 웹을 구현했습니다.
                            {useMediaQuery({ maxWidth: 768 }) ? <div className="addDescription">화면 너비를 조정해보세요!</div> : null}
                        </div>
                        <button onClick={handleBtnClick} {...animatedItem[2]}>
                            우측 이미지를 클릭해보세요!
                        </button>
                    </LeftContainer>
                    <RightContainer clickWhite={btnClick ? "#3f724d" : "#fff"} clickGreen={btnClick ? "#fff" : "#3f724d"} />
                    {btnClick ? (
                        <MobileMockupImg onClick={handleBtnClick}>
                            <img src={`${mobileImg}`} alt="MENTALTAL 메인 페이지 모바일 목업 이미지" />
                        </MobileMockupImg>
                    ) : (
                        <MockupImg onClick={handleBtnClick}>
                            <img src={`${desktopImg}`} alt="MENTALTAL 메인 페이지 데스크탑 목업 이미지" />
                        </MockupImg>
                    )}
                </IntroResponsiveContainer>
                <Footer />
            </IntroResponsivePageContainer>
        </>
    );
};

export default IntroResponsive;

const IntroResponsivePageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const IntroResponsiveContainer = styled.div`
    width: 100%;
    height: 63%;
    display: flex;
    position: relative;
`;

const LeftContainer = styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    padding: 0 6.7%;
    flex-direction: column;
    color: ${(props) => props.clickWhite};
    background-color: ${(props) => props.clickGreen};
    /* Nav height */
    padding-top: 65px;

    //420
    @media screen and (max-width: 521px) {
        padding: 0;
        align-items: center;
    }

    .title {
        font-size: 269%;
        font-weight: var(--font-bold);
        padding-bottom: 3%;
        @media screen and (max-width: 768px) {
            padding-bottom: 5%;
        }
        @media screen and (max-width: 521px) {
            font-size: 230%;
        }
        @media screen and (max-width: 476px) {
            font-size: 200%;
        }
        @media screen and (max-width: 443px) {
            font-size: 180%;
        }
        @media screen and (max-width: 420px) {
            font-size: 160%;
        }
    }
    .description {
        font-size: 131%;
        line-height: 35px;
        padding-bottom: 3%;
        @media screen and (max-width: 521px) {
            font-size: 120%;
            text-align: center;
        }
        @media screen and (max-width: 476px) {
            font-size: 118%;
        }
        @media screen and (max-width: 443px) {
            font-size: 110%;
        }
        @media screen and (max-width: 420px) {
            font-size: 100%;
        }
    }
    button {
        border-radius: 50px;
        font-size: 18px;
        font-weight: var(--font-bold);
        padding: 10px 30px;
        font-family: "Nanum Gothic", sans-serif;
        background-color: ${(props) => props.clickWhite};
        color: ${(props) => props.clickGreen};
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
`;

const RightContainer = styled.div`
    flex-grow: 1.9;
    height: 100%;
    background-color: var(--green);
    color: ${(props) => props.clickWhite};
    background-color: ${(props) => props.clickGreen};

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const MockupImg = styled.div`
    position: absolute;
    top: 20%;
    left: 60%;
    right: 10%;
    bottom: 20%;
    width: 40%;
    height: auto;
    border-radius: 20px;
    padding-top: 0.6%;
    @media screen and (max-width: 1024px) {
        display: none;
    }

    img {
        width: 50%;
        height: auto;

        transition: 1s ease;
        :hover {
            -webkit-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
            transition: 1s ease;
            cursor: pointer;
        }

        @media screen and (max-width: 1700px) {
            width: 55%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1600px) {
            width: 60%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1500px) {
            width: 65%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1400px) {
            width: 70%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1300px) {
            width: 75%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1270px) {
            width: 80%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1190px) {
            width: 85%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1080px) {
            width: 90%;
            transition: 0.5s;
        }
    }
`;

const MobileMockupImg = styled.div`
    position: absolute;
    top: 16%;
    left: 63%;
    bottom: 10%;
    width: 20%;
    height: auto;

    @media screen and (max-width: 1473px) {
        left: 63.5%;
    }
    @media screen and (max-width: 1365px) {
        left: 64%;
    }
    @media screen and (max-width: 1300px) {
        top: 19%;
    }
    @media screen and (max-width: 1233px) {
        left: 65%;
    }
    @media screen and (max-width: 1127px) {
        left: 65.5%;
        top: 22%;
    }
    @media screen and (max-width: 1080px) {
        left: 66%;
        top: 20%;
    }
    @media screen and (max-width: 1040px) {
        left: 67%;
    }
    @media screen and (max-width: 1024px) {
        display: none;
    }
    img {
        width: 60%;
        height: auto;
        padding-top: 7%;

        transition: 1s ease;
        :hover {
            -webkit-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
            transition: 1s ease;
            cursor: pointer;
        }

        @media screen and (max-width: 1675px) {
            width: 65%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1585px) {
            width: 70%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1485px) {
            width: 75%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1432px) {
            padding-top: 10%;
        }
        @media screen and (max-width: 1375px) {
            width: 80%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1233px) {
            width: 85%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1136px) {
            width: 90%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1080px) {
            /* width: 120%; */
            width: 95%;
            transition: 0.5s;
        }
        @media screen and (max-width: 1024px) {
            display: none;
        }
    }
`;

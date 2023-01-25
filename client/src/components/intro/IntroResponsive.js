import styled from "styled-components";
import Footer from "../Footer";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const IntroResponsive = () => {
    // false인 경우 데스크탑 목업 이미지, true인 경우 모바일 목업 이미지
    const [btnClick, setBtnClick] = useState(false);
    const handleBtnClick = () => {
        setBtnClick(!btnClick);
    };

    return (
        <>
            <NavSize />
            <IntroResponsiveContainer>
                <LeftContainer onClickWhite={btnClick ? "#fff" : "#3f724d"} onClickGreen={btnClick ? "#3f724d" : "#fff"}>
                    <div className="title">반응형 웹 서비스</div>
                    <div className="description">
                        다양한 환경을 고려하여
                        <br />
                        화면 크기에 맞게{useMediaQuery({ maxWidth: 606 }) ? <br /> : null} 반응형 웹을 구현했습니다.
                        {useMediaQuery({ maxWidth: 768 }) ? <div className="addDescription">화면 너비를 조정해보세요!</div> : null}
                    </div>
                    <button onClick={handleBtnClick}>화면 너비를 조정해보세요!</button>
                </LeftContainer>
                <RightContainer onClickWhite={btnClick ? "#3f724d" : "#fff"} onClickGreen={btnClick ? "#fff" : "#3f724d"} />
                {btnClick ? <MobileMockupImg /> : <MockupImg />}
            </IntroResponsiveContainer>
            <Footer />
        </>
    );
};

export default IntroResponsive;

const NavSize = styled.div`
    height: 65px;
`;

const IntroResponsiveContainer = styled.div`
    width: 100%;
    height: 56%;
    display: flex;
    position: relative;
`;

const LeftContainer = styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    padding: 0 100px;
    flex-direction: column;
    color: ${(props) => props.onClickWhite};
    background-color: ${(props) => props.onClickGreen};

    @media screen and (max-width: 420px) {
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
        background-color: ${(props) => props.onClickWhite};
        color: ${(props) => props.onClickGreen};
        :hover {
            background-color: var(--lightgreen);
            transition: 1s;
        }
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
`;

const RightContainer = styled.div`
    flex-grow: 1.9;
    height: 100%;
    background-color: var(--green);
    color: ${(props) => props.onClickWhite};
    background-color: ${(props) => props.onClickGreen};

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const MockupImg = styled.div`
    position: absolute;
    top: 20%;
    left: 50%;
    right: 10%;
    bottom: 20%;
    width: 40%;
    height: auto;
    border: 1px solid;
    border-radius: 20px;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const MobileMockupImg = styled.div`
    position: absolute;
    top: 13%;
    left: 63%;
    /* right: 15%; */
    bottom: 10%;
    width: 18%;
    height: auto;
    border: 1px solid;
    border-radius: 20px;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

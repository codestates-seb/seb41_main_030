import styled from "styled-components";
import useScrollFadeIn from "./useScrollFadeIn";
import centerImg from "../../icons/intro-center-img.png";
import mobileCenterImg from "../../icons/intro-mobile-center-img.png";
import { useMediaQuery } from "react-responsive";

const IntroCenter = () => {
    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 1, 1),
    };

    return (
        <>
            <IntroCenterContainer>
                <div className="title" {...animatedItem[0]}>
                    상담 센터 추천
                </div>
                <div className="description" {...animatedItem[1]}>
                    전문 기관의 도움이 필요하다면, {useMediaQuery({ maxWidth: 873 }) ? <br /> : null} 가까운 상담 센터를 {useMediaQuery({ maxWidth: 562 }) ? <br /> : null} 카카오맵에서 둘러보세요.
                </div>
                {useMediaQuery({ maxWidth: 768 }) ? (
                    <img src={`${mobileCenterImg}`} {...animatedItem[2]} className="mobile" alt="MENTALTAL 상담센터 페이지 모바일 목업 이미지" />
                ) : (
                    <img src={`${centerImg}`} {...animatedItem[2]} className="desktop" alt="MENTALTAL 상담센터 페이지 데스크탑 목업 이미지" />
                )}
            </IntroCenterContainer>
        </>
    );
};

export default IntroCenter;

const IntroCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--green);
    padding: 9%;
    padding-top: 10%;

    @media screen and (max-width: 768px) {
        padding: 15%;
    }

    .title {
        font-size: 45px;
        font-weight: var(--font-bold);

        @media screen and (max-width: 768px) {
            font-size: 38px;
        }
    }
    .description {
        font-size: 20px;
        padding-top: 30px;
        text-align: center;
        line-height: 130%;

        @media screen and (max-width: 768px) {
            font-size: 18px;
        }
        @media screen and (max-width: 455px) {
            display: none;
        }
    }
    img {
        &.desktop {
            width: auto;
            height: 85%;
            margin-top: 40px;

            @media screen and (max-width: 1195px) {
                max-width: 100%;
                height: auto;
            }
        }
        &.mobile {
            width: auto;
            height: 90%;
            margin-top: 20px;

            @media screen and (max-width: 562px) {
                max-width: auto;
                height: 80%;
            }
        }
    }
`;

import styled from "styled-components";
import Footer from "../Footer";
import useScrollFadeIn from "./useScrollFadeIn";
import centerImg from "../../icons/intro-center-img.png";

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
                    전문 기관의 도움이 필요하다면, 가까운 상담 센터를 카카오맵에서 둘러보세요.
                </div>
                <img src={`${centerImg}`} className="mockupImg" {...animatedItem[2]} />
                {/* <div className="mockupImg" {...animatedItem[2]}></div> */}
            </IntroCenterContainer>
            <Footer />
        </>
    );
};

export default IntroCenter;

const IntroCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: "Nanum Gothic", sans-serif;
    color: var(--green);
    padding: 100px;

    .title {
        font-size: 45px;
        font-weight: var(--font-bold);
    }
    .description {
        font-size: 20px;
        padding-top: 30px;
    }
    .mockupImg {
        /* width: 80%; */
        /* height: 528px; */
        height: 85%;
        margin-top: 40px;
    }
`;

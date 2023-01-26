import styled from "styled-components";
import { Link } from "react-router-dom";
import SelfCheckResultConfirm from "./SelfCheckResultConfirm";

const SelfCheckResultMain = () => {
    const dataList = [
        {
            title: "전문가의 도움이 필요하신가요?",
            explain: "여러분의 고민과 괴로움을 전문가가 들어드리겠습니다.",
            url: "/counselor",
            word: "전문가",
        },
        {
            title: "전문 상담기관을 찾고 계신가요?",
            explain: "신뢰할 수 있는 전문기관들이 준비되어 있습니다.",
            url: "/counselingcenter",
            word: "전문기관",
        },
        {
            title: "고민을 털어놓는건 어떠세요?",
            explain: "나와 비슷한 고민을 가진 사람들과 마음속 이야기를 나누어 보세요.",
            url: "/community",
            word: "커뮤니티",
        },
    ];

    return (
        <SCResultMainWrapper>
            <SCResultMainBox>
                <SCResultConfirmWrapper>
                    <SelfCheckResultConfirm />
                </SCResultConfirmWrapper>

                <SCResultMainNavBtnWrapper className="SCResultMainNavBtnWrapperPc">
                    {dataList.map((el, idx) => (
                        <SCResultMainNavBox key={idx}>
                            <SCResultMainNavText>
                                <div>{el.title}</div>
                                <div>{el.explain}</div>
                            </SCResultMainNavText>
                            <SCResultMainNavLink to={el.url}>
                                <button>{el.word} 바로가기</button>
                            </SCResultMainNavLink>
                        </SCResultMainNavBox>
                    ))}
                </SCResultMainNavBtnWrapper>

                <SCResultMainNavBtnWrapperMobile>
                    {dataList.map((el, idx) => (
                        <button key={idx}>{el.word} 바로가기</button>
                    ))}
                </SCResultMainNavBtnWrapperMobile>
            </SCResultMainBox>
        </SCResultMainWrapper>
    );
};

const SCResultMainWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
`;

const SCResultMainBox = styled.div`
    width: 100%;
    max-width: 1500px;
    padding: 60px 100px;

    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;

        .SCResultMainNavBtnWrapperPc {
            display: none;
        }
    }

    @media screen and (max-width: 920px) {
        padding: 40px;
    }
`;

const SCResultConfirmWrapper = styled.div`
    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media screen and (max-width: 768px) {
        width: 100%;
        min-height: 40vh;
    }
`;

const SCResultMainNavBtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SCResultMainNavBox = styled.div`
    padding: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    background-color: var(--lightgreen2);
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    & > :nth-child(2) {
        align-items: flex-end;
    }
`;

const SCResultMainNavText = styled.div`
    font-family: "Nanum Gothic", sans-serif;
    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 1.1rem;
        font-weight: var(--font-bold);
        margin-bottom: 10px;
    }

    & :nth-child(2) {
        font-size: 0.9rem;
        line-height: 1rem;
    }

    @media screen and (max-width: 1013px) {
        & :nth-child(1) {
            font-size: 0.95rem;
        }

        & :nth-child(2) {
            font-size: 0.8rem;
            line-height: 0.9rem;
        }
    }
`;

const SCResultMainNavLink = styled(Link)`
    display: flex;
    justify-content: flex-end;

    button {
        font-family: "Nanum Gothic", sans-serif;
    }

    @media screen and (max-width: 1013px) {
        button {
            font-size: 0.8rem;
        }
    }
`;

const SCResultMainNavBtnWrapperMobile = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;

        button {
            font-size: 0.7rem;
            min-height: 60px;
        }
    }
`;

export default SelfCheckResultMain;

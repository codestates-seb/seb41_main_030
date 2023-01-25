import styled from "styled-components";
import { Link } from "react-router-dom";
import SelfCheckResulConfirm from "./SelfCheckResulConfirm";

const SelfCheckResultMain = () => {
    const dataList = [
        {
            title: "전문가의 도움이 필요하신가요?",
            explain: "여러분의 고민과 괴로움을 전문가가 들어드리겠습니다.",
            url: "/counselors",
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
            <SCResultConfirmWrapper>
                <SelfCheckResulConfirm />
            </SCResultConfirmWrapper>

            <SCResultMainNavBtnWrapper>
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
        </SCResultMainWrapper>
    );
};

const SCResultMainWrapper = styled.div`
    width: 100%;
    height: 70vh;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const SCResultConfirmWrapper = styled.div`
    width: 50vw;
    height: 60vh;

    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const SCResultMainNavBtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SCResultMainNavBox = styled.div`
    width: 22vw;
    height: 18.5vh;
    padding: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    background-color: var(--lightgreen2);
    border-radius: 10px;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.2);

    & > :nth-child(2) {
        align-items: flex-end;
    }
`;

const SCResultMainNavText = styled.div`
    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 20px;
        font-weight: var(--font-bold);
        margin-bottom: 10px;
    }
`;

const SCResultMainNavLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
`;

export default SelfCheckResultMain;

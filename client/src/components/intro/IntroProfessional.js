import styled from "styled-components";
import useScrollFadeIn from "./useScrollFadeIn";

const IntroProfessional = () => {
    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 1, 1),
        3: useScrollFadeIn("down", 1, 1.5),
    };

    return (
        <>
            <IntroProContainer>
                <LeftContent>
                    <div className="title" {...animatedItem[0]}>
                        상담 전문가
                    </div>
                    <div className="subTitle" {...animatedItem[1]}>
                        상담 전문가와 일반 회원 구분 관리
                    </div>
                    <div className="description" {...animatedItem[2]}>
                        상담 전문가 추천 페이지를 둘러보세요.
                        <br />
                        고민글을 작성하고 추천수가 높아지면
                        <br />
                        상담 전문가 회원의 답변도 받을 수 있습니다.
                    </div>
                    <div className="buttonContainer" {...animatedItem[3]}>
                        <button className="professionalBtn">상담사 보기</button>
                        <button className="writeBtn">고민글 작성하기</button>
                    </div>
                </LeftContent>
                <RightContent></RightContent>
            </IntroProContainer>
        </>
    );
};

export default IntroProfessional;

const IntroProContainer = styled.div`
    background-color: var(--green);
    display: flex;
    width: 100%;
    height: 100%;
    font-family: "Nanum Gothic", sans-serif;
    padding: 100px;
`;

const LeftContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        font-size: 45px;
        font-weight: var(--font-bold);
    }
    .subTitle {
        font-size: 21px;
        font-weight: var(--font-bold);
        padding: 30px 0;
    }
    .description {
        font-size: 21px;
        line-height: 35px;
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

            &.professionalBtn {
                margin-right: 20px;
            }
            :hover {
                background-color: var(--lightgreen);
                color: var(--white);
            }
        }
    }
`;

const RightContent = styled.div`
    border: 1px solid lightgrey;
    flex-grow: 1;
    flex-basis: 0;
`;

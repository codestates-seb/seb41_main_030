import styled from "styled-components";
import useScrollFadeIn from "./useScrollFadeIn";
import { Link } from "react-router-dom";

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
                        심리 자가진단
                    </div>
                    <div className="subTitle" {...animatedItem[1]}>
                        {/* MENTALTAL이 알려주는 자가진단 테스트 */}
                        당신의 마음 상태는?
                    </div>
                    <div className="description" {...animatedItem[2]}>
                        MENTALTAL에서 제공하는 문항 체크를 통해
                        <br />
                        성인우울증, 스트레스에 대한
                        <br />
                        나의 마음 상태를 간단하게 확인해보세요.
                    </div>
                    <div className="buttonContainer" {...animatedItem[3]}>
                        <Link to="/selfcheck">
                            <button>자가진단하러 가기</button>
                        </Link>
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
        font-size: 43px;
        font-weight: var(--font-bold);
    }
    .subTitle {
        font-size: 23px;
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

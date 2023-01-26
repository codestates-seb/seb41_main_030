import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selfCheckState } from "../../states";
import SelfCheckTable from "./SelfCheckTable";
import { depression, stress } from "./selfCheckDummy";
import SelfCheckError from "./SelfCheckError";

const SelfCheckMain = () => {
    const navigate = useNavigate();
    const [isAllSelect, setIsAllSelect] = useState(false);
    const [result, setResult] = useRecoilState(selfCheckState);
    const [isOn, setIsOn] = useState(false);
    const [accordionIndex, setAccordionIndex] = useState(null);
    const [accordionData] = useState([
        {
            id: 0,
            name: "성인우울증검사",
        },
        {
            id: 1,
            name: "스트레스",
        },
    ]);

    const accordionMainBoxBtnHandle = (e, idx) => {
        setAccordionIndex(idx);
        setResult((current) => ({ ...current, type: e.target.value }));
    };

    const calculationSelfCheck = () => {
        // 계산
        let obj = document.querySelectorAll(".radioBtn");
        let count = 0;
        let check = 0;
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].checked === true) {
                count += parseInt(obj[i].value);
                check += 1;
            }
        }

        setResult((current) => ({ ...current, count: count }));

        // 다 선택되었는지 확인
        const depressionStandard = result.type === "성인우울증검사" && check === 9;
        const stressStandard = result.type === "스트레스" && check === 15;

        if (depressionStandard || stressStandard) {
            setIsAllSelect(!isAllSelect);
            navigate("/selfcheckresult");
        }

        setIsAllSelect(!isAllSelect);
    };

    return (
        <Wrapper>
            <SCMainWrapper>
                <SCAccordionTitle>
                    <button
                        onClick={() => {
                            setIsOn(!isOn);
                        }}
                    >
                        <div>자가진단 항목 선택하기</div>
                        {isOn ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                    </button>
                </SCAccordionTitle>

                <SCAccordionMain>
                    {isOn ? (
                        <SCAccordionMainBox>
                            {accordionData.map((el, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            accordionMainBoxBtnHandle(e, idx);
                                        }}
                                        value={el.name}
                                        className={accordionIndex === idx ? "accordionActive" : null}
                                    >
                                        {el.name}
                                    </button>
                                );
                            })}
                        </SCAccordionMainBox>
                    ) : null}
                </SCAccordionMain>

                <SCTableWrapper>
                    {accordionIndex === 0 ? (
                        <SelfCheckTable title={"성인우울증검사"} data={depression.list} type={depression.thead} />
                    ) : accordionIndex === 1 ? (
                        <SelfCheckTable title={"스트레스"} data={stress.list} type={stress.thead} />
                    ) : (
                        <div className="none">메뉴에서 자가진단할 테스트를 선택해주세요.</div>
                    )}
                    {isAllSelect ? <SelfCheckError /> : null}
                </SCTableWrapper>

                <SCTableResultBtn>{accordionIndex === 0 || accordionIndex === 1 ? <button onClick={calculationSelfCheck}>결과보기</button> : null}</SCTableResultBtn>
            </SCMainWrapper>

            <div className="mobileWrapper">
                <div className="mobileBox">
                    <div>자가진단은 pc 화면에 최적화되어있습니다. </div>
                    <div>pc로 진행해주세요.</div>
                </div>
            </div>
        </Wrapper>
    );
};

// styled components
const Wrapper = styled.div`
    width: 100%;
    background-color: var(--lightgreen2);

    display: flex;
    justify-content: center;

    .mobileWrapper {
        display: none;
    }

    @media screen and (min-width: 0) and (max-width: 700px) {
        .mobileWrapper {
            width: 100%;
            height: 500px;
            background-color: var(--lightgreen2);

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .mobileBox {
            width: 85%;
            height: 80%;
            border-radius: 10px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;

            background-color: white;
            color: var(--darkgreen);

            font-family: "Nanum Gothic", sans-serif;
            font-weight: var(--font-medium);
            font-size: 0.9rem;
        }
    }
`;

const SCMainWrapper = styled.div`
    width: 100%;
    max-width: 1500px;
    padding: 60px 100px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .resultBtn {
        width: 200px;
        height: 40px;
        font-size: 16px;
        font-weight: 600;
    }

    @media screen and (min-width: 0) and (max-width: 700px) {
        display: none;
    }

    @media screen and (max-width: 920px) {
        padding: 40px;
    }
`;

const SCAccordionTitle = styled.div`
    width: 100%;

    button {
        width: 100%;
        padding: 15px;
        background-color: white;
        color: var(--darkgreen);

        display: flex;
        justify-content: space-between;
    }

    button > div {
        font-family: "Nanum Gothic", sans-serif;
        font-weight: var(--font-medium);
        font-size: 0.9rem;
    }
`;

const SCAccordionMain = styled.div`
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    div :nth-child(1) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    div :nth-child(2) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`;

const SCAccordionMainBox = styled.div`
    background-color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    width: 100%;

    button {
        padding: 15px;

        background-color: white;
        color: var(--darkgreen);

        font-family: "Nanum Gothic", sans-serif;
        font-weight: var(--font-medium);
        font-size: 0.9rem;

        display: flex;
    }

    .accordionActive {
        font-weight: 900;
        background-color: RGBA(63, 114, 77, 0.2);
    }
`;

const SCTableWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
    width: 100%;
    position: relative;

    .none {
        width: 100%;
        min-height: 300px;
        padding: 20px;

        border-radius: 10px;
        background-color: white;
        color: var(--darkgreen);

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const SCTableResultBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
        width: 200px;
        height: 40px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: var(--font-medium);
        font-size: 0.9rem;
    }
`;

export default SelfCheckMain;

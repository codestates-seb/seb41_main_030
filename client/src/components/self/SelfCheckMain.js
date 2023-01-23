import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selfCheckState, selfCheckErrorState } from "../../states";
import SelfCheckTable from "./SelfCheckTable";
import { deression, stress } from "./selfCheckDummy";
import SelfCheckError from "./SelfrCheckError";

const SelfCheckMain = () => {
    useEffect(() => {
        setError(false);
    }, []);

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
    const [result, setResult] = useRecoilState(selfCheckState);
    const [error, setError] = useRecoilState(selfCheckErrorState);
    const navigate = useNavigate();

    const accodionMainBoxBtnHandle = (e, idx) => {
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
            setError(false);
            navigate("/selfcheckresult");
        }

        setError(true);
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
                                            accodionMainBoxBtnHandle(e, idx);
                                        }}
                                        value={el.name}
                                        className={accordionIndex === idx ? "accodionActive" : null}
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
                        <SelfCheckTable title={"성인우울증검사"} data={deression.list} type={deression.thead} />
                    ) : accordionIndex === 1 ? (
                        <SelfCheckTable title={"스트레스"} data={stress.list} type={stress.thead} />
                    ) : (
                        <div className="none">메뉴에서 자가진단할 테스트를 선택해주세요.</div>
                    )}
                    {error ? <SelfCheckError /> : null}
                </SCTableWrapper>

                <SCTableResultBtn>{accordionIndex === 0 || accordionIndex === 1 ? <button onClick={calculationSelfCheck}>결과보기</button> : null}</SCTableResultBtn>
            </SCMainWrapper>

            <div className="mobile">
                <div className="wrapper">
                    <div>자가진단은 pc 화면에 최적화되어있습니다. </div>
                    <div>pc로 진행해주세요.</div>
                </div>
            </div>
        </Wrapper>
    );
};

// styled components
const Wrapper = styled.div`
    .mobile {
        display: none;
    }

    @media screen and (min-width: 0) and (max-width: 700px) {
        .mobile {
            width: 100%;
            height: 500px;
            background-color: var(--lightgreen2);

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .wrapper {
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
            font-weight: 600;
            font-size: 1rem;
        }
    }
`;

const SCMainWrapper = styled.div`
    background-color: var(--lightgreen2);
    width: 100%;
    padding: 40px;

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
`;

const SCAccordionTitle = styled.div`
    width: 77%;

    button {
        width: 100%;
        padding: 15px;
        background-color: white;
        color: var(--darkgreen);

        display: flex;
        justify-content: space-between;
    }

    button > div {
        font-size: 16px;
        font-weight: 600;
    }

    @media screen and (max-width: 1100px) {
        width: 99%;
    }
`;

const SCAccordionMain = styled.div`
    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 77%;

    div :nth-child(1) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    div :nth-child(2) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    @media screen and (max-width: 1100px) {
        width: 99%;
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

        font-size: 15px;
        font-weight: 600;

        display: flex;
    }

    .accodionActive {
        font-weight: 900;
        background-color: RGBA(63, 114, 77, 0.2);
    }
`;

const SCTableWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
    width: 77%;
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

    @media screen and (max-width: 1100px) {
        width: 99%;
    }
`;

const SCTableResultBtn = styled.div`
    width: 77%;
    display: flex;
    justify-content: flex-end;

    button {
        width: 200px;
        height: 40px;
        font-size: 16px;
        font-weight: 600;
    }

    @media screen and (max-width: 1100px) {
        width: 99%;
    }
`;

export default SelfCheckMain;

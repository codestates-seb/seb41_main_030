import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selfCheckState } from "../../states";
import { useEffect } from "react";

const SelfCheckResultMain = () => {
    const result = useRecoilValue(selfCheckState);
    const resultType = result.type;
    const resultCount = result.count;
    let resultTitle = "";
    let resultText = [];

    const confirm = () => {
        if (resultType === "성인우울증검사") {
            if (resultCount >= 0 && resultCount <= 4) {
                resultTitle = "평균 이하의 스트레스";
                resultText = ["특별한 문제가 없다고 생각할 수 있습니다."];
            }

            if (resultCount >= 5 && resultCount <= 9) {
                resultTitle = "평균 수준의 스트레스";
                resultText = [
                    "다소 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다.",
                    "다만, 이러한 기분 상태가 지속될 경우 개인의 신체적, 심리적 대처자원을 저하시킬 수 있습니다.",
                    "그러한 경우, 가까운 지역센터나 전문기관을 방문하시기 바랍니다.",
                ];
            }

            if (resultCount >= 10 && resultCount <= 19) {
                resultTitle = "중간 정도의 우울";
                resultText = [
                    "중간 정도 수준의 우울감이 시사됩니다.",
                    "이러한 수준의 우울감은 흔히 신체적, 심리적, 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다.",
                    "가까운 지역센터나 전문기관을 방문하여 보다 상세한 평가와 도움을 받아보시기 바랍니다.",
                ];
            }

            if (resultCount >= 20 && resultCount <= 27) {
                resultTitle = "심한 우울";
                resultText = ["심한 수준의 우울감이 시사됩니다.", "전문기관의 치료적 개입과 평가가 요구됩니다."];
            }
        }

        if (resultType === "스트레스") {
            if (resultCount >= 0 && resultCount <= 5) {
                resultTitle = "우울 아님";
                resultText = ["유의한 수준의 우울감이 시사되지 않습니다."];
            }

            if (resultCount >= 6 && resultCount <= 12) {
                resultTitle = "가벼운 우울";
                resultText = [
                    "다소 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다.",
                    "다만, 이러한 기분 상태가 지속될 경우 개인의 신체적, 심리적 대처자원을 저하시킬 수 있습니다.",
                    "그러한 경우, 가까운 지역센터나 전문기관을 방문하시기 바랍니다.",
                ];
            }

            if (resultCount >= 13 && resultCount <= 19) {
                resultTitle = "중간 정도의 우울";
                resultText = [
                    "중간 정도 수준의 우울감이 시사됩니다.",
                    "이러한 수준의 우울감은 흔히 신체적, 심리적, 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다.",
                    "가까운 지역센터나 전문기관을 방문하여 보다 상세한 평가와 도움을 받아보시기 바랍니다.",
                ];
            }

            if (resultCount >= 20) {
                resultTitle = "심한 우울";
                resultText = ["심한 수준의 우울감이 시사됩니다.", "전문기관의 치료적 개입과 평가가 요구됩니다."];
            }
        }

        return {
            resultTitle: resultTitle,
            resultText: resultText,
        };
    };

    console.log(confirm());

    return (
        <SCResultMainWrapper>
            <SCResultMainBox>
                <div>자가진단 테스트 결과</div>
                <div></div>
            </SCResultMainBox>
            <SCResultMainNavBtnWrapper>
                <div className="SCResultMainNavBtnBox">
                    <div>
                        <div>전문가의 도움이 필요하신가요?</div>
                    </div>
                    <Link to={"/counselors"}>
                        <button>전문가 바로가기</button>
                    </Link>
                </div>

                <div className="SCResultMainNavBtnBox">
                    <div>
                        <div>전문 상담기관을 찾고 계신가요?</div>
                    </div>
                    <Link to={"/counselingcenter"}>
                        <button>전문기관 바로가기</button>
                    </Link>
                </div>

                <div className="SCResultMainNavBtnBox">
                    <div>
                        <div>고민을 털어놓는건 어떠세요?</div>
                    </div>
                    <Link to={"/community"}>
                        <button>커뮤니티 바로가기</button>
                    </Link>
                </div>
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

const SCResultMainBox = styled.div`
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

    .SCResultMainNavBtnBox {
        width: 22vw;
        height: 18.5vh;
        padding: 15px;

        background-color: var(--lightgreen2);
        border-radius: 10px;
        box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.2);
    }
`;

export default SelfCheckResultMain;

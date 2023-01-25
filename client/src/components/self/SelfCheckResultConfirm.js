import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { selfCheckState } from "../../states";
import { Link } from "react-router-dom";

const SelfCheckResultConfirm = () => {
    const result = useRecoilValue(selfCheckState);

    let resultType = result.type;
    let resultCount = result.count;
    let resultTitle,
        resultText,
        resultRange = "";

    const confirm = () => {
        if (resultType === "성인우울증검사") {
            if (resultCount >= 0 && resultCount <= 4) {
                resultTitle = "우울 아님";
                resultText = ["유의한 수준의 우울감이 시사되지 않습니다."];
                resultRange = "0 ~ 4";
            }

            if (resultCount >= 5 && resultCount <= 9) {
                resultTitle = "가벼운 우울";
                resultText = [
                    "다소 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다.",
                    "다만, 이러한 기분 상태가 지속될 경우 개인의 신체적, 심리적 대처자원을 저하시킬 수 있습니다.",
                    "그러한 경우, 가까운 지역센터나 전문기관을 방문하시기 바랍니다.",
                ];
                resultRange = "5 ~ 9";
            }

            if (resultCount >= 10 && resultCount <= 19) {
                resultTitle = "중간 정도의 우울";
                resultText = [
                    "중간 정도 수준의 우울감이 시사됩니다.",
                    "이러한 수준의 우울감은 흔히 신체적, 심리적, 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다.",
                    "가까운 지역센터나 전문기관을 방문하여 보다 상세한 평가와 도움을 받아보시기 바랍니다.",
                ];
                resultRange = "10 ~ 19";
            }

            if (resultCount >= 20 && resultCount <= 27) {
                resultTitle = "심한 우울";
                resultText = ["심한 수준의 우울감이 시사됩니다.", "전문기관의 치료적 개입과 평가가 요구됩니다."];
                resultRange = "20 ~ 27";
            }
        }

        if (resultType === "스트레스") {
            if (resultCount >= 0 && resultCount <= 5) {
                resultTitle = "평균 이하의 스트레스";
                resultText = ["평균 이하 수준으로 특별한 문제가 없다고 생각할 수 있습니다."];
                resultRange = "0 ~ 5";
            }

            if (resultCount >= 6 && resultCount <= 12) {
                resultTitle = "평균 수준의 스트레스";
                resultText = ["대개 직장을 가진 성인남녀의 평균 수준입니다."];
                resultRange = "6 ~ 12";
            }

            if (resultCount >= 13 && resultCount <= 19) {
                resultTitle = "평균보다 이상의 스트레스";
                resultText = ["평균보다 조금 높으므로 약간의 주의가 필요합니다."];
                resultRange = "13 ~ 19";
            }

            if (resultCount >= 20) {
                resultTitle = "위험 수준의 스트레스";
                resultText = ["위험수위, 상당한 주의의 스트레스로, 의사와의 상의가 필요합니다."];
                resultRange = "20 ~ 45";
            }
        }

        return {
            resultTitle,
            resultText,
            resultRange,
        };
    };

    confirm();

    return (
        <SCResultConfirmWrapper>
            {resultType === "" ? (
                <div className="none">
                    <div>자가진단을 먼저 진행해주세요</div>
                    <Link to="/selfcheck">
                        <button>바로가기</button>
                    </Link>
                </div>
            ) : (
                <>
                    <SCResultConfirmTitle>
                        <div>
                            {resultType} {resultType === "스트레스" ? "자가진단 테스트" : null} 결과
                        </div>
                        <div> 나의 {resultType === "성인우울증검사" ? "우울증" : "스트레스"}척도</div>
                    </SCResultConfirmTitle>
                    <SCResultConfirmCount>{resultCount}점</SCResultConfirmCount>
                    <SCResultConfirmResultInfo>
                        <div>
                            {resultRange}점: {resultTitle}
                        </div>
                        <div>{resultText}</div>
                    </SCResultConfirmResultInfo>
                </>
            )}
        </SCResultConfirmWrapper>
    );
};

const SCResultConfirmWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    color: var(--darkgreen);
    text-align: center;

    .none {
        font-size: 20px;
        font-weight: var(--font-bold);

        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const SCResultConfirmTitle = styled.div`
    font-size: 25px;
    font-weight: var(--font-bold);

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SCResultConfirmCount = styled.div`
    font-size: 45px;
    font-weight: var(--font-bold);
    color: var(--green);
`;

const SCResultConfirmResultInfo = styled.div`
    font-size: 18px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default SelfCheckResultConfirm;

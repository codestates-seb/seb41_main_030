import { useRecoilValue } from "recoil";
import { selfCheckState } from "../../states";

const ResultConfirm = () => {
    const result = useRecoilValue(selfCheckState);
    const resultType = result.type;
    const resultCount = result.count;
    let resultTitle = "";
    let resultText = [];

    if (resultType === "성인우울증검사") {
        if (resultCount >= 0 && resultCount <= 4) {
            resultTitle = "우울 아님";
            resultText = ["유의한 수준의 우울감이 시사되지 않습니다."];
        }

        if (resultCount >= 5 && resultCount <= 9) {
            resultTitle = "가벼운 우울";
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
        return console.log("스트레스");
    }

    return {
        resultTitle: resultTitle,
        resultText: resultText,
    };
};

export default ResultConfirm;

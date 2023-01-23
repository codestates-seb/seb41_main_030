import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { answerState } from "../../states";
import BoardDetailAnswer from "./BoardDetailAnswer";

const BoardDetailAnswerList = () => {
    const answers = useRecoilValue(answerState);

    return (
        <>
            <BDAWrapper>{answers && answers.map((answer, idx) => <BoardDetailAnswer answer={answer} key={idx} />)}</BDAWrapper>
        </>
    );
};

// styled components
const BDAWrapper = styled.ul`
    width: 80%;
    max-width: 1300px;

    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export default BoardDetailAnswerList;

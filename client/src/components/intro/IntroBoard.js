import styled from "styled-components";
// import BoardIconText from "./BoardIconText";
import boardIcon from "../../icons/intro-bubble.svg";
import writeIcon from "../../icons/intro-write.svg";
import tagIcon from "../../icons/intro-tag.svg";
import useScrollFadeIn from "./useScrollFadeIn";

const IntroBoard = () => {
    const introArray = [
        { key: 1, iconURL: boardIcon, text: "다양한 주제의 고민글 게시판" },
        { key: 2, iconURL: writeIcon, text: "고민글 & 답변 작성 기능" },
        { key: 3, iconURL: tagIcon, text: "고민글 주제 태그 기능" },
    ];

    const animatedItem = {
        0: useScrollFadeIn("down", 1, 0),
        1: useScrollFadeIn("down", 1, 0.5),
        2: useScrollFadeIn("down", 1, 1),
    };

    return (
        <>
            <IntroBoardContainer>
                <LeftContent></LeftContent>
                <RightContent>
                    <div className="title" {...animatedItem[0]}>
                        <span className="logo">MENTALTAL</span>
                        <span className="logoDescription">&nbsp;커뮤니티</span>
                    </div>
                    <div className="description" {...animatedItem[1]}>
                        나와 비슷한 고민을 가진 사람들과
                        <br />
                        이야기를 나누어 보세요.
                    </div>
                    <div className="board" {...animatedItem[2]}>
                        {introArray.map((element) => (
                            <BoardIconContainer key={element.key} icon={element.iconURL}>
                                <span>{element.text}</span>
                            </BoardIconContainer>
                        ))}
                    </div>
                </RightContent>
            </IntroBoardContainer>
        </>
    );
};

export default IntroBoard;

const IntroBoardContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    font-family: "Nanum Gothic", sans-serif;
    padding: 100px;
`;

const LeftContent = styled.div`
    border: 1px solid lightgrey;
    flex-grow: 1;
    flex-basis: 0;
    margin-top: 50px;
`;

const RightContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    color: var(--green);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 100px;
    margin-top: 50px;

    .title {
        font-size: 45px;
        .logoDescription {
            font-weight: var(--font-bold);
        }
        @media screen and (max-height: 602px) {
            font-size: 35px;
            margin-top: 80px;
        }
    }

    .description {
        font-size: 22px;
        line-height: 35px;
        padding-top: 17px;

        @media screen and (max-height: 602px) {
            font-size: 18px;
            line-height: 30px;
        }
    }

    .board {
        margin-top: 50px;
        @media screen and (max-height: 602px) {
            margin-top: 0;
        }
    }
`;

const BoardIconContainer = styled.div`
    height: 100px;
    background-image: url(${(props) => props.icon});
    background-repeat: no-repeat;
    background-position: left;
    background-size: 70px 70px;

    display: flex;
    align-items: center;
    padding-left: 90px;
    font-size: 22px;
    font-weight: var(--font-bold);

    margin-bottom: 10px;

    @media screen and (max-height: 602px) {
        background-size: 60px 60px;
        font-size: 18px;
        padding-left: 80px;
        margin-bottom: 0;
        height: 80px;
    }
`;

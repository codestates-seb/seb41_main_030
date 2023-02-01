import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardsHeader = () => {
    const navigate = useNavigate();

    return (
        <BoardsHeaderWrapper>
            <BoardsHeaderTitle>
                <div className="logo">MENTALTAL 커뮤니티</div>
                <div>마음껏 고민을 털어놓을 수 있는 공간입니다.</div>
                <div>나와 비슷한 고민을 가진 사람들과 마음속 이야기를 나누어 보세요.</div>
            </BoardsHeaderTitle>

            <BoardsLink>
                <button onClick={() => navigate("/write")}>
                    고민 작성하기 <i className="fa-solid fa-chevron-right"></i>
                </button>
            </BoardsLink>
        </BoardsHeaderWrapper>
    );
};

export default BoardsHeader;

// styled components
const BoardsHeaderWrapper = styled.header`
    width: 100%;
    height: 300px;
    padding: 60px 100px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    font-family: "Nanum Gothic", sans-serif;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 15px;
    }

    @media screen and (max-width: 920px) {
        padding: 40px;
        height: 250px;
    }
`;

const BoardsHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    color: var(--darkgreen);

    & :nth-child(1) {
        font-size: 2.5rem;
        font-weight: var(--font-bold);
        margin-bottom: 10px;
    }

    & :not(:nth-child(1)) {
        font-size: 0.95rem;
    }

    @media screen and (max-width: 387px) {
        gap: 5px;

        & :nth-child(1) {
            width: 120px;
        }
    }

    @media screen and (max-width: 768px) {
        & :nth-child(1) {
            font-size: 1.8rem;
        }

        & :not(:nth-child(1)) {
            font-size: 0.7rem;
        }
    }
`;

const BoardsLink = styled.div`
    button {
        font-family: "Nanum Gothic", sans-serif;
        border-radius: 30px;
        width: 300px;
        font-size: 0.9rem;
    }

    i {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 2px 3px;
        margin-left: 5px;
    }

    @media screen and (max-width: 768px) {
        width: 100px;

        button {
            font-size: 0.8rem;
            width: 100%;
        }

        i {
            display: none;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 960px) {
        button {
            width: 240px;
        }
    }
`;

import styled from "styled-components";
import { Link } from "react-router-dom";

const BoardsHeader = () => {
    return (
        <BoardsHeaderWrapper>
            <BoardsHeaderTitle>
                <div className="logo">MENTALTAL 커뮤니티</div>
                <div>마음껏 고민을 털어놓을 수 있는 공간입니다.</div>
                <div>나와 비슷한 고민을 가진 사람들과 마음속 이야기를 나누어 보세요.</div>
            </BoardsHeaderTitle>

            <BoardsLink to="/write">
                <button>
                    고민 작성하기 <i className="fa-solid fa-chevron-right"></i>
                </button>
            </BoardsLink>
        </BoardsHeaderWrapper>
    );
};

// styled components

const BoardsHeaderWrapper = styled.header`
    width: 100%;
    height: 300px;
    padding: 60px 100px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        font-size: 40px;
        font-weight: 900;
        margin-bottom: 10px;
    }

    & :not(:nth-child(1)) {
        font-size: 16px;
    }

    @media screen and (max-width: 387px) {
        gap: 5px;

        & :nth-child(1) {
            width: 120px;
        }
    }

    @media screen and (max-width: 768px) {
        & :nth-child(1) {
            font-size: 33px;
        }

        & :not(:nth-child(1)) {
            font-size: 14px;
        }
    }
`;

const BoardsLink = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    button {
        border-radius: 30px;
        width: 300px;
        font-size: 16px;
    }

    i {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        padding: 2px 3px;
        margin-left: 5px;
    }

    @media screen and (max-width: 768px) {
        button {
            font-size: 14px;
            width: 100%;
        }

        i {
            display: none;
        }
    }

    @media screen and (min-width: 769px) and (max-width: 920px) {
        button {
            width: 240px;
        }
    }
`;

export default BoardsHeader;

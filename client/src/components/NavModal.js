import styled from "styled-components";
import { Link } from "react-router-dom";

const NavModalWrapper = styled.ul`
    width: 150px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    position: absolute;
    right: 0px;
    top: 45px;

    padding: 15px;

    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);

    font-size: 15px;
    font-weight: 600;
    color: var(--darkgreen);

    li {
        padding: 10px;
    }
`;

const NavModal = ({ test }) => {
    return (
        <NavModalWrapper>
            <li>
                <Link to="/boards">커뮤니티</Link>
            </li>
            <li>
                <Link to="/counselors">전문가</Link>
            </li>
            {test ? (
                <>
                    <li>
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                    <li>로그아웃</li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/sign">회원가입</Link>
                    </li>
                </>
            )}
        </NavModalWrapper>
    );
};

export default NavModal;

import styled from "styled-components";
import { Link } from "react-router-dom";

const NavModal = ({ test, memberId }) => {
    const token = localStorage.getItem("loginToken");

    // 로그아웃 버튼 핸들러
    const logoutBtnHandle = () => {
        localStorage.removeItem("memberId");
        localStorage.removeItem("loginToken");
        window.location.reload();
    };

    return (
        <NavModalWrapper>
            <li>
                <Link to="/community">커뮤니티</Link>
            </li>
            <li>
                <Link to="/selfcheck">자가진단</Link>
            </li>
            <li>
                <Link to="/counselor">전문가</Link>
            </li>
            <li>
                <Link to="/counselingcenter">전문기관</Link>
            </li>
            {token && token !== "undefined" ? (
                <>
                    <li>
                        <Link to={`/mypage/${memberId}`}>마이페이지</Link>
                    </li>
                    <li onClick={logoutBtnHandle}>로그아웃</li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/signup">회원가입</Link>
                    </li>
                </>
            )}
        </NavModalWrapper>
    );
};

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
        cursor: pointer;
    }

    li:hover {
        font-weight: 900;
        transition: 0.5s;
    }
`;

export default NavModal;

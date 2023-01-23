import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavModal from "./NavModal";

const Nav = () => {
    // ! 임시 - 로그인이 구현될 시 교체 예정입니다.
    const [test, setTest] = useState(false);
    const handleTest = () => {
        setTest(!test);
    };
    // !

    // * 모달
    const [isOpen, setIsOpen] = useState(false);
    const handleNavModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavWrapper>
            <NavTitle>
                <Link to="/main" className="logo">
                    MENTALTAL
                </Link>
                {/* 삭제할 예정 */}
                <button onClick={handleTest}>0</button>
            </NavTitle>

            <NavContainer>
                <li>
                    <Link to="/community">커뮤니티</Link>
                </li>
                <li>
                    <Link to="/selfcheck">자가진단</Link>
                </li>
                <li>
                    <Link to="/counselors">전문가</Link>
                </li>
                <li>
                    <Link to="/counselingcenter">전문기관</Link>
                </li>
                {test ? (
                    <>
                        <li>
                            <button>
                                <Link to="/mypage">마이페이지</Link>
                            </button>
                        </li>
                        <li>
                            <button>로그아웃</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button>
                                <Link to="/login">로그인</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link to="/signup">회원가입</Link>
                            </button>
                        </li>
                    </>
                )}
            </NavContainer>

            <NavMedia>
                {isOpen ? <i className="fa-solid fa-x" onClick={handleNavModal}></i> : <i className="fa-solid fa-bars" onClick={handleNavModal}></i>}
                {isOpen ? <NavModal test={test} /> : null}
            </NavMedia>
        </NavWrapper>
    );
};

const NavWrapper = styled.nav`
    height: 65px;
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
`;

const NavTitle = styled.div`
    font-size: 28px;
    font-weight: 900;
    color: var(--green);

    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const NavContainer = styled.ul`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 17px;
    font-weight: 600;
    color: var(--darkgreen);

    button {
        font-size: 16px;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }

    li:hover {
        font-weight: 900;
        transition: 0.5s;
    }
`;

// * 600px 이하 스타일
const NavMedia = styled.div`
    display: none;
    position: relative;
    i {
        cursor: pointer;
        font-size: 25px;
        color: var(--green);
    }
    @media screen and (max-width: 768px) {
        display: block;
    }
`;

export default Nav;

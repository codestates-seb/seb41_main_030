import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavModal from "./NavModal";
import { memberIdState } from "../states/memberIdState";
import { useRecoilValue } from "recoil";

const Nav = () => {
    // 마이페이지 클릭 시 path
    const memberId = useRecoilValue(memberIdState);

    // local storage login token 확인
    const [istoken, setIstoken] = useState(false);

    //memberId의 여부로 Nav버튼 상태 변경
    useEffect(() => {
        if (memberId === null) {
            console.log(memberId);
        } else {
            setIstoken(true);
        }
    });
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
                {/* <button onClick={handleTest}>0</button> */}
            </NavTitle>

            <NavContainer>
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
                {istoken ? (
                    <>
                        <li>
                            <button>
                                <Link to={`/mypage/${memberId}`}>마이페이지</Link>
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
                {isOpen ? <NavModal test={test} memberId={memberId} /> : null}
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
    font-family: "Nanum Gothic", sans-serif;
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
        font-family: "Nanum Gothic", sans-serif;
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

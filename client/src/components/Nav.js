import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../states/memberIdState";
import NavModal from "./NavModal";
import axios from "axios";

const Nav = () => {
    const url = process.env.REACT_APP_SERVER_URL;
    const memberId = useRecoilValue(memberIdState); // 마이페이지 path
    const token = sessionStorage.getItem("loginToken");

    // 로그아웃 버튼 핸들러
    const logoutBtnHandle = () => {
        axios({
            method: "post",
            url: `${url}/members/logout`,
            headers: {
                Authorization: token,
            },
        })
            .then((res) => {
                sessionStorage.clear();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 모바일 환경 nav 모달
    const [isOpen, setIsOpen] = useState(false);
    const handleNavModal = () => {
        setIsOpen(!isOpen);
    };

    // 메뉴 클릭시 엑티브 메뉴이면 스타일 다르게
    const [isActive, setIsActive] = useState(null);
    const activeNavHandle = (e) => {
        setIsActive(e.target.innerText);
    };

    // 메뉴 map
    const [navList] = useState([
        {
            name: "소개",
            url: "/",
        },
        {
            name: "커뮤니티",
            url: "/community",
        },
        {
            name: "자가진단",
            url: "/selfcheck",
        },
        {
            name: "전문가",
            url: "/counselor",
        },
        {
            name: "전문기관",
            url: "/counselingcenter",
        },
    ]);

    return (
        <NavWrapper>
            <NavTitle>
                <Link to="/main" className="logo" onClick={(e) => activeNavHandle(e)}>
                    MENTALTAL
                </Link>
            </NavTitle>

            <NavContainer>
                {navList.map((el, idx) => (
                    <NavBox key={idx}>
                        <Link to={el.url} onClick={(e) => activeNavHandle(e)} className={isActive === el.name ? "activeNav" : null}>
                            {el.name}
                        </Link>
                    </NavBox>
                ))}

                {token && token !== "undefined" ? (
                    <>
                        <li>
                            <Link to={`/mypage/${memberId}`} onClick={(e) => activeNavHandle(e)}>
                                <button>마이페이지</button>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logoutBtnHandle}>로그아웃</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" onClick={(e) => activeNavHandle(e)}>
                                <button>로그인</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" onClick={(e) => activeNavHandle(e)}>
                                <button>회원가입</button>
                            </Link>
                        </li>
                    </>
                )}
            </NavContainer>

            <NavMedia>
                {isOpen ? <i className="fa-solid fa-x" onClick={handleNavModal}></i> : <i className="fa-solid fa-bars" onClick={handleNavModal}></i>}
                {isOpen ? <NavModal memberId={memberId} setIsActive={setIsActive} isActive={isActive} /> : null}
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

    @media screen and (max-width: 870px) {
        display: none;
    }
`;

const NavBox = styled.li`
    position: relative;

    &::after {
        position: absolute;
        left: 50%;
        width: 0;

        border-bottom: 3px solid var(--lightgreen);

        content: "";
        display: block;
    }

    &:hover::after {
        transition: all 250ms ease-out;
        left: 0%;
        top: 18px;
        width: 100%;
    }

    .activeNav {
        border-bottom: 3px solid var(--lightgreen);
    }
`;

// 600px 이하 스타일
const NavMedia = styled.div`
    display: none;
    position: relative;

    i {
        cursor: pointer;
        font-size: 25px;
        color: var(--green);
    }

    @media screen and (max-width: 870px) {
        display: block;
    }
`;

export default Nav;

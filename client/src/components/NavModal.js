import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavModal = ({ test, memberId }) => {
    const token = localStorage.getItem("loginToken");

    // 로그아웃 버튼 핸들러
    const logoutBtnHandle = () => {
        localStorage.removeItem("memberId");
        localStorage.removeItem("loginToken");
        window.location.reload();
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
        <NavModalWrapper>
            {navList.map((el, idx) => (
                <>
                    <li key={idx}>
                        <Link to={el.url} onClick={(e) => activeNavHandle(e)} className={isActive === el.name ? "activeNav" : null}>
                            {el.name}
                        </Link>
                    </li>
                </>
            ))}

            {token && token !== "undefined" ? (
                <>
                    <li>
                        <Link to={`/mypage/${memberId}`} onClick={(e) => activeNavHandle(e)} className={isActive === "마이페이지" ? "activeNav" : null}>
                            마이페이지
                        </Link>
                    </li>
                    <li onClick={logoutBtnHandle}>로그아웃</li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login" onClick={(e) => activeNavHandle(e)} className={isActive === "로그인" ? "activeNav" : null}>
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" onClick={(e) => activeNavHandle(e)} className={isActive === "회원가입" ? "activeNav" : null}>
                            회원가입
                        </Link>
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
    }

    .activeNav {
        border-bottom: 3px solid var(--lightgreen);
    }
`;

export default NavModal;

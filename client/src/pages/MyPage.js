import styled from "styled-components";
import { useEffect, useState } from "react";
import MyPagePosts from "../components/mypage/MyPagePosts";
import MyPageAnswer from "../components/mypage/MyPageAnswer";
import MyPageEdit from "../components/mypage/MyPageEdit";

const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0 130px;
`;

const MyPageHeader = styled.div`
    display: flex;
    padding-top: 150px;
    padding-left: 20px;
    margin-bottom: 90px;
    .imgContainer {
        border-radius: 50%;
        background: var(--green);
        width: 120px;
        height: 120px;
        margin-right: 30px;
    }
    .textContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .userName {
            color: var(--darkgreen);
            font-size: 25px;
            font-weight: var(--font-bold);
        }

        .email,
        .leaveText {
            color: var(--green);
            padding-top: 8px;

            &.email {
                text-decoration: underline;
            }
        }
    }
`;

const MyPageTab = styled.div`
    margin-bottom: 20px;
    .tabContainer {
        display: flex;
    }

    .tabButton,
    .tabChecked {
        width: 156px;
        height: 55px;
        margin-right: 10px;
        font-size: 20px;
        font-weight: var(--font-bold);
    }

    .tabButton {
        color: var(--darkgreen);
        cursor: pointer;
        background-color: transparent;
    }

    .tabChecked {
        color: var(--white);
        background-color: var(--darkgreen);
    }

    .tabButton:hover {
        background-color: var(--lightgreen2);
    }

    .tabButton.tabChecked:hover {
        background-color: var(--darkgreen);
    }
`;

const MyPageBody = styled.div``;

const MyPage = ({ setIsFooter }) => {
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        setIsFooter(false);
        setUserData();
    }, []);

    const [openTab, setOpenTab] = useState([
        {
            id: 0,
            name: "작성한 글",
            url: "memberId/boards",
        },
        {
            id: 1,
            name: "작성한 답변",
            url: "memberId/answers",
        },
        {
            id: 2,
            name: "개인정보 수정",
            url: "members/edit",
        },
    ]);
    const [checked, setChecked] = useState(0);
    function tabHandle(index) {
        setChecked(index);
    }

    return (
        <>
            <MyPageContainer>
                <MyPageHeader>
                    <div className="imgContainer"></div>
                    <div className="textContainer">
                        <p className="userName">김코딩 님</p>
                        <p className="email">kimcoding@gmail.com</p>
                        <p className="leaveText">회원 탈퇴</p>
                    </div>
                </MyPageHeader>
                <MyPageTab>
                    <div className="tabContainer">
                        {openTab.map((el, index) => {
                            return (
                                <button key={index} className={checked === index ? "tabButton tabChecked" : "tabButton"} onClick={() => tabHandle(index)}>
                                    {el.name}
                                </button>
                            );
                        })}
                    </div>
                </MyPageTab>
                <MyPageBody>{checked === 0 ? <MyPagePosts /> : checked === 1 ? <MyPageAnswer /> : <MyPageEdit />}</MyPageBody>
            </MyPageContainer>
        </>
    );
};

export default MyPage;

import styled from "styled-components";
import { useEffect, useState } from "react";
import MyPagePosts from "../components/mypage/MyPagePosts";
import MyPageAnswer from "../components/mypage/MyPageAnswer";
import MyPageEdit from "../components/mypage/MyPageEdit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyPage = ({ setIsFooter }) => {
    const token = localStorage.getItem("loginToken");
    const { id } = useParams();
    const [userData, setUserData] = useState(undefined);
    const url = process.env.REACT_APP_SERVER_URL;

    const userProfileData = async (id) => {
        const member = await axios.get(`${url}/members/${id}`);
        return {
            nickName: member.data.data.nickName,
            email: member.data.data.email,
        };
    };

    useEffect(() => {
        setIsFooter(false);
        const userDataList = async () => {
            const userData2 = await userProfileData(id);
            setUserData(userData2);
        };
        userDataList();
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

    // 회원탈퇴 모달
    const [isOpen, setIsOpen] = useState(false);

    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    // 회원탈퇴 서버 연결
    const userDelete = () => {
        axios({
            method: "delete",
            url: `${url}/members/${id}`,
            headers: {
                Authorization: localStorage.getItem("loginToken"),
            },
        })
            .then((res) => {
                localStorage.removeItem("loginToken");
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <MyPageContainer>
                <MyPageHeader>
                    <div className="imgContainer"></div>
                    <div className="textContainer">
                        <p className="userName">{userData && userData.nickName} 님</p>
                        <p className="email">{userData && userData.email}</p>
                        <p className="deleteUserText" onClick={openModalHandler}>
                            회원 탈퇴
                        </p>
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
                <MyPageBody>
                    {checked === 0 ? <MyPagePosts userData={userData} /> : checked === 1 ? <MyPageAnswer userData={userData} /> : <MyPageEdit name={userData.nickName} email={userData.email} />}
                </MyPageBody>
            </MyPageContainer>
            {isOpen ? (
                <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="title">회원 탈퇴</div>
                        <div className="description1">
                            지금까지 MENTALTAL 서비스를
                            <br /> 이용해주셔서 감사합니다.
                        </div>
                        <div className="description2">
                            하단 버튼을 눌러 회원을 탈퇴하면 <br /> MENTALTAL 서비스 내 계정 정보가 <br /> 삭제되고 복구할 수 없습니다.
                        </div>
                        <button onClick={userDelete}>탈퇴하기</button>
                    </ModalView>
                </ModalBackdrop>
            ) : null}
            {token ? null : (
                <ModalBackdrop onClick={() => navigate("/main")}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="title">로그아웃이 완료되었습니다.</div>
                        <div className="description1">
                            오늘도 MENTALTAL 서비스를
                            <br /> 이용해주셔서 감사합니다.
                        </div>
                        <div className="description2">
                            하단 버튼을 눌러 로그인하시면 <br /> 마이페이지를 확인하실 수 있습니다.
                        </div>
                        <button onClick={() => navigate("/login")}>로그인</button>
                    </ModalView>
                </ModalBackdrop>
            )}
        </>
    );
};

export default MyPage;

const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 130px;
    font-family: "Nanum Gothic", sans-serif;

    @media screen and (max-width: 611px) {
        padding: 0 100px;
    }
`;

const MyPageHeader = styled.div`
    display: flex;
    padding-top: 150px;
    padding-left: 20px;
    margin-bottom: 90px;

    @media screen and (max-width: 611px) {
        flex-direction: column;
    }
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
        @media screen and (max-width: 611px) {
            margin-top: 30px;
        }

        .userName {
            color: var(--darkgreen);
            font-size: 25px;
            font-weight: var(--font-bold);
            padding-bottom: 4px;
        }

        .email,
        .deleteUserText {
            color: var(--green);
            padding-top: 10px;
            font-size: 15px;

            &.email {
                text-decoration: underline;
                text-underline-offset: 4px;
            }

            &.deleteUserText {
                :hover {
                    cursor: pointer;
                    color: var(--darkgreen);
                    transition: 0.5s;
                }
            }
        }
    }
`;

const MyPageTab = styled.div`
    margin-bottom: 20px;
    .tabContainer {
        display: flex;
        @media screen and (max-width: 611px) {
            flex-direction: column;
        }
    }

    .tabButton,
    .tabChecked {
        width: 156px;
        height: 55px;
        margin-right: 10px;
        font-size: 19px;
        font-weight: var(--font-bold);
        font-family: "Nanum Gothic", sans-serif;

        @media screen and (max-width: 702px) {
            font-size: 18px;
        }
        @media screen and (max-width: 684px) {
            font-size: 17px;
        }
        @media screen and (max-width: 666px) {
            font-size: 16px;
        }
        @media screen and (max-width: 649px) {
            font-size: 15px;
        }
        @media screen and (max-width: 631px) {
            font-size: 14px;
        }
        @media screen and (max-width: 611px) {
            font-size: 19px;
        }
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

const MyPageBody = styled.div`
    margin-bottom: 50px;
`;

const ModalBackdrop = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalView = styled.div.attrs((props) => ({
    role: "dialog",
}))`
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 400px;
    margin: 0 auto;
    border-radius: 30px;
    font-family: "Nanum Gothic", sans-serif;
    padding: 20px;

    .title {
        font-size: 20px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 10%;
    }
    .description1,
    .description2 {
        font-size: 15px;
        line-height: 150%;
        text-align: center;
        color: var(--darkgreen);

        &.description2 {
            padding-top: 2%;
            padding-bottom: 15%;
        }
    }

    button {
        background-color: var(--darkgreen);
        font-size: 17px;
        width: 80%;
        border-radius: 50px;

        :hover {
            background-color: var(--lightgreen);
            cursor: pointer;
            transition: 0.5s;
        }
    }
`;

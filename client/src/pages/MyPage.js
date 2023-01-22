import styled from "styled-components";
import { useEffect, useState } from "react";
import MyPagePosts from "../components/mypage/MyPagePosts";
import MyPageAnswer from "../components/mypage/MyPageAnswer";
import MyPageEdit from "../components/mypage/MyPageEdit";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MyPage = ({ setIsFooter }) => {
    const { id } = useParams();
    const [userData, setUserData] = useState(undefined);
    const url = `http://ec2-3-36-53-155.ap-northeast-2.compute.amazonaws.com:8080`;
    // const getMemberId = () => {
    //     const memberId = localStorage.getItem("memberId") ? JSON.parse(localStorage.getItem("memberId")) : null;
    //     console.log(memberId);
    //     return memberId;
    // };
    // const memberId = getMemberId();

    let decoded;
    let loginToken = window.localStorage.getItem("loginToken");

    if (loginToken) {
        decoded = jwt_decode(loginToken);
        console.log(decoded);
    }

    const userProfileData = async (id) => {
        const member = await axios.get(`${url}/members/${id}`);
        return {
            memberName: member.data.data.nickName,
            email: member.data.data.email,
        };
    };

    useEffect(() => {
        setIsFooter(false);
        // axios.get(`${url}/members/${memberId}`).then((res) => {
        //     // 임시 유저 데이터 가져오는 테스트 코드. token을 받아오게 되면 수정 예정
        //     // console.log(res);
        //     setUserData(res.data);
        // });

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

    return (
        <>
            <MyPageContainer>
                <MyPageHeader>
                    <div className="imgContainer"></div>
                    <div className="textContainer">
                        <p className="userName">{userData && userData.memberName} 님</p>
                        <p className="email">{userData && userData.email}</p>
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
                <MyPageBody>{checked === 0 ? <MyPagePosts userData={userData} /> : checked === 1 ? <MyPageAnswer userData={userData} /> : <MyPageEdit />}</MyPageBody>
            </MyPageContainer>
        </>
    );
};

export default MyPage;

const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0 130px;

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
        @media screen and (max-width: 611px) {
            flex-direction: column;
        }
    }

    .tabButton,
    .tabChecked {
        width: 156px;
        height: 55px;
        margin-right: 10px;
        font-size: 20px;
        font-weight: var(--font-bold);

        @media screen and (max-width: 693px) {
            font-size: 19px;
        }
        @media screen and (max-width: 678px) {
            font-size: 18px;
        }
        @media screen and (max-width: 660px) {
            font-size: 17px;
        }
        @media screen and (max-width: 643px) {
            font-size: 16px;
        }
        @media screen and (max-width: 627px) {
            font-size: 15px;
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

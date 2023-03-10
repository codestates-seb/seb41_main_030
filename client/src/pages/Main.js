import styled from "styled-components";
import "../globalStyle.css";
import Carousel from "../components/main/Carousel";
import { useEffect } from "react";
import IntroImg from "../icons/main-leaf.svg";
import { Link } from "react-router-dom";
import { memberIdState } from "../states/memberIdState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const Main = ({ setIsFooter }) => {
    const memberId = useRecoilValue(memberIdState);
    const navigate = useNavigate();

    // 로그인한 경우에만 게시글 작성 가능
    const handleWriteBtn = () => {
        if (memberId !== null) {
            navigate("/write");
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <>
            <Container>
                <Intro>
                    <div className="text">
                        <p className="description">심리적인 괴로움, 감정을 탈탈 털어놓으세요.</p>
                        <p className="logo">MENTALTAL</p>
                        <Link to="/">
                            <button>
                                서비스 소개
                                <i className="fa-solid fa-chevron-right" />
                            </button>
                        </Link>
                    </div>
                </Intro>
                <PreviewContainer>
                    <p className="text">오늘의 TOP 게시글</p>
                    <CarouselContainer>
                        <Carousel />
                    </CarouselContainer>
                </PreviewContainer>
                <Shortcut>
                    <p className="text">당신을 위한 멘탈 케어</p>
                    <div className="blockContainer">
                        <div className="blockLeft">
                            <Link to="/selfcheck">
                                <div className="block_counsel">
                                    <p className="title">자가진단</p>
                                    <p className="description">자가진단 테스트로 심리 문제를 점검해보세요</p>
                                </div>
                            </Link>
                            <div className="block_write" onClick={handleWriteBtn}>
                                <p className="title">고민 털어놓기</p>
                                <p className="description">MENTALTAL에 고민을 털어놓으세요</p>
                            </div>
                        </div>
                        <div className="blockRight">
                            <Link to="/community">
                                <div className="block_community">
                                    <p className="title">MENTALTAL 커뮤니티</p>
                                    <p className="description">비슷한 고민을 가진 사람들과 이야기해보세요</p>
                                </div>
                            </Link>
                            <Link to="/counselingcenter">
                                <div className="block_postit">
                                    <p className="title">상담 기관</p>
                                    <p className="description">전문 상담 기관의 도움이 필요하신가요?</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Shortcut>
            </Container>
        </>
    );
};

export default Main;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    font-family: "Nanum Gothic", sans-serif;
`;

const Intro = styled.div`
    width: 100%;
    height: 440px;
    background-color: var(--primary-color);
    display: flex;

    background-image: url(${IntroImg});
    background-repeat: no-repeat;
    background-position: 85% -620%;
    background-size: 450px 450px;

    @media screen and (max-width: 851px) {
        background-image: none;
    }

    .text {
        padding-top: 190px;
        padding-left: 90px;
        color: var(--white);

        @media screen and (max-width: 414px) {
            padding-left: 50px;
        }

        .description {
            font-size: 18px;

            @media screen and (max-width: 414px) {
                font-size: 15px;
                transition: 0.5s;
            }
        }

        .logo {
            font-size: 55px;
            padding-top: 12px;
            font-weight: var(--font-bold);

            @media screen and (max-width: 414px) {
                font-size: 50px;
                transition: 0.5s;
            }
        }
        button {
            margin-top: 25px;
            background-color: var(--white);
            color: var(--green);
            font-family: "Nanum Gothic", sans-serif;
            font-weight: var(--font-bold);
            border-radius: 50px;
            padding: 3% 7%;

            i {
                margin-left: 10px;
            }
            :hover {
                background-color: var(--lightgreen);
                color: var(--white);
            }

            @media screen and (max-width: 414px) {
                font-size: 12px;
                transition: 0.5s;
            }
        }
    }
`;

const PreviewContainer = styled.div`
    padding: 0 90px;
    padding-top: 90px;

    @media screen and (max-width: 414px) {
        padding: 90px 50px;
    }

    .text {
        font-size: 18px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 25px;
    }

    .posts {
        display: flex;
        justify-content: space-between;
    }
`;

const Shortcut = styled.div`
    padding: 0 90px;
    padding-top: 90px;

    @media screen and (max-width: 414px) {
        padding: 0 50px;
    }

    .text {
        font-size: 18px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 25px;
    }

    .blockContainer {
        display: flex;
        justify-content: space-between;
        margin-bottom: 80px;

        @media screen and (max-width: 976px) {
            flex-direction: column;
        }

        .title {
            font-size: 25px;
            font-weight: var(--font-bold);
            line-height: 30px;

            @media screen and (max-width: 522px) {
                font-size: 23px;
            }
        }

        .description {
            font-size: 16px;
            margin-top: 10px;
            line-height: 24px;
            @media screen and (max-width: 522px) {
                font-size: 14px;
            }
            @media screen and (max-width: 512px) {
                font-size: 13px;
            }
            @media screen and (max-width: 578px) {
                display: none;
            }
        }

        .blockLeft {
            flex-grow: 1;
            margin-right: 10px;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 976px) {
                margin-right: 0px;
            }

            .block_counsel {
                background-color: var(--yellow);
                height: 166px;
                border-radius: 20px;
                padding: 40px;
                padding-top: 53px;
                color: var(--darkgreen);

                :hover {
                    background-color: var(--green);
                    transition: 0.8s;
                    color: var(--white);
                    cursor: pointer;
                }
            }

            .block_write {
                background-color: #a2b29f;
                height: 300px;
                border-radius: 20px;
                padding: 40px;
                padding-top: 53px;
                margin-top: 20px;
                color: var(--white);
                @media screen and (max-width: 976px) {
                    height: 166px;
                }

                :hover {
                    background-color: var(--green);
                    transition: 1s;
                    color: var(--white);
                    cursor: pointer;
                }
            }
        }

        .blockRight {
            flex-grow: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 976px) {
                margin-left: 0px;
                margin-top: 20px;
            }
            .block_community {
                background-color: #798777;
                height: 300px;
                border-radius: 20px;
                padding: 40px;
                padding-top: 53px;
                color: var(--white);

                @media screen and (max-width: 976px) {
                    height: 166px;
                }

                :hover {
                    background-color: var(--green);
                    transition: 1s;
                    color: var(--white);
                    cursor: pointer;
                }
            }
            .block_postit {
                background-color: #bdd2b6;
                height: 166px;
                border-radius: 20px;
                padding: 40px;
                padding-top: 53px;
                margin-top: 20px;
                color: var(--darkgreen);

                :hover {
                    background-color: var(--green);
                    transition: 0.8s;
                    color: var(--white);
                    cursor: pointer;
                }
            }
        }
    }
`;

const CarouselContainer = styled.div``;

import styled from "styled-components";
import Preview from "../components/Preview";
import "../globalStyle.css";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Viga&display=swap");
    display: flex;
    flex-direction: column;
`;

const Intro = styled.div`
    width: 100%;
    /* height: 390px; */
    height: 410px;
    background-color: var(--primary-color);

    .text {
        /* padding-top: 145px; */
        padding-top: 190px;
        padding-left: 90px;
        color: var(--white);

        .description {
            font-size: 20px;
        }

        .logo {
            font-size: 55px;
            padding-top: 10px;
            font-weight: var(--font-bold);
        }
    }
`;

const PreviewContainer = styled.div`
    padding: 0 90px;
    padding-top: 90px;

    .text {
        font-size: 20px;
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

    .text {
        font-size: 20px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 25px;
    }

    .blockContainer {
        display: flex;
        justify-content: space-between;
        margin-bottom: 80px;

        .title {
            font-size: 27px;
            font-weight: var(--font-bold);
        }

        .description {
            font-size: 18px;
            margin-top: 10px;
        }

        .blockLeft {
            flex-grow: 1;
            margin-right: 10px;
            display: flex;
            flex-direction: column;

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
            .block_community {
                background-color: #798777;
                height: 300px;
                border-radius: 20px;
                padding: 40px;
                padding-top: 53px;
                color: var(--white);

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

const CarouselContainer = styled.div`
    /* margin: 0 90px; */
`;

const Main = ({ setIsFooter }) => {
    const previewCount = Array(4).fill("0");
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
                            <div className="block_counsel">
                                <p className="title">전문 상담</p>
                                <p className="description">전문가나 상담 기관의 도움이 필요하신가요?</p>
                            </div>
                            <div className="block_write">
                                <p className="title">고민 털어놓기</p>
                                <p className="description">MENTALTAL에 고민을 털어놓으세요</p>
                            </div>
                        </div>
                        <div className="blockRight">
                            <div className="block_community">
                                <p className="title">MENTALTAL 커뮤니티</p>
                                <p className="description">비슷한 고민을 가진 사람들과 이야기해보세요</p>
                            </div>
                            <div className="block_postit">
                                <p className="title">마음도장</p>
                                <p className="description">코멘트를 남겨 마음도장을 찍어보세요</p>
                            </div>
                        </div>
                    </div>
                </Shortcut>
            </Container>
        </>
    );
};

export default Main;

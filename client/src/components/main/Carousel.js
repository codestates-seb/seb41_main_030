import styled from "styled-components";
import "../../globalStyle.css";
import leftArrow from "../../icons/main-page-arrow-left.svg";
import rightArrow from "../../icons/main-page-arrow-right.svg";
import Preview from "./Preview";
import { useEffect, useState } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel() {
    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/boards/all`)
            .then((res) => {
                const topBoardArray = res.data.sort((a, b) => b.voteCount - a.voteCount);
                setData(topBoardArray.slice(0, 12));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Container>
                <Swiper
                    breakpoints={{
                        320: {
                            width: 320,
                            slidesPerView: 1,
                            spaceBetween: 30,
                            slidesPerGroup: 1,
                        },
                        809: {
                            width: 809,
                            slidesPerView: 2,
                            spaceBetween: -150,
                            slidesPerGroup: 2,
                        },
                        1200: {
                            width: 1200,
                            slidesPerView: 4,
                            spaceBetween: 10,
                            slidesPerGroup: 4,
                        },
                    }}
                    loop={false}
                    loopFillGroupWithBlank={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {data &&
                        data.map((post) => (
                            <SwiperSlide key={post.boardId + 1}>
                                <Preview key={post.boardId} tags={post.tags} title={post.title} content={post.content} writer={post.nickName} boardId={post.boardId} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Container>
        </>
    );
}

const Container = styled.div`
    body {
        background: #eee;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        font-size: 18px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .swiper-button-prev {
        width: 50px;
        height: 50px;
        background-image: url(${leftArrow});
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
    }

    .swiper-button-next {
        width: 50px;
        height: 50px;
        background-image: url(${rightArrow});
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        display: none;
        color: var(--green);
    }

    .swiper-container {
        position: relative;
        width: 70%;
        margin: 0 auto;
        padding-left: 50px;
        padding-right: 50px;
    }
`;

import styled from "styled-components";
import "../../globalStyle.css";
import leftArrow from "../../icons/main-page-arrow-left.svg";
import rightArrow from "../../icons/main-page-arrow-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import Preview from "./Preview";
import { useEffect, useState } from "react";
import axios from "axios";

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

    /* .swiper-container {
        width: 100%;
        height: 400px;
        padding: 0 50px;
    } */

    .swiper-slide {
        font-size: 18px;
        /* height: 150px; */
        /* height: 320px; */

        /* Center slide text vertically */
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
        /* left: -30px; */
    }

    .swiper-button-next {
        width: 50px;
        height: 50px;
        background-image: url(${rightArrow});
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
        /* right: -30px; */
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

    /* .swiper-pagination {
        position: absolute;
        /* bottom: -10px !important; 
    }

    .swiper-pagination-bullet {
        background-color: var(--green);
        margin: 0 10px !important;
    } */
`;

export default function Carousel() {
    const url = `http://localhost:3001`;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${url}/boards`).then((res) => {
            setData(res.data.slice(0, 12));
        });
    }, []);

    return (
        <>
            <Container>
                <Swiper
                    // slidesPerView={4}
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            width: 320,
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        // when window width is >= 768px
                        600: {
                            width: 600,
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1200: {
                            width: 1200,
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                    // spaceBetween={-30}
                    slidesPerGroup={4}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {data &&
                        data.map((post) => (
                            <SwiperSlide key={post.BoardId + 1}>
                                <Preview key={post.BoardId} tag={post.tag[0]} title={post.title} content={post.content} writer={post.BoardWriterId} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </Container>
        </>
    );
}

import styled from "styled-components";
import { useEffect, useRef } from "react";
import { centerInfo } from "./mapDummy";

const { kakao } = window;

const KaKaoMap = () => {
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(37.556069, 126.972325),
            level: 9,
        };

        mapRef.current = new kakao.maps.Map(container, options);
    }, []);

    const mapRef = useRef();

    useEffect(() => {
        const overlayInfos = centerInfo.map((el) => {
            return {
                title: el.name,
                lat: el.lat,
                lng: el.lng,
                img: el.img,
                address: el.address,
                number: el.number,
            };
        });

        overlayInfos.forEach((el) => {
            const imageSrc = require("../../icons/map-pin.png"),
                imageSize = new kakao.maps.Size(50, 50),
                imageOption = { offset: new kakao.maps.Point(27, 69) };
            let marker = new kakao.maps.Marker({
                map: mapRef.current,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            });

            let content =
                `<div class="overlayWrap">` +
                `   <div class="overlayContainer">` +
                `       <div class="overlayInfo">` +
                `           <h1 class="overlayTitle">${el.title}</h1>` +
                `           <div class="overlayAddress">주소: ${el.address}</div>` +
                `           <div class="overlayNumber">번호: ${el.number}</div>` +
                `       </div>` +
                `   </div>` +
                `    <div class="overlayArrow">` +
                `</div>`;

            let position = new kakao.maps.LatLng(el.lat, el.lng);

            let customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
            });

            kakao.maps.event.addListener(marker, "mouseover", function () {
                customOverlay.setMap(mapRef.current);
            });

            kakao.maps.event.addListener(marker, "mouseout", function () {
                setTimeout(function () {
                    customOverlay.setMap();
                });
            });
        });
    }, []);

    return <KaKaoMapWrapper id="map"></KaKaoMapWrapper>;
};

const KaKaoMapWrapper = styled.div`
    width: 100%;
    height: 70vh;
    margin: 0 auto;

    .overlayWrap {
        display: flex;
        flex-direction: column;
        align-items: center;

        position: relative;
    }

    .overlayContainer {
        width: 350px;
        height: 100px;
        padding: 10px;

        border-radius: 15px;
        background-color: white;
        color: var(--darkgreen);
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);

        position: absolute;
        top: -185px;
    }

    .overlayInfo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
        white-space: normal;

        font-family: "Nanum Gothic", sans-serif;
        font-weight: var(--font-medium);
        font-size: 0.9rem;
    }

    .overlayArrow {
        width: 0;
        height: 0;

        border-bottom: 15px solid transparent;
        border-top: 15px solid white;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;

        position: absolute;
        top: -85px;
        left: -17px;

        z-index: 1;
    }
`;

export default KaKaoMap;

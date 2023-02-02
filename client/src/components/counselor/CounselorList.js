import React from "react";
import styled from "styled-components";
import Counseloritem from "./Counseloritem";
//더미 데이터
const counselorListData = [
    {
        name: "최은영",
        field: "청소년상담 전문가",
        center: "마음날씨 상담센터",
        address: "서울특별시 강남구 봉은사로 326",
        number: "02-549-1043",
        img: require("../../icons/Counselor01.png")
    },
    {
        name: "김한진",
        field: "우울증치료 전문가",
        center: "다사랑중앙 상담센터",
        address: "서울특별시 강남구 강남대로 84",
        number: "02-2349-1913",
        img: require("../../icons/Counselor02.png")
    },
    {
        name: "이지숙",
        field: "부부상담 전문가",
        center: "건강디딤돌 상담센터",
        address: "서울특별시 강남구 봉은사로 119",
        number: "02-4249-1713",
        img: require("../../icons/Counselor03.png")
    },
    {
        name: "최재호",
        field: "트라우마 전문가",
        center: "정신지킴이 상담센터",
        address: "경기도 성남시 중원구 성남대로 997",
        number: "031-698-3844",
        img: require("../../icons/Counselor04.png")
    },
    {
        name: "오현지",
        field: "소아상담 전문가",
        center: "스마일소아 상담센터",
        address: "경기도 부천시 원미구 길주로 137",
        number: "031-756-1388",
        img: require("../../icons/Counselor05.png")
    },
    {
        name: "박지은",
        field: "청소년상담 전문가",
        center: "마음의집 상담센터",
        address: "서울특별시 강남구 테헤란로 528",
        number: "02-473-0923",
        img: require("../../icons/Counselor06.png")
    }
];

//전문가 페이지의 리스트
const CounselorList = () => {
    return (
        <>
            <Container>
                <CounselorContainer>
                    {counselorListData.map((person, idx) => (
                        <Counseloritem person={person} key={idx} />
                    ))}
                </CounselorContainer>
            </Container>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 50vh;
    padding: 5%;
`;

//전문가 컨테이너
const CounselorContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    @media screen and (min-width: 340px) {
        grid-template-columns: 1fr;
    }
    @media screen and (min-width: 920px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export default CounselorList;

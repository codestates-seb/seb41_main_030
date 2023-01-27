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
        img: require("./Counselor01.png")
    },
    {
        name: "김지수",
        field: "우울증치료 전문가",
        center: "다사랑중앙 상담센터",
        address: "서울특별시 강남구 강남대로 84",
        number: "02-2349-1913",
        img: require("./Counselor02.png")
    },
    {
        name: "조현진",
        field: "부부상담 전문가",
        center: "디딤정신건강 상담센터",
        address: "서울특별시 강남구 봉은사로 119",
        number: "02-4249-1713",
        img: require("./Counselor03.png")
    },
    {
        name: "최재호",
        field: "트라우마 전문가",
        center: "정신건강지킴 상담센터",
        address: "경기도 성남시 중원구 성남대로 997",
        number: "031-698-3844",
        img: require("./Counselor04.png")
    },
    {
        name: "천아현",
        field: "소아상담 전문가",
        center: "스마일소아 상담센터",
        address: "경기도 부천시 원미구 길주로 137",
        number: "031-756-1388",
        img: require("./Counselor05.png")
    },
    {
        name: "박지은",
        field: "청소년상담 전문가",
        center: "마인드하우스 상담센터",
        address: "서울특별시 강남구 테헤란로 528",
        number: "02-473-0923",
        img: require("./Counselor06.png")
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
    display: flex;
    flex-direction: column;
    min-height: 120vh;
    padding: 0px 10px 120px 10px;
`;

//전문가 컨테이너
const CounselorContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-left: 90px;
    margin-right: 90px;
`;

export default CounselorList;

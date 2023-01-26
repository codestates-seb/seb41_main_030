import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Counselorback01 from "../counselor/Counselorback01.png";
import CounselorModal from "../counselor/CounselorModal";
import counselorDummy from "../counselor/CounselorDummy.json";

const CounselorList = () => {
    // useEffect(() => {
    //     const counselorInfos = counselorInfo.map((coun) => {
    //         return {
    //             name: coun.neme,
    //             field: coun.field,
    //             center: coun.center,
    //             address: coun.address,
    //             number: coun.number,
    //             img: ""
    //         };
    //     });
    // });
    const counselorInfo = counselorDummy.Counselor;
    console.log(counselorInfo);

    const [isModal, setIsModal] = useState(false);
    const handleCloselModal = () => {
        setIsModal(!isModal);
    };

    return (
        <>
            <Container>
                <CounselorModal onClick={handleCloselModal}></CounselorModal>
                <CounselorContainer>
                    {counselorInfo.map((coun) => (
                        <Counselor>
                            <div className="imgcontainer">
                                <div className="imgcontainer-inner">
                                    <Circle url={coun.img}></Circle>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <p className="title">{coun.name}</p>
                            <p className="field">{coun.field}</p>
                        </Counselor>
                    ))}
                </CounselorContainer>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    min-height: 120vh;
    padding: 0px 10px 10px 10px;
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

//전문가
const Counselor = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    .imgcontainer {
        border-radius: 10%;
        height: 302px;
        transform: scale(0.48);
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        width: 350px;
        :hover {
            transform: scale(0.5);
        }
    }
    .imgcontainer:after {
        background-color: #f2f2f2;
        content: "";
        height: 10px;
        position: absolute;
        top: 390px;
        width: 100%;
    }
    .imgcontainer-inner {
        clip-path: path("M 390,400 C 390,504.9341 304.9341,590 200,590 95.065898,590 10,504.9341 10,400 V 10 H 200 390 Z");
        position: relative;
        transform-origin: 50%;
        top: -200px;
    }

    .img {
        pointer-events: none;
        position: relative;
        transform: translateY(20px) scale(1.15);
        transform-origin: 50% bottom;
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        :hover {
            transform: translateY(0) scale(1.2);
        }
    }

    .divider {
        background-color: var(--green);
        height: 1.5px;
        width: 170px;
    }
    .title {
        color: var(--darkgreen);
        font-size: 27px;
        font-weight: var(--font-bold);
        margin-top: 15px;
        text-align: center;
    }
    .field {
        color: var(--green);
        font-size: 14px;
        margin-top: 15px;
    }
`;
const Circle = styled.img`
    background-image: url(${Counselorback01});
    border-radius: 50%;
    cursor: pointer;
    height: 380px;
    left: 10px;
    pointer-events: none;
    position: absolute;
    top: 210px;
    width: 380px;
`;

export default CounselorList;

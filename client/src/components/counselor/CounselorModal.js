import styled from "styled-components";
// import "../globalStyle.css";
// import close from "../icons/close.sgv";
import { useState } from "react";
// import CounselorDetail from "../counselor/CounselorDetail";
import preson from "../counselor/Counselorperson01.png";
import counselorDummy from "../counselor/CounselorDummy.json";

const CounselorDescribed = styled.div``;

const CounselorModal = ({ _handleModal, children, ...rest }) => {
    const [isModal, setIsModal] = useState(false);
    const handleCloselModal = () => {
        setIsModal(!isModal);
    };
    const counselorInfo = counselorDummy.Counselor;
    console.log(counselorInfo);

    return (
        <ModalView>
            <Background />
            <Modaldetail {...rest}>
                <CounselorImg src={preson}></CounselorImg>
                {/* {counselorInfo.map((coun) => (  */}
                <div className="InfoText">
                    <div className="name">최은영 상담사</div>
                    <div className="field">#청소년상담 전문가</div>
                    <div className="center"> 마음날씨 상담센터</div>

                    <div className="number">02-549-1043</div>
                </div>
                {/* ))} */}
                <CounselorDescribed></CounselorDescribed>
                <button onClick={handleCloselModal}>확인</button>
            </Modaldetail>
        </ModalView>
    );
};

//모달찰 위치
const ModalView = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

//모달창이 뜬 후 배경
const Background = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

//모달창 세부 디자인
const Modaldetail = styled.div`
    position: absolute;
    top: 26.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: var(--white);
    width: 36rem;
    min-height: 28rem;
    animation: modal-show 1s;

    .InfoText {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: 50px;
        margin-left: 300px;

        .name {
            font-size: 30px;
            text-align: center;
            font-weight: var(--font-bold);
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 10px;
        }

        .field {
            font-size: 20px;
            background-color: #eae7b1;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 10px;
            font-weight: var(--font-bold);
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 10px;
        }

        .center {
            font-size: 20px;
            text-align: center;
            font-weight: var(--font-bold);
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 10px;
        }

        // .address {
        //     font-size: 20px;
        //     text-align: center;
        //     font-weight: var(--font-bold);
        //     color: var(--darkgreen);
        //     line-height: 30px;
        //     margin-top: 10px;
        // }

        .number {
            text-align: center;
            font-size: 20px;
            font-weight: var(--font-bold);
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 10px;
        }
    }

    button {
        position: absolute;
        top: 380px;
        left: 250px;
        background-color: var(--darkgreen);
        font-family: "Nanum Gothic", sans-serif;
        font-size: 17px;
        width: 20%;
        border-radius: 50px;
        :hover {
            background-color: var(--lightgreen);
            cursor: pointer;
            transition: 0.5s;
        }
    }
`;

const CounselorImg = styled.img`
    position: absolute;
    top: 50px;
    left: 20px;
    width: 280px;
`;

export default CounselorModal;

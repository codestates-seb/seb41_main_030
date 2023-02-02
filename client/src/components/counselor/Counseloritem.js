import styled from "styled-components";
import { useState } from "react";
import CounselorModal from "./CounselorModal";

const Counseloritem = ({ person }) => {
    const [isModal, setIsModal] = useState(false);

    const modalHandle = () => {
        setIsModal(!isModal);
        //모달창이 띄워질 시 스크롤 막기
        document.body.style.overflow = "hidden";
    };

    return (
        <Counselor>
            <div className="imgcontainer">
                <img src={person.img} onClick={modalHandle} />
            </div>
            <div className="divider"></div>
            <p className="name">{person.name}</p>
            <p className="field">{person.field}</p>

            {isModal ? <CounselorModal onClick={modalHandle} isModal={isModal} setIsModal={setIsModal} person={person} /> : null}
        </Counselor>
    );
};

export default Counseloritem;

//전문가
const Counselor = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    font-family: "Nanum Gothic", sans-serif;

    .imgcontainer {
        border-radius: 10%;
        height: 310px;
        transform: scale(0.48);
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

        :hover {
            transform: scale(0.51);
        }
    }

    .img {
        pointer-events: painted;
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
        width: 200px;
    }
    .name {
        color: var(--darkgreen);
        font-size: 27px;
        font-weight: var(--font-bold);
        margin-top: 15px;
        text-align: center;
    }
    .field {
        color: var(--green);
        font-size: 20px;
        margin-top: 15px;
    }
`;

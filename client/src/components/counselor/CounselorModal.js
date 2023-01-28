import styled from "styled-components";

//모달 내 내용
const CounselorModal = ({ setIsModal, isModal, person }) => {
    const closelModal = () => {
        setIsModal(false);
        //모달 스크롤
        document.body.style.overflow = "unset";
    };

    return (
        <ModalView>
            <Background onClick={closelModal} />
            <Modaldetail onClick={closelModal}>
                <CounselorImg>
                    <img src={person.img} />
                </CounselorImg>

                <div className="InfoText">
                    <div className="name">{person.name} 상담사</div>
                    <div className="center"> {person.center}</div>
                    <div className="number">{person.number}</div>
                    <div className="field">#{person.field}</div>
                </div>

                {/* <button onClick={closelModal}>확인</button> */}
            </Modaldetail>
        </ModalView>
    );
};

//모달찰 위치
const ModalView = styled.div`
    display: flex;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    position: fixed;
    top: 12rem;
    border-radius: 10px;
    /* padding: 1.5rem; */
    background-color: var(--white);
    width: 35rem;
    min-height: 21rem;
    animation: modal-show 1s;
    box-shadow: 0 30px 40px -15px rgb(0 0 0 / 35%);

    .InfoText {
        display: flex;
        flex-direction: column;
        margin-left: 300px;
        margin-top: 20px;
        padding: 30px;

        .name {
            font-size: 30px;
            text-align: center;
            font-weight: var(--font-bold);
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .field {
            font-size: 15px;
            background-color: #eae7b1;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 10px;
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 60px;
        }

        .center {
            font-size: 20px;
            text-align: center;
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 30px;
        }

        .number {
            text-align: center;
            font-size: 20px;
            color: var(--darkgreen);
            line-height: 30px;
            margin-top: 5px;
        }
    }

    button {
        position: absolute;
        top: 340px;
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

const CounselorImg = styled.div`
    background-color: var(--lightgreen2);
    position: absolute;
    width: 300px;
    height: 100%;
    border-end-start-radius: 10px;
    border-start-start-radius: 10px;

    img {
        width: 100%;
        height: 90%;
        margin-top: 12px;
        padding: 10px;
        border-end-start-radius: 10px;
        border-start-start-radius: 10px;
    }
`;

export default CounselorModal;

import styled from "styled-components";

//모달 내 내용
const CounselorModal = ({ setIsModal, isModal, person }) => {
    const closeModal = () => {
        setIsModal(false);
        //모달 스크롤
        document.body.style.overflow = "unset";
    };

    return (
        <ModalView>
            <Background onClick={closeModal} />
            <ModalDetail onClick={(event) => event.stopPropagation()}>
                <CounselorImg>
                    <img src={person.img} alt="상담사 이미지" />
                </CounselorImg>

                <CounselorInfo>
                    <div className="name">{person.name} 상담사</div>
                    <div className="center"> {person.center}</div>
                    <div className="number">{person.number}</div>
                    <div className="field">#{person.field}</div>
                </CounselorInfo>

                <button onClick={closeModal}>X</button>
            </ModalDetail>
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
const ModalDetail = styled.div`
    position: fixed;
    top: 20rem;
    border-radius: 10px;
    background-color: var(--white);
    width: 35rem;
    min-height: 21rem;
    animation: modal-show 1s;
    box-shadow: 0 30px 40px -15px rgb(0 0 0 / 35%);

    button {
        position: absolute;
        top: 0px;
        right: 0px;

        background-color: white;
        color: var(--darkgreen);
        font-family: "Nanum Gothic", sans-serif;
        font-size: 17px;
        font-weight: var(--font-bold);

        :hover {
            font-weight: 900;
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

const CounselorInfo = styled.div`
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
`;

export default CounselorModal;

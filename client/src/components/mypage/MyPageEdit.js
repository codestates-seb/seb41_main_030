import styled from "styled-components";

const EditContainer = styled.div`
    width: 100%;
    font-size: 24px;
    color: var(--darkgreen);
    font-weight: var(--font-bold);
    padding: 100px 0px 80px 38px;

    input {
        margin-top: 30px;
        width: 450px;
        font-size: 20px;
        line-height: 40px;
        padding: 10px;
        border-bottom: 2px solid var(--green);
        cursor: text;
        :focus {
            transition: 0.5s;
            border-bottom: 2px solid var(--lightgreen);
        }
        ::placeholder {
            opacity: 0.5;
        }
    }
`;

const TopBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 130px;
    .nickname,
    .editPassword {
        display: flex;
        flex-direction: column;
    }
`;

const BottomBlock = styled.div`
    display: flex;
    justify-content: space-between;

    .email,
    .reEnterPassword {
        display: flex;
        flex-direction: column;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: flex-end;

    button {
        width: 160px;
        height: 55px;
        font-size: 17px;
        font-weight: var(--font-bold);
        &.back {
            background-color: #f1efe4;
            color: var(--darkgreen);
            margin-right: 20px;
        }
        &.edit {
            background-color: var(--darkgreen);
            color: var(--white);
        }
    }
`;

const MyPageEdit = () => {
    return (
        <>
            <EditContainer>
                <TopBlock>
                    <div className="nickname">
                        <label>닉네임</label>
                        <input placeholder="김코딩"></input>
                    </div>
                    <div className="editPassword">
                        <label>비밀번호 변경</label>
                        <input placeholder="새로운 비밀번호를 입력해주세요."></input>
                    </div>
                </TopBlock>
                <BottomBlock>
                    <div className="email">
                        <label>이메일</label>
                        <input placeholder="mentaltal2023@gmail.com"></input>
                    </div>
                    <div className="reEnterPassword">
                        <label>비밀번호 재입력</label>
                        <input placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."></input>
                    </div>
                </BottomBlock>
                <ButtonContainer>
                    <button className="back">뒤로 가기</button>
                    <button className="edit">회원정보 수정</button>
                </ButtonContainer>
            </EditContainer>
        </>
    );
};

export default MyPageEdit;

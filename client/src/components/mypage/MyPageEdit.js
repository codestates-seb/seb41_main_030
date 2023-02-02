import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyPageEdit = ({ name, email }) => {
    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [editUser, setEditUser] = useState({
        nickName: name,
        password: "",
        checkPW: "",
    });

    const handleEditInputValue = (key, e) => {
        setEditUser({ ...editUser, [key]: e.target.value });
    };

    const handleClear = () => {
        setEditUser({
            nickName: name,
            password: "",
            checkPW: "",
        });
    };

    // 회원정보 수정 서버 연결
    const { id } = useParams();

    const handleEdit = () => {
        if (editUser.password === editUser.checkPW && editUser.nickName !== "" && editUser.nickName.length >= 2 && checkPWPattern(editUser.password)) {
            updateRequest();
        }
    };

    const updateRequest = () => {
        const { nickName, password } = editUser;

        return axios({
            method: "patch",
            url: `${url}/members/${id}`,
            headers: {
                Authorization: sessionStorage.getItem("loginToken"),
            },
            data: {
                nickName: nickName,
                password: password,
            },
        })
            .then((res) => {
                openModalHandler();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 비밀번호 패턴 체크 (8자 이상, 영문, 숫자, 특수문자 포함여부)
    const checkPWPattern = (input) => {
        const patternNumber = /[0-9]/;
        const patternText = /[a-zA-Z]/;
        const patternMark = /[~!@#$%^&*()_+|<>?:{}]/;

        if (!patternNumber.test(input) || !patternText.test(input) || !patternMark.test(input) || input.length < 8) {
            return false;
        } else {
            return true;
        }
    };

    // 개인정보 수정 모달
    const [isOpen, setIsOpen] = useState(false);

    const openModalHandler = () => {
        if (editUser.password === editUser.checkPW && editUser.nickName !== "" && editUser.nickName.length >= 2 && checkPWPattern(editUser.password)) {
            setIsOpen(!isOpen);
        }
    };

    // 개인정보 수정 후 모달창 확인 버튼 누르면 새로고침
    const handleRefresh = () => {
        window.location.reload();
    };

    // 비밀번호 표시 관련 상태값
    const [passwordType, setPasswordType] = useState({
        type: "password",
        visible: false,
    });
    // 아이콘 클릭 시 passwordType 상태값 변경
    const passwordVisibleHandle = () => {
        if (!passwordType.visible) {
            setPasswordType({ type: "text", visible: true });
        } else {
            setPasswordType({ type: "password", visible: false });
        }
    };

    return (
        <>
            <EditContainer>
                <form onSubmit={handleSubmit()}>
                    <TopBlock>
                        <div className="nickname">
                            <label>닉네임</label>
                            <input
                                value={editUser.nickName}
                                className={errors.name && "nameInputError"}
                                {...register("name", {
                                    required: { value: true, message: "닉네임을 입력해주세요." },
                                    minLength: {
                                        value: 2,
                                        message: "두 글자 이상 입력해주세요.",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "10 글자 이하로 입력해주세요.",
                                    },
                                })}
                                onChange={(e) => handleEditInputValue("nickName", e)}
                            />
                            {errors.name && <div className="nameErrorMessage">{errors.name.message}</div>}
                        </div>
                        <div className="editPassword">
                            <div className="pwTextContainer">
                                <label>비밀번호 변경</label>
                                {passwordType.visible ? <i className="fa-regular fa-eye" onClick={passwordVisibleHandle} /> : <i className="fa-regular fa-eye-slash" onClick={passwordVisibleHandle} />}
                            </div>
                            <input
                                placeholder="새로운 비밀번호를 입력해주세요."
                                autoComplete="new-password"
                                type={passwordType.type}
                                className={errors.password && "passwordInputError"}
                                {...register("password", {
                                    required: { value: true, message: "비밀번호를 입력해주세요." },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                                        message: "8자 이상 영문, 숫자, 특수문자를 입력해주세요.",
                                    },
                                })}
                                onChange={(e) => handleEditInputValue("password", e)}
                                value={editUser.password}
                            />
                            {errors.password && <div className="passwordErrorMessage">{errors.password.message}</div>}
                        </div>
                    </TopBlock>
                    <BottomBlock>
                        <div className="email">
                            <label>이메일</label>
                            <input autoComplete="off" value={email} disabled />
                        </div>
                        <div className="passwordConfirm">
                            <div className="pwConfirmTextContainer">
                                <label>비밀번호 재입력</label>
                                {passwordType.visible ? <i className="fa-regular fa-eye" onClick={passwordVisibleHandle} /> : <i className="fa-regular fa-eye-slash" onClick={passwordVisibleHandle} />}
                            </div>
                            <input
                                placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."
                                type={passwordType.type}
                                className={errors.passwordConfirmation && "pwConfirmInputError"}
                                {...register("passwordConfirmation", {
                                    required: { value: true, message: "비밀번호를 다시 한 번 입력해주세요." },
                                    validate: (value) => {
                                        if (watch("password") !== value) {
                                            return "비밀번호가 일치하지 않습니다.";
                                        }
                                    },
                                })}
                                onChange={(e) => handleEditInputValue("checkPW", e)}
                                value={editUser.checkPW}
                            />
                            {errors.passwordConfirmation && <div className="pwConfirmErrorMessage">{errors.passwordConfirmation.message}</div>}
                        </div>
                    </BottomBlock>
                    <ButtonContainer>
                        <button className="clear" onClick={handleClear} type="button">
                            취소
                        </button>
                        <button className="edit" type="submit" onClick={handleEdit}>
                            회원정보 수정
                        </button>
                    </ButtonContainer>
                </form>
            </EditContainer>
            {isOpen ? (
                <ModalBackdrop onClick={handleRefresh}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="title">개인정보 수정이 완료되었습니다.</div>
                        <button onClick={handleRefresh}>확인</button>
                    </ModalView>
                </ModalBackdrop>
            ) : null}
        </>
    );
};

export default MyPageEdit;

const EditContainer = styled.div`
    width: 100%;
    font-size: 22px;
    color: var(--darkgreen);
    font-weight: var(--font-bold);
    padding: 100px 0px 30px 38px;

    @media screen and (max-width: 862px) {
        padding-left: 0px;
    }

    input {
        margin-top: 30px;
        width: 450px;
        font-size: 19px;
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
            @media screen and (max-width: 1121px) {
                font-size: 18px;
            }
            @media screen and (max-width: 1027px) {
                font-size: 16px;
            }
            @media screen and (max-width: 862px) {
                font-size: 20px;
            }
            @media screen and (max-width: 531px) {
                font-size: 16px;
            }
        }
        @media screen and (max-width: 1218px) {
            width: 400px;
        }
        @media screen and (max-width: 1121px) {
            width: 350px;
        }
        @media screen and (max-width: 1027px) {
            width: 300px;
        }
        @media screen and (max-width: 921px) {
            width: 270px;
        }
        @media screen and (max-width: 862px) {
            width: 100%;
        }
    }
`;

const TopBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 130px;

    @media screen and (max-width: 862px) {
        flex-direction: column;
        .nickname {
            margin-bottom: 130px;
        }
    }

    .nickname,
    .editPassword {
        display: flex;
        flex-direction: column;
    }

    .pwTextContainer {
        display: flex;
        justify-content: space-between;
        i:hover {
            cursor: pointer;
        }
    }

    .passwordErrorMessage,
    .nameErrorMessage {
        font-size: 14px;
        margin-top: 10px;
        font-weight: var(--font-normal);
        color: red;
    }

    .passwordInputError,
    .passwordInputError:focus,
    .nameInputError,
    .nameInputError:focus {
        border-bottom: 2px solid red;
    }
`;

const BottomBlock = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 862px) {
        flex-direction: column;
        .email {
            margin-bottom: 130px;
        }
    }

    .email,
    .passwordConfirm {
        display: flex;
        flex-direction: column;

        &.passwordConfirm {
            input::placeholder {
                @media screen and (max-width: 921px) {
                    font-size: 14.6px;
                }
                @media screen and (max-width: 862px) {
                    font-size: 20px;
                }
                @media screen and (max-width: 676px) {
                    font-size: 18px;
                }
                @media screen and (max-width: 642px) {
                    font-size: 16px;
                }
                @media screen and (max-width: 549px) {
                    font-size: 15px;
                }
                @media screen and (max-width: 531px) {
                    font-size: 14.4px;
                }
                @media screen and (max-width: 521px) {
                    font-size: 14px;
                }
                @media screen and (max-width: 511px) {
                    font-size: 13.2px;
                }
            }
        }
    }

    .pwConfirmTextContainer {
        display: flex;
        justify-content: space-between;
        i:hover {
            cursor: pointer;
        }
    }

    .emailErrorMessage,
    .pwConfirmErrorMessage {
        font-size: 14px;
        margin-top: 10px;
        font-weight: var(--font-normal);
        color: red;
    }

    .emailInputError,
    .emailInputError:focus,
    .pwConfirmInputError,
    .pwConfirmInputError:focus {
        border-bottom: 2px solid red;
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
        font-family: "Nanum Gothic", sans-serif;
        &.clear {
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

const ModalBackdrop = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalView = styled.div.attrs((props) => ({
    role: "dialog",
}))`
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 200px;
    margin: 0 auto;
    border-radius: 30px;
    font-family: "Nanum Gothic", sans-serif;
    padding: 20px;

    .title {
        font-size: 20px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 10%;
    }

    button {
        background-color: var(--darkgreen);
        font-size: 17px;
        width: 30%;
        border-radius: 50px;

        :hover {
            background-color: var(--lightgreen);
            cursor: pointer;
            transition: 0.5s;
        }
    }
`;

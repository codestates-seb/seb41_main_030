import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyPageEdit = ({ name, email }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [inputPWCheckValue, setInputPWCheckValue] = useState("");

    const [editUser, setEditUser] = useState({
        nickName: name,
        password: "",
    });

    const handleEditInputValue = (key, e) => {
        setEditUser({ ...editUser, [key]: e.target.value });
    };

    const handleClear = () => {
        setInputPWCheckValue("");
        setEditUser({
            nickName: name,
            password: "",
        });
    };

    // 회원정보 수정 서버 연결
    const { id } = useParams();

    const handleUpdateRequest = () => {
        const { nickName, password } = editUser;

        return axios({
            method: "patch",
            url: `/members/${id}`,
            headers: {
                Authorization: localStorage.getItem("loginToken"),
            },
            data: {
                nickName: nickName,
                password: password,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
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
                            <label>비밀번호 변경</label>
                            <input
                                placeholder="새로운 비밀번호를 입력해주세요."
                                autoComplete="new-password"
                                type="password"
                                className={errors.password && "passwordInputError"}
                                {...register("password", {
                                    required: { value: true, message: "비밀번호를 입력해주세요." },
                                    minLength: {
                                        value: 8,
                                        message: "8자리 이상 비밀번호를 입력해주세요.",
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
                            <label>비밀번호 재입력</label>
                            <input
                                placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."
                                type="password"
                                value={inputPWCheckValue}
                                onKeyUp={(event) => setInputPWCheckValue(event.value)}
                                className={errors.passwordConfirmation && "pwConfirmInputError"}
                                {...register("passwordConfirmation", {
                                    required: { value: true, message: "비밀번호를 다시 한 번 입력해주세요." },
                                    validate: (value) => {
                                        if (watch("password") !== value) {
                                            return "비밀번호가 일치하지 않습니다.";
                                        }
                                    },
                                })}
                            />
                            {errors.passwordConfirmation && <div className="pwConfirmErrorMessage">{errors.passwordConfirmation.message}</div>}
                        </div>
                    </BottomBlock>
                    <ButtonContainer>
                        <button className="clear" onClick={handleClear}>
                            취소
                        </button>
                        <button className="edit" type="submit" onClick={handleUpdateRequest}>
                            회원정보 수정
                        </button>
                    </ButtonContainer>
                </form>
            </EditContainer>
        </>
    );
};

export default MyPageEdit;

const EditContainer = styled.div`
    width: 100%;
    font-size: 24px;
    color: var(--darkgreen);
    font-weight: var(--font-bold);
    padding: 100px 0px 30px 38px;

    @media screen and (max-width: 862px) {
        padding-left: 0px;
    }

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

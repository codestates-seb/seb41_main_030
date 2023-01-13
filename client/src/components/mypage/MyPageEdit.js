import styled from "styled-components";
import { useForm } from "react-hook-form";

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

    .email,
    .passwordConfirm {
        display: flex;
        flex-direction: column;
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
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    return (
        <>
            <EditContainer>
                <form onSubmit={handleSubmit()}>
                    <TopBlock>
                        <div className="nickname">
                            <label>닉네임</label>
                            <input
                                placeholder="김코딩"
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
                            />
                            {errors.password && <div className="passwordErrorMessage">{errors.password.message}</div>}
                        </div>
                    </TopBlock>
                    <BottomBlock>
                        <div className="email">
                            <label>이메일</label>
                            <input
                                placeholder="mentaltal2023@gmail.com"
                                autoComplete="off"
                                className={errors.email && "emailInputError"}
                                {...register("email", {
                                    required: { value: true, message: "이메일을 입력해주세요." },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "올바른 이메일 형식을 입력해주세요.",
                                    },
                                })}
                            />
                            {errors.email && <div className="emailErrorMessage">{errors.email.message}</div>}
                        </div>
                        <div className="passwordConfirm">
                            <label>비밀번호 재입력</label>
                            <input
                                placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."
                                type="password"
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
                        <button className="back">뒤로 가기</button>
                        <button className="edit" type="submit">
                            회원정보 수정
                        </button>
                    </ButtonContainer>
                </form>
            </EditContainer>
        </>
    );
};

export default MyPageEdit;

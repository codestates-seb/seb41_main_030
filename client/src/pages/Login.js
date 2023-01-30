import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberIdState } from "../states";

const Login = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";
    const navigate = useNavigate();

    const setMemberId = useSetRecoilState(memberIdState);

    // 에러 모달창
    const [errorModal, setErrorModal] = useState(false); // 로그인 실패
    const [notTokenError, setNotTokenError] = useState(false); // 서버오류로 인한 로그인 실패 (토큰 없음)

    const openModalHandler = () => {
        setErrorModal(!errorModal);
    };

    const tokenErrorModalHandler = () => {
        setNotTokenError(!notTokenError);
    };

    const handleLoginRequest = (data) => {
        axios
            .post(`${url}/members/login`, data)
            .then((res) => {
                localStorage.setItem("loginToken", res.headers.authorization);

                if (localStorage.getItem("loginToken") !== "undefined") {
                    setMemberId(res.data.memberId);
                    navigate("/main");
                } else {
                    setNotTokenError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.status === 401) {
                    setErrorModal(true);
                }
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const EMAIL_REGEX = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{4,}/;

    const emailRegister = register("email", {
        required: { value: true, message: "이메일을 입력해주세요." },
        pattern: {
            value: EMAIL_REGEX,
            message: "이메일 형식에 맞게 입력해주세요.",
        },
    });

    const passwordRegister = register("password", {
        required: { value: true, message: "비밀번호를 입력해주세요." },
        pattern: {
            value: PASSWORD_REGEX,
            message: "비밀번호를 입력해주세요.",
        },
    });

    return (
        <>
            <LoginContainer>
                <LoginFormBox
                    onSubmit={handleSubmit((data) => {
                        handleLoginRequest(data);
                    })}
                >
                    <InputBox>
                        <InputText htmlFor="emailInput">이메일</InputText>
                        <EmailInput type="text" id="emailInput" error={errors.email?.message === undefined ? "" : "error"} {...emailRegister} />
                        <ErrorText>{errors.email?.message}</ErrorText>
                    </InputBox>
                    <InputBox>
                        <InputText htmlFor="passwordInput">비밀번호</InputText>
                        <PwInput type="password" id="passwordInput" error={errors.password?.message === undefined ? "" : "error"} {...passwordRegister} />
                        <ErrorText>{errors.password?.message}</ErrorText>
                    </InputBox>
                    <LoginBtn type="submit">로그인</LoginBtn>
                    <LinkBox>
                        아직 회원이 아니신가요?
                        <SignupLink href="/signup">회원가입하기</SignupLink>
                    </LinkBox>
                </LoginFormBox>
            </LoginContainer>
            {errorModal ? (
                <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="description">
                            이메일이나 비밀번호를 잘못 입력하셨습니다. <br />
                            다시 한 번 확인해주세요!
                        </div>
                        <button onClick={openModalHandler}>확인</button>
                    </ModalView>
                </ModalBackdrop>
            ) : null}
            {notTokenError ? (
                <ModalBackdrop onClick={tokenErrorModalHandler}>
                    <ModalView>
                        <div className="description">
                            서버 오류로 인해 로그인에 실패했습니다. <br />
                            다시 시도해주세요.
                        </div>
                        <button onClick={tokenErrorModalHandler}>확인</button>
                    </ModalView>
                </ModalBackdrop>
            ) : null}
        </>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #ecf0e6;
    min-height: 100vh;
`;

const LoginFormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 380px;
    min-height: 410px;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px, rgb(0 0 0 / 10%) 0px 1px 4px;
`;

const InputBox = styled.div`
    margin: 8px;
`;

const InputText = styled.label`
    display: flex;
    margin: 10px 0px 5px 5px;
    color: #2c483f;
    font-weight: var(--font-bold);
    font-size: 1.2rem;
    font-family: "Nanum Gothic", sans-serif;
`;

const EmailInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 5px;
    padding: 0.5em 0.5em;
    font-family: "Nanum Gothic", sans-serif;
    font-size: 1.05rem;
    border-bottom: 2px solid var(--green);
    border-color: ${(props) => (props.error ? "#de4f54" : "var(--green)")};
    &:focus {
        border-color: ${(props) => (props.error ? "#de4f54" : "var(--lightgreen)")};
    }
`;

const PwInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 10px;
    padding: 0.5em 0.5em;
    font-size: 1.05rem;
    border-bottom: 2px solid var(--green);
    border-color: ${(props) => (props.error ? "#de4f54" : "var(--green)")};
    &:focus {
        border-color: ${(props) => (props.error ? "#de4f54" : "var(--lightgreen)")};
    }
`;

export const ErrorText = styled.p`
    color: red;
    padding: 1px;
    font-size: 12px;
`;

const LoginBtn = styled.button`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 13px;
    width: 335px;
    color: white;
    background-color: #3f724d;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
`;

const LinkBox = styled.div`
    font-size: 12px;
    padding: 0.6em;
    text-align: end;
`;

const SignupLink = styled.a`
    padding: 4px;
    font-size: 12px;
    color: hsl(206, 100%, 40%);
    &:visited {
        color: #0e7bce;
    }
    &:hover {
        color: #379fef;
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
    width: 450px;
    height: 200px;
    margin: 0 auto;
    border-radius: 30px;
    font-family: "Nanum Gothic", sans-serif;
    padding: 20px;

    .description {
        font-size: 18px;
        font-weight: var(--font-bold);
        color: var(--darkgreen);
        padding-bottom: 5%;
        line-height: 170%;
        text-align: center;
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

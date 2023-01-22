import React, { useState } from "react";
// import axios from "axios";
import "../globalStyle.css";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    font-weight: bold;
    font-family: "Inter";
    color: #2c483f;
    font-size: 20px;
`;
const EmailInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 5px;
    padding: 0.5em 0.5em;
    font-size: 18px;
    border-color: ${(props) => (props.error ? "#de4f54" : "")};
    &:focus {
        outline: none;
        border-color: ${(props) => (props.error ? "#de4f54" : "#2c483f")};
        border-width: 0px;
        box-shadow: ${(props) => (props.error ? "0 0 0 4px #f7e1e1, 0 0 0 4px #f7e1e1" : "0 0 0 4px #ecf0e6, 0 0 0 4px #ecf0e6")};
    }
`;

const PwInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 10px;
    padding: 0.5em 0.5em;
    font-size: 18px;
    border-color: ${(props) => (props.error ? "#de4f54" : "")};
    &:focus {
        outline: none;
        border-color: ${(props) => (props.error ? "#de4f54" : "#2c483f")};
        border-width: 0px;
        box-shadow: ${(props) => (props.error ? "0 0 0 4px #f7e1e1, 0 0 0 4px #f7e1e1" : "0 0 0 4px #ecf0e6, 0 0 0 4px #ecf0e6")};
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

const PwLink = styled.a`
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

const KalkBtn = styled.button`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 375px;
    heigt: 401px;
    border-radius: 10px;
    color: white;
    background-color: #ffff;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
    color: #3f724d;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px, rgb(0 0 0 / 5%) 0px 0px 8px, rgb(0 0 0 / 10%) 0px 1px 4px;
`;

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(false); // 로그인 여부
    const [userInfo, setUserInfo] = useState(null); // 회원 정보

    const handleInputValue = (key, e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

    const handleLoginRequest = () => {
        const { email, password } = loginInfo;

        return (
            axios
                // proxy 적용해서 도메인 제거함. CORS 문제 해결 후 수정
                .post("/members/login", { email, password })
                .then((res) => {
                    localStorage.setItem("loginToken", res.headers.authorization);
                    setIsLogin(true);
                    setUserInfo({ email });
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    };

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

    // const onSubmit = async (data) => {
    //     try {
    //         await axios.post(`http://localhost:3000/login`, data).then((data) => {
    //             navigate("/");
    //             console.log(data);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <>
            <LoginContainer>
                <LoginFormBox onSubmit={handleSubmit()}>
                    <InputBox>
                        <InputText> 이메일</InputText>
                        <EmailInput type="text" error={errors.email?.message === undefined ? "" : "error"} {...emailRegister} onChange={(e) => handleInputValue("email", e)} />
                        <ErrorText>{errors.email?.message}</ErrorText>
                    </InputBox>
                    <InputBox>
                        <InputText> 비밀번호</InputText>
                        <PwInput type="password" error={errors.password?.message === undefined ? "" : "error"} {...passwordRegister} onChange={(e) => handleInputValue("password", e)} />
                        <ErrorText>{errors.password?.message}</ErrorText>
                    </InputBox>
                    <LoginBtn onClick={handleLoginRequest}>로그인</LoginBtn>
                    <LinkBox>
                        아직 회원이 아니신가요?
                        <SignupLink href="/signup">회원가입하기</SignupLink>
                    </LinkBox>
                    <LinkBox>
                        비밀번호가 생각나지 않나요?
                        <PwLink href="/ForgotPw">비밀번호 찾기</PwLink>
                    </LinkBox>
                </LoginFormBox>
                <KalkBtn> 카카오톡으로 로그인하기</KalkBtn>
            </LoginContainer>
        </>
    );
};

export default Login;

import React from "react";
import axios from "axios";
import "../globalStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignupContainer = styled.div`
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #ecf0e6;
    min-height: 100vh;
`;

const SignupFormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 380px;
    min-height: 250px;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px, rgb(0 0 0 / 10%) 0px 1px 4px;
`;

const InputBox = styled.div`
    margin: 8px;
`;

const MainText = styled.h2`
    font-size: 25px;
    margin: 10px 0px 20px 5px;
    font-family: "Viga";
    font-weight: var(--font-bold);
    color: #2c483f;
`;

const InputText = styled.label`
    display: flex;
    margin: 10px 0px 5px 5px;
    font-weight: bold;
    font-family: "Inter";
    color: #2c483f;
    font-size: 20px;
`;

const NameInput = styled.input`
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
    margin-top: 10px;
    font-size: 12px;
`;

const SingupBtn = styled.button`
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

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const NAME_REGEX = /(?=.*[a-z0-가-힣])[a-z0-9가-힣]{2,}/;
    const EMAIL_REGEX = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{4,}/;

    const nameRegister = register("name", {
        required: { value: true, message: "닉네임을 입력해주세요." },
        pattern: {
            value: NAME_REGEX,
            message: "닉네임이 옳바르지 않습니다."
        }
    });

    const emailRegister = register("email", {
        required: { value: true, message: "이메일을 입력해주세요." },
        pattern: {
            value: EMAIL_REGEX,
            message: "이메일 형식에 맞게 입력해주세요."
        }
    });

    const passwordRegister = register("password", {
        required: { value: true, message: "비밀번호를 입력해주세요." },
        pattern: {
            value: PASSWORD_REGEX,
            message: "비밀번호를 입력해주세요."
        }
    });
    const onSubmit = async (data) => {
        try {
            await axios.post(`http://localhost:3000/signup`, data).then((data) => {
                navigate("/");
                console.log(data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <SignupContainer>
                <MainText>일반 회원가입</MainText>
                <SignupFormBox onSubmit={handleSubmit(onSubmit)}>
                    <InputBox>
                        <InputText> 이메일</InputText>
                        <EmailInput type="text" error={errors.email?.message === undefined ? "" : "error"} {...emailRegister} />
                        <ErrorText>{errors.email?.message}</ErrorText>
                    </InputBox>
                    <InputBox>
                        <InputText> 닉네임</InputText>
                        <NameInput type="text" error={errors.name?.message === undefined ? "" : "error"} {...nameRegister} />
                        <ErrorText>{errors.name?.message}</ErrorText>
                    </InputBox>
                    <InputBox>
                        <InputText> 비밀번호</InputText>
                        <PwInput type="password" error={errors.password?.message === undefined ? "" : "error"} {...passwordRegister} />
                        <ErrorText>{errors.password?.message}</ErrorText>
                    </InputBox>
                    <SingupBtn> 회원가입</SingupBtn>
                </SignupFormBox>
                <KalkBtn> 카카오톡으로 회원가입하기</KalkBtn>
            </SignupContainer>
        </>
    );
};

export default Signup;

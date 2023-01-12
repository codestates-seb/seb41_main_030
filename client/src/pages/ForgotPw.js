import React from "react";
//import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPwContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #ecf0e6;
    min-height: 100vh;
`;

const ForgotPwFormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 380px;
    min-height: 210px;
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

export const ErrorText = styled.p`
    color: red;
    padding: 1px;
    font-size: 12px;
`;

const PwBtn = styled.button`
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

const ForgotPw = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const EMAIL_REGEX = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

    const emailRegister = register("email", {
        required: { value: true, message: "이메일을 입력해주세요." },
        pattern: {
            value: EMAIL_REGEX,
            message: "이메일 형식에 맞게 입력해주세요."
        }
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
            <ForgotPwContainer>
                <ForgotPwFormBox onSubmit={handleSubmit(onSubmit)}>
                    <InputBox>
                        <InputText> 이메일</InputText>
                        <EmailInput type="text" error={errors.email?.message === undefined ? "" : "error"} {...emailRegister} />
                        <ErrorText>{errors.email?.message}</ErrorText>
                    </InputBox>
                    <PwBtn>비밀번호 찾기</PwBtn>
                </ForgotPwFormBox>
            </ForgotPwContainer>
        </>
    );
};

export default ForgotPw;

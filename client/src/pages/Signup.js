import React from "react";
import axios from "axios";
import "../globalStyle.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const NICKNAME_REGEX = /(?=.*[a-z0-9가-힣]).{2,}/;
    const EMAIL_REGEX = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$/;

    const nickNameRegister = register("nickName", {
        required: { value: true, message: "닉네임을 입력해주세요." },
        pattern: {
            value: NICKNAME_REGEX,
            message: "두글자이상 입력해주세요.",
        },
    });

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
            message: "8자 이상 영문, 숫자, 특수문자를 사용하세요.",
        },
    });
    const onSubmit = (data) => {
        axios
            .post(`/members`, data)
            .then((res) => {
                setSuccessModal(!successModal);
                console.log(res.status);
            })
            .catch((error) => {
                setFailModal(!failModal);
                console.log(error.message);
            });
    };

    //회원 가입 시도시 보이는 모달
    const [successModal, setSuccessModal] = useState(false);
    const [failModal, setFailModal] = useState(false);

    const handleSuccessModal = () => {
        setSuccessModal(!successModal);
    };

    const handleFailModal = () => {
        setFailModal(!failModal);
    };

    const handleNavigate = () => {
        setSuccessModal(!successModal);
        navigate("/login");
    };

    return (
        <>
            <SignupContainer>
                <MainText>회원가입</MainText>
                <SignupFormBox onSubmit={handleSubmit(onSubmit)}>
                    <InputBox>
                        <InputText> 이메일</InputText>
                        <EmailInput type="text" error={errors.email?.message === undefined ? "" : "error"} {...emailRegister} />
                        <ErrorText>{errors.email?.message}</ErrorText>
                    </InputBox>
                    <InputBox>
                        <InputText> 닉네임</InputText>
                        <NameInput type="text" error={errors.nickName?.message === undefined ? "" : "error"} {...nickNameRegister} />
                        <ErrorText>{errors.nickName?.message}</ErrorText>
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
            {successModal ? (
                <ModalBackdrop onClick={handleNavigate}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="title">회원가입에 성공하셨습니다.</div>
                        <CloseIcon onClick={handleNavigate}> 로그인으로 이동</CloseIcon>
                    </ModalView>
                </ModalBackdrop>
            ) : null}

            {failModal ? (
                <ModalBackdrop onClick={() => setFailModal(false)}>
                    <ModalView onClick={(event) => event.stopPropagation()}>
                        <div className="title">아이디 혹은 비밀번호가 중복입니다.</div>
                        <CloseIcon onClick={handleFailModal}>확인</CloseIcon>
                    </ModalView>
                </ModalBackdrop>
            ) : null}
        </>
    );
};

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

const ModalView = styled.div`
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
`;

const CloseIcon = styled.button`
    background-color: var(--darkgreen);
    font-size: 17px;
    width: 50%;
    border-radius: 50px;

    :hover {
        background-color: var(--lightgreen);
        cursor: pointer;
        transition: 0.5s;
    }
`;
const SignupContainer = styled.div`
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--lightgreen2);
    min-height: 100vh;
    padding-top: 90px;
    padding-bottom: 90px;
    font-family: "Nanum Gothic";
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

const MainText = styled.div`
    font-size: 25px;
    margin: 10px 0px 20px 5px;
    font-family: "Viga";
    font-weight: var(--font-bold);
    color: var(--darkgreen);
`;

const InputText = styled.div`
    display: flex;
    margin: 10px 0px 5px 5px;
    .text {
        color: var(--darkgreen);
        font-size: 20px;
        font-weight: bold;
    }
`;

const NameInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 5px;
    padding: 0.5em 0.5em;
    font-size: 18px;
    border-bottom: 2px solid var(--green);
    border-color: ${(props) => (props.error ? "#de4f54" : "var(--green)")};
    &:focus {
        border-color: ${(props) => (props.error ? "#de4f54" : "var(--lightgreen)")};
    }
`;

const EmailInput = styled.input`
    display: flex;
    width: 325px;
    margin-top: 12px;
    margin-bottom: 5px;
    padding: 0.5em 0.5em;
    font-size: 18px;
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
    font-size: 18px;
    border-bottom: 2px solid var(--green);
    border-color: ${(props) => (props.error ? "#de4f54" : "var(--green)")};
    &:focus {
        border-color: ${(props) => (props.error ? "#de4f54" : "var(--lightgreen)")};
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
    background-color: var(--green);
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
    font-family: "Viga";
`;

const KalkBtn = styled.button`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 375px;

    border-radius: 10px;
    color: white;
    background-color: #ffff;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
    color: var(--green);
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px, rgb(0 0 0 / 5%) 0px 0px 8px, rgb(0 0 0 / 10%) 0px 1px 4px;
`;

export default Signup;

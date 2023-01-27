import styled from "styled-components";
import "../globalStyle.css";
import { useEffect } from "react";
import CounselorList from "../components/counselor/CounselorList";
import CounselorHead from "../components/counselor/CounselorHead";

const Counselor = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <Container>
            <CounselorHead />
            <CounselorList />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    margin-top: 65px;
    position: relative;
`;
export default Counselor;

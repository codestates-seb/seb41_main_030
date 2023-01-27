import styled from "styled-components";
import "../globalStyle.css";
import { useEffect } from "react";
import CounselorList from "../components/counselor/CounselorList";
import CounselorHeader from "../components/counselor/CounselorHeader";

const Counselor = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <Container>
            <CounselorHeader />
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

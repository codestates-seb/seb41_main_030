import { useEffect } from "react";
import styled from "styled-components";
import SelfCheckResultHeader from "../components/self/SelfCheckResultHeader";
import SelfCheckResultMain from "../components/self/SelfCheckResultMain";

const SelfCheckResult = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <SCResultWrapper>
            <SelfCheckResultHeader />
            <SelfCheckResultMain />
        </SCResultWrapper>
    );
};

export default SelfCheckResult;

const SCResultWrapper = styled.div``;
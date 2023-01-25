import styled from "styled-components";
import Footer from "../Footer";

const IntroResponsive = () => {
    return (
        <>
            <NavSize />
            <IntroResponsiveContainer>
                <div className="title">반응형 웹 서비스</div>
            </IntroResponsiveContainer>
            <Footer />
        </>
    );
};

export default IntroResponsive;

const NavSize = styled.div`
    height: 65px;
`;

const IntroResponsiveContainer = styled.div`
    width: 100%;
    height: 56%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

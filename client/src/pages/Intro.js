import IntroBoard from "../components/intro/IntroBoard";
import IntroCenter from "../components/intro/IntroCenter";
import IntroMain from "../components/intro/IntroMain";
import IntroProfessional from "../components/intro/IntroProfessional";
import { FullPage, Slide } from "react-full-page";
import styled from "styled-components";
import { useEffect } from "react";

const Intro = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    return (
        <>
            <IntroContainer>
                <FullPage controls controlsProps={{ className: "slide-navigation" }}>
                    <Slide>
                        <IntroMain />
                    </Slide>
                    <Slide>
                        <IntroBoard />
                    </Slide>
                    <Slide>
                        <IntroProfessional />
                    </Slide>
                    <Slide>
                        <IntroCenter />
                    </Slide>
                </FullPage>
            </IntroContainer>
        </>
    );
};

export default Intro;

const IntroContainer = styled.div`
    .slide-navigation {
        display: none;
    }
`;

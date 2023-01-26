import IntroBoard from "../components/intro/IntroBoard";
import IntroCenter from "../components/intro/IntroCenter";
import IntroMain from "../components/intro/IntroMain";
import IntroProfessional from "../components/intro/IntroProfessional";
import { FullPage, Slide } from "react-full-page";
import styled from "styled-components";
import { useEffect } from "react";
import IntroResponsive from "../components/intro/IntroResponsive";

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
                    <Slide>
                        <IntroResponsive />
                    </Slide>
                </FullPage>
            </IntroContainer>
        </>
    );
};

export default Intro;

const IntroContainer = styled.div`
    font-family: "Nanum Gothic", sans-serif;
    .slide-navigation {
        display: none;
    }
`;

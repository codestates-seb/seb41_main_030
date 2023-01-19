import IntroBoard from "../components/intro/IntroBoard";
import IntroCenter from "../components/intro/IntroCenter";
import IntroMain from "../components/intro/IntroMain";
import IntroProfessional from "../components/intro/IntroProfessional";

const Intro = () => {
    return (
        <>
            <IntroMain />
            <IntroBoard />
            <IntroProfessional />
            <IntroCenter />
        </>
    );
};

export default Intro;

import { useEffect } from "react";
import SelfCheckHeader from "../components/self/SelfCheckHeader";
import SelfCheckMain from "../components/self/SelfCheckMain";

const SelfCheck = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <>
            <SelfCheckHeader />
            <SelfCheckMain />
        </>
    );
};

export default SelfCheck;

import { useEffect } from "react";
import SelfCheckResultHeader from "../components/self/SelfCheckResultHeader";
import SelfCheckResultMain from "../components/self/SelfCheckResultMain";

const SelfCheckResult = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(true);
    });

    return (
        <>
            <SelfCheckResultHeader />
            <SelfCheckResultMain />
        </>
    );
};

export default SelfCheckResult;

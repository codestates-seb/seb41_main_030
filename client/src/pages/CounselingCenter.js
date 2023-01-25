import { useEffect } from "react";
import styled from "styled-components";
import KaKaoMap from "../components/map/KakaoMap";

const CounselingCenter = ({ setIsFooter }) => {
    useEffect(() => {
        setIsFooter(false);
    });

    return (
        <CCWrapper>
            <CCHeader>
                <div>상담센터 찾기</div>
            </CCHeader>
            <KaKaoMap />
        </CCWrapper>
    );
};

const CCWrapper = styled.div`
    padding-top: 65px;
`;

const CCHeader = styled.div`
    background-color: white;
    width: 100%;
    height: 126px;

    display: flex;
    justify-content: center;
    align-items: center;

    div {
        font-size: 45px;
        font-weight: 700;
        color: var(--darkgreen);

        @media screen and (max-width: 768px) {
            font-size: 35px;
        }
    }
`;

export default CounselingCenter;

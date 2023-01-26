import styled from "styled-components";
// import "../globalStyle.css";
import preson from "../counselor/Counselorperson01.png";

const CounselorDescribed = styled.div``;

const CounselorDetail = () => {
    return (
        <>
            <Container>
                <CounselorImg src={preson}></CounselorImg>
                <CounselorDescribed></CounselorDescribed>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: felx;
    width: 400px;
`;

const CounselorImg = styled.img`
    float: right;
    width: 300px;
`;

export default CounselorDetail;

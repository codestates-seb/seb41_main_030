import styled from "styled-components";

// * styled-components
const FooterWrapper = styled.footer`
    width: 100%;
    height: 300px;
    padding: 35px 30px;

    display: grid;
    grid-template-columns: 1.5fr 4fr 1fr;

    background-color: #1a2d27;
    color: white;

    @media screen and (max-width: 800px) {
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const FooterLeft = styled.div`
    margin: 0 auto;

    & :nth-child(1) {
        font-size: 35px;
        font-weight: 700;
    }

    & :nth-child(2) {
        color: #d8d8d8;
        margin-top: 10px;
    }

    @media screen and (max-width: 800px) {
        margin: 15px;

        & :nth-child(1) {
            font-size: 28px;
        }
    }
`;

const FooterMiddle = styled.ul`
    width: 100%;

    display: flex;
    justify-content: space-around;

    div {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    h5 {
        font-weight: 600;
        font-size: 22px;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 13px;

        color: #d8d8d8;
        font-size: 16px;
    }

    @media screen and (max-width: 800px) {
        margin: 15px;
        flex-direction: column;
        gap: 15px;

        div {
            gap: 10px;
        }

        h5 {
            font-size: 18px;
        }

        ul {
            flex-direction: row;
            gap: 10px;
            font-size: 13px;
        }
    }
`;

const FooterRight = styled.ul`
    margin: 190px auto 0;
    font-size: 40px;

    @media screen and (max-width: 800px) {
        margin: 15px;
        font-size: 28px;
    }
`;

// * component
const Footer = () => {
    return (
        <FooterWrapper>
            <FooterLeft>
                <div>MENTALTAL</div>
                <div>site design / logo © E1I5 </div>
            </FooterLeft>

            <FooterMiddle>
                <div>
                    <h5>E1I5</h5>
                </div>

                <div>
                    <h5>FrontEnd</h5>
                    <ul>
                        <li>
                            <a href="https://github.com/dev-sena" target="__blank">
                                이세나
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/xxyeon129" target="__blank">
                                정승연
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/yeong00" target="__blank">
                                최자영
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h5>BackEnd</h5>
                    <ul>
                        <li>
                            <a href="https://github.com/Kim-Jihyun1" target="__blank">
                                김지현
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Sangwonee" target="__blank">
                                윤상원
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/jinhuiju" target="__blank">
                                진희주
                            </a>
                        </li>
                    </ul>
                </div>
            </FooterMiddle>

            <FooterRight>
                <i className="fa-brands fa-github"></i>
            </FooterRight>
        </FooterWrapper>
    );
};

export default Footer;

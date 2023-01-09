import styled from "styled-components";
import "../globalStyle.css";

const Container = styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Viga&display=swap");
    display: flex;
    flex-direction: column;

    .intro {
        width: 100%;
        height: 390px;
        background-color: var(--primary-color);

        .text {
            padding-top: 145px;
            padding-left: 68px;
            color: var(--white);

            .description {
                font-size: 20px;
            }

            .logo {
                font-size: 55px;
                padding-top: 10px;
            }
        }
    }
`;

const Main = () => {
    return (
        <>
            <Container>
                <div className="intro">
                    <div className="text">
                        <div className="description">심리적인 괴로움, 감정을 탈탈 털어놓으세요.</div>
                        <div className="logo">MENTALTAL</div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Main;

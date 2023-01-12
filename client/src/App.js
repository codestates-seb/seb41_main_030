import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// pages
import Boards from "./pages/Boards";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPw from "./pages/ForgotPw";

function App() {
    // footer 유무 조작
    const [isFooter, setIsFooter] = useState(true);
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/community" element={<Boards />} />
                <Route path="/" element={<Main setIsFooter={setIsFooter} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotPw" element={<ForgotPw />} />
            </Routes>
            {isFooter ? <Footer /> : null}
        </div>
    );
}

export default App;

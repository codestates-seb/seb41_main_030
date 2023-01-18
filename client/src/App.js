import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// pages
import Main from "./pages/Main";
import Boards from "./pages/Boards";
import CreateBoard from "./pages/CreateBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPw from "./pages/ForgotPw";
import BoardDetail from "./pages/BoardDetail";
import EditBoard from "./pages/EditBoard";
import CounselingCenter from "./pages/CounselingCenter";
import MyPage from "./pages/MyPage";

function App() {
    // footer 유무 조작
    const [isFooter, setIsFooter] = useState(true);

    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Main setIsFooter={setIsFooter} />} />
                <Route path="/community" element={<Boards setIsFooter={setIsFooter} />} />
                <Route path="/community/:id" element={<BoardDetail setIsFooter={setIsFooter} />} />
                <Route path="community/edit" element={<EditBoard setIsFooter={setIsFooter} />} />
                <Route path="/write" element={<CreateBoard setIsFooter={setIsFooter} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotPw" element={<ForgotPw />} />
                <Route path="/counselingcenter" element={<CounselingCenter setIsFooter={setIsFooter} />} />
                <Route path="/mypage" element={<MyPage setIsFooter={setIsFooter} />} />
            </Routes>
            {isFooter ? <Footer /> : null}
        </div>
    );
}

export default App;

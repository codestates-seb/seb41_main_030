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
import BoardDetail from "./pages/BoardDetail";
import EditBoard from "./pages/EditBoard";
import CounselingCenter from "./pages/CounselingCenter";
import MyPage from "./pages/MyPage";
import Intro from "./pages/Intro";
import SelfCheck from "./pages/SelfCheck";
import SelfCheckResult from "./pages/SelfCheckResult";
import Counselor from "./pages/Counselor";

function App() {
    // footer 유무 조작
    const [isFooter, setIsFooter] = useState(true);

    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Intro setIsFooter={setIsFooter} />} />
                <Route path="/main" element={<Main setIsFooter={setIsFooter} />} />
                <Route path="/community" element={<Boards setIsFooter={setIsFooter} />} />
                <Route path="/community/:id" element={<BoardDetail setIsFooter={setIsFooter} />} />
                <Route path="/community/edit" element={<EditBoard setIsFooter={setIsFooter} />} />
                <Route path="/write" element={<CreateBoard setIsFooter={setIsFooter} />} />
                <Route path="/login" element={<Login setIsFooter={setIsFooter} />} />
                <Route path="/signup" element={<Signup setIsFooter={setIsFooter} />} />
                <Route path="/mypage/:id/*" element={<MyPage setIsFooter={setIsFooter} />} />
                <Route path="/counselingcenter" element={<CounselingCenter setIsFooter={setIsFooter} />} />
                <Route path="/counselor" element={<Counselor setIsFooter={setIsFooter} />} />
                <Route path="/selfcheck" element={<SelfCheck setIsFooter={setIsFooter} />} />
                <Route path="/selfcheckresult" element={<SelfCheckResult setIsFooter={setIsFooter} />} />
            </Routes>
            {isFooter ? <Footer /> : null}
        </div>
    );
}

export default App;

// test github actions

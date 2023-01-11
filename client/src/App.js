import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./pages/Main";

// pages
import Boards from "./pages/Boards";

function App() {
    // footer 유무 조작
    const [isFooter, setIsFooter] = useState(true);
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/community" element={<Boards />} />
                <Route path="/" element={<Main setIsFooter={setIsFooter} />} />
            </Routes>
            {isFooter ? <Footer /> : null}
        </div>
    );
}

export default App;

import { Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";
import Main from "./pages/Main";

// pages
import Boards from "./pages/Boards";

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/community" element={<Boards />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;

import { Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";

// pages
import Boards from "./pages/Boards";

function App() {
    return (
        <div>
            <Nav />

            <Routes>
                <Route path="/community" element={<Boards />} />
            </Routes>
        </div>
    );
}

export default App;

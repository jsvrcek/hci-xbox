import './App.css'
import Home from './components/Home.tsx'
import {BrowserRouter as Router, Routes, Route} from "react-router";
import SearchPage from "./components/Search.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="search" element={<SearchPage/>}/>
            </Routes>
        </Router>
    );
}

export default App

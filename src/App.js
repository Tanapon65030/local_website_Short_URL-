import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import UrlHistory from './components/UrlHistory';
import './App.css'; 

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/history">History</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<UrlForm />} />
                    <Route path="/history" element={<UrlHistory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

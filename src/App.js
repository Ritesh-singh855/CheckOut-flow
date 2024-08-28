import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './FormPage';
import SummaryPage from './SummaryPage';
import CountdownTimer from './CountdownTimer';

function App() {
    return (
        <Router>
            <div className="App">
                {/* <CountdownTimer /> */}
                <Routes>
                    <Route path="/" element={<FormPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

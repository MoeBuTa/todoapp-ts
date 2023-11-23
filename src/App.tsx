import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './components/start';
import Todo from './components/todo';

const globalTheme = 'dark';
document.documentElement.setAttribute('data-bs-theme', globalTheme);


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Todo />} />
                <Route path="/start" element={<Start />} />
            </Routes>
        </Router>
    );
}

export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Tasks from './Tasks';

const App: React.FC = () => {
       return (
              <Router>
                     <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/tasks" element={<Tasks />} />
                     </Routes>
              </Router>
       );
};

export default App; // Ensure this is a default export

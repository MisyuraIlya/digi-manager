import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/layout/Header';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProcessPage from './pages/ProcessPage';

const RouterApp = () => {
    return (
    <Box sx={{bgcolor:'#fff', minHeight:'100vh'}}>
        <Header />
        <Box>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/process" element={<ProcessPage/>} />
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </Box>
    </Box>
    );
};

export default RouterApp;
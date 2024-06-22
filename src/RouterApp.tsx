import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/layout/Header';
import { Box } from '@mui/material';
import Home from './pages/Home';
import ApiChecker from './pages/ApiChecker';
import CreateProject from './pages/CreateProject';
import Projects from './pages/Projects';
const RouterApp = () => {
    return (
    <Box sx={{bgcolor:'#fff', minHeight:'100vh'}}>
        <Header />
        <Box>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/createProject" element={<CreateProject />} />
              <Route path="/apiChecker" element={<ApiChecker />} />
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </Box>
    </Box>
    );
};

export default RouterApp;
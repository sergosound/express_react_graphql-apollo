import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.js';
import About from '../pages/About.js';

const RRoutes = () => {
    console.log('render Routes')
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
};

export default RRoutes;

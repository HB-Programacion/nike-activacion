import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import HourButtons from './components/HourButtons';
import ImageGallery from './components/ImageGallery';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HourButtons />} /> 
        <Route path="/gallery/:hour" element={<ImageGallery />} /> 
      </Routes>
    </Router>
  );
};

export default App

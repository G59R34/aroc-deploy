import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import IdleGame from './IdleGame.jsx';
import LoginScreen from './LoginScreen.jsx';

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/main" element={<App />} />
      <Route path="/idle-game" element={<IdleGame />} />
    </Routes>
  </BrowserRouter>
);

export default Root;

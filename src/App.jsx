import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';
import NewPlayerForm from './components/NewPlayerForm';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/players/new" element={<NewPlayerForm />} />
        <Route path="/players/:id" element={<SinglePlayer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

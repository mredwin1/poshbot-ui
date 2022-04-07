import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Campaigns from './routes/campaigns.jsx';
import Home from './routes/home.jsx';
import Listings from './routes/listings.jsx';
import PoshUsers from './routes/poshUsers.jsx';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />}></Route>
        <Route path="posh-users" element={<PoshUsers />}></Route>
        <Route path="listings" element={<Listings />}></Route>
        <Route path="campaigns" element={<Campaigns />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

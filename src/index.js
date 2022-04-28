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
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import Login from './routes/login';
import ProtectedRoute from './components/common/protectedRoute.jsx';
import Logout from './components/logout';
import 'react-toastify/dist/ReactToastify.css';
import ListingNew from './routes/listingNew';
import CampaignNew from './routes/campaignsNew';
import CampaignEdit from './routes/campaignEdit';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<ProtectedRoute children={<Home />} />} />
        <Route
          path="posh-users"
          element={<ProtectedRoute children={<PoshUsers />} />}
        />
        <Route
          path="listings"
          element={<ProtectedRoute children={<Listings />} />}
        />
        <Route
          path="listings/new"
          element={<ProtectedRoute children={<ListingNew />} />}
        />
        <Route
          path="campaigns"
          element={<ProtectedRoute children={<Campaigns />} />}
        />
        <Route
          path="campaigns/new"
          element={<ProtectedRoute children={<CampaignNew />} />}
        />
        <Route
          path="campaigns/:id"
          element={<ProtectedRoute children={<CampaignEdit />} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

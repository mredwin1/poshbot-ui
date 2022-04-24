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
import configureStore from './store/configureStore';
import * as actions from './store/api';
import Login from './routes/login';
import ProtectedRoute from './components/common/protectedRoute.jsx';

const store = configureStore();

// store.dispatch({
//   type: 'user/userLoggedIn',
//   payload: {
//     access: 'user1',
//     refresh: 'Akatt12345',
//   },
// });

// store.dispatch(
//   actions.apiCallBegan({
//     url: '/auth/jwt/create',
//     method: 'POST',
//     data: {
//       username: 'user1',
//       password: 'Akatt12345',
//     },
//     onSuccess: 'user/loggedIn',
//   })
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<ProtectedRoute children={<Home />} />}></Route>
        <Route
          path="posh-users"
          element={<ProtectedRoute children={<PoshUsers />} />}
        ></Route>
        <Route
          path="listings"
          element={<ProtectedRoute children={<Listings />} />}
        ></Route>
        <Route
          path="campaigns"
          element={<ProtectedRoute children={<Campaigns />} />}
        ></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

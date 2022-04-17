import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NavBar from './components/navBar';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
const history = createBrowserHistory();
const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];

if (path) {
  history.replace(path);
}

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Provider store={store}>
      <NavBar pathname={pathname} />
      <Container style={{ marginTop: 65 }}>
        <Outlet />
      </Container>
    </Provider>
  );
}

export default App;

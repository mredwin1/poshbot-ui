import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/navBar';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

function App() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavBar pathname={pathname} />
        <Container style={{ marginTop: 65 }}>
          <Outlet />
        </Container>
      </PersistGate>
    </Provider>
  );
}

export default App;

import React from 'react';
import PoshUsers from './components/poshUsers.jsx';
import NavBar from './components/navBar.jsx';

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container" style={{ marginTop: 65 }}>
        <PoshUsers></PoshUsers>
      </main>
    </React.Fragment>
  );
}

export default App;

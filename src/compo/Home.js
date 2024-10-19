// Home.js
import React from 'react';
import Navbar from '../nav'; 

function Home() {
  return (
    <div>
      <Navbar /> 
      <div style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the home page.</p>
      </div>
    </div>
  );
}

export default Home;

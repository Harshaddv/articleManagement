import React from 'react';
import { ToastContainer } from 'react-toastify';

import Router from './router/router';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router/>
    </div>
  );
}

export default App;

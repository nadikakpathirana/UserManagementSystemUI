import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './screens/layout';
import Login from './screens/login';
import Register from './screens/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Layout /> }>

          <Route index element={ <div>Dashboard</div>} />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="*" element={ <div>Not Found</div> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

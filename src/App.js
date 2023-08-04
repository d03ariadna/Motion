import './index.css';

import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import OneProject from './pages/OneProject';
import Settings from './pages/Settings';

import LogIn from './pages/LogIn';
import Register from './pages/Register';
import SignUpForm from './pages/NewLogin';

import { ProtectedRoutes, VerifySession } from './components/ProtectedRoutes';




function App() {
  return (
    <BrowserRouter>
      {/* Routing with React */}
      
      <Routes>

        <Route element={<VerifySession />}>
          <Route path='/' element={<SignUpForm />}></Route>
          <Route path='/login' element={<LogIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/calendar/' element={<Calendar />}></Route>
          <Route path='/calendar/:day?' element={<Calendar />}></Route>
          <Route path='/tasks' element={<Tasks />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/project/:id?' element={<OneProject />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
        </Route>
  
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;

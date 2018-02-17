import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';

const App = () => (
  <div>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/reset-password" exact component={ResetPasswordPage} />
  </div>
);

export default App;

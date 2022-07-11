import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>

  );
}
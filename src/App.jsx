import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export const App = () => {
  return (
  <Router>
   <AppRoutes />
  </Router>

  );
}
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import SalesAnalytics from '../pages/SalesAnalytics';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<SalesAnalytics />} />
    </Routes>
  );
}

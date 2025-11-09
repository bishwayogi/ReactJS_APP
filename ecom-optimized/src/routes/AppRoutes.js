import React from 'react';
import { Routes, Route } from 'react-router-dom';
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const SalesAnalytics = React.lazy(() => import('../pages/SalesAnalytics'));
const Home = React.lazy(() => import('../pages/Home'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<SalesAnalytics />} />
    </Routes>
  );
}
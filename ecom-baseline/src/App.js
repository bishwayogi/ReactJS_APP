import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>E-commerce (Baseline)</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </header>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}



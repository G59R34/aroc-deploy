import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import IdleGame from './IdleGame.jsx';
import LoginScreen from './LoginScreen.jsx';
import DailyReports from './DailyReports.jsx';
import Staff from './Staff.jsx';


// Wrappers to provide props to DailyReports and Staff
function DailyReportsWrapper() {
  // You may want to fetch or pass real data here
  // For now, use demo data from App.jsx
  const employees = [];
  const flights = [];
  const assignments = {};
  return <DailyReports employees={employees} flights={flights} assignments={assignments} />;
}

function StaffWrapper() {
  // You may want to fetch or pass real data here
  // For now, use demo data from App.jsx
  const employees = [];
  return <Staff employees={employees} />;
}

// Layout for authenticated pages only
function AuthLayout({ children }) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

// Header Component (copied from App.jsx)
function AppHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth state, tokens)
    navigate('/');
  };
  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #007bff 0%, #4f8cff 100%)',
      color: '#fff',
      padding: '1.2em 0',
      boxShadow: '0 2px 8px rgba(0,123,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginLeft: '2em' }}>
        <img src="/vite.svg" alt="AROC Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', boxShadow: '0 2px 8px rgba(0,123,255,0.10)' }} />
        <span style={{ fontWeight: 700, fontSize: '1.5em', letterSpacing: '2px' }}>AROC</span>
      </div>
      <nav style={{ marginRight: '2em', display: 'flex', gap: '2em', fontWeight: 500 }}>
        <Link to="/main" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Dashboard</Link>
        <Link to="/daily-reports" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Daily Reports</Link>
        <Link to="/staff" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Staff</Link>
       
        <button onClick={handleLogout} style={{ color: '#fff', background: 'transparent', border: 'none', fontSize: '1.1em', cursor: 'pointer', fontWeight: 500 }}>Logout</button>
      </nav>
    </header>
  );
}

// Footer Component (copied from App.jsx)
function AppFooter() {
  return (
    <footer style={{
      width: '100%',
      background: '#e3eafc',
      color: '#007bff',
      padding: '1em 0',
      textAlign: 'center',
      fontWeight: 500,
      fontSize: '1em',
      boxShadow: '0 -2px 8px rgba(0,123,255,0.04)',
      marginTop: '2em'
    }}>
      &copy; {new Date().getFullYear()} AROC Airline Staffing Dashboard
    </footer>
  );
}

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/main" element={<AuthLayout><App /></AuthLayout>} />
      <Route path="/daily-reports" element={<AuthLayout><DailyReportsWrapper /></AuthLayout>} />
      <Route path="/staff" element={<AuthLayout><StaffWrapper /></AuthLayout>} />
      <Route path="/idle-game" element={<AuthLayout><IdleGame /></AuthLayout>} />
    </Routes>
  </BrowserRouter>
);

export default Root;

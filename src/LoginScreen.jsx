import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#eaf0fa' }}>
      <h1 style={{ marginBottom: 32 }}>Welcome to AROC</h1>
      <button style={{ padding: '12px 32px', fontSize: 18, marginBottom: 16, background: '#003366', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }} onClick={() => navigate('/main')}>Login</button>
      <button style={{ padding: '12px 32px', fontSize: 18, background: '#009966', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }} onClick={() => navigate('/idle-game')}>Idle Game Mode</button>
      <div style={{ marginTop: 32, color: '#888' }}>
        <small>AROC Airport Operations &amp; Ramp Control</small>
      </div>
    </div>
  );
};

export default LoginScreen;

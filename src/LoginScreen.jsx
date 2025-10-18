
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Dummy login handler for demo
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setShowLoader(true);
    setTimeout(() => {
      setLoading(false);
      setShowLoader(false);
      if (email && password) {
        navigate('/main');
      } else {
        setError('Please enter email and password.');
      }
    }, 1500);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blurred background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundImage: 'url(/src/assets/bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.7)',
        transition: 'filter 0.5s',
      }} />
      {/* Fake loading screen animation */}
      {showLoader && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(19,51,102,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="/vite.svg" alt="Loading" style={{ width: 80, height: 80, marginBottom: 24, animation: 'spin 1.2s linear infinite' }} />
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '2em', marginBottom: 12, letterSpacing: '2px', animation: 'fadeInUp 0.7s' }}>Logging in...</div>
            <div style={{ color: '#fff', fontWeight: 400, fontSize: '1.1em', opacity: 0.8 }}>Please wait while we prepare your dashboard.</div>
          </div>
        </div>
      )}
  <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.92)', padding: '2em', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,51,102,0.18)', minWidth: '320px', textAlign: 'center', maxWidth: '90vw', width: 360, animation: 'fadeInUp 0.7s', transition: 'box-shadow 0.3s', zIndex: 1, position: 'relative', backdropFilter: 'blur(2px)' }}>
        <img src="/vite.svg" alt="AROC Logo" style={{ width: '90px', height: '90px', objectFit: 'contain', marginBottom: '0.5em', boxShadow: '0 2px 12px rgba(0,51,102,0.10)', borderRadius: '12px', background: '#f8f8fa', animation: 'logoPop 0.7s' }} />
        <h2 style={{ color: '#003366', marginBottom: '0.5em', fontWeight: 700, fontSize: '2em', letterSpacing: '2px', animation: 'fadeInUp 0.8s' }}>AROC</h2>
        <div style={{ color: '#003366', fontWeight: 600, marginBottom: '1em', fontSize: '1.1em', animation: 'fadeInUp 0.9s' }}>Airline RAMP & CS Staffing Dashboard</div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em', fontSize: '1em', borderRadius: 6, border: '1px solid #d1eaff', transition: 'box-shadow 0.2s' }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em', fontSize: '1em', borderRadius: 6, border: '1px solid #d1eaff', transition: 'box-shadow 0.2s' }} />
        {isSignup && (
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display Name" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em', fontSize: '1em', borderRadius: 6, border: '1px solid #d1eaff' }} />
        )}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.7em', background: loading ? '#bcd0ee' : '#003366', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1.1em', boxShadow: loading ? 'none' : '0 2px 8px rgba(0,51,102,0.10)', transition: 'background 0.2s, box-shadow 0.2s' }}>{isSignup ? 'Sign Up' : 'Login'}</button>
        <div style={{ marginTop: '1em' }}>
          <button type="button" onClick={() => setIsSignup(s => !s)} style={{ background: '#009966', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer', fontSize: '1em', boxShadow: '0 2px 8px rgba(0,153,102,0.10)', transition: 'background 0.2s' }}>{isSignup ? 'Switch to Login' : 'Switch to Sign Up'}</button>
        </div>
        
        {error && <div style={{ color: 'red', marginTop: '1em', fontWeight: 500 }}>{error}</div>}
      </form>
      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;

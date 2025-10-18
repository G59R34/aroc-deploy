// Simulated flight statuses
const FLIGHT_STATUSES = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived', 'Gate Change'];
const STATUS_COLORS = {
  'On Time': '#b3e6b3',
  'Delayed': '#ffe066',
  'Boarding': '#4f8cff',
  'Departed': '#b3c6e6',
  'Arrived': '#e5e5ff',
  'Gate Change': '#ff3333'
};
// Helper: get block color by airline code
function getBlockColor(flightNum) {
  if (!flightNum || typeof flightNum !== 'string') return '#e3eafc';
  const airline = flightNum.slice(0, 2).toUpperCase();
  switch (airline) {
    case 'UA': return '#d1eaff'; // United
    case 'AA': return '#ffe5e5'; // American
    case 'DL': return '#e5e5ff'; // Delta
    case 'WN': return '#fff7d1'; // Southwest
    case 'AS': return '#e5ffe5'; // Alaska
    case 'F9': return '#e5fff7'; // Frontier
    case 'B6': return '#e5f7ff'; // JetBlue
    default: return '#e3eafc';
  }
}
import React, { useState, useEffect, useRef } from 'react';
import EventLog from './EventLog';
import { useNavigate } from 'react-router-dom';
import './App.css';
import DailyReports from './DailyReports';
import Staff from './Staff';
import { supabase } from './supabaseClient';

// Header Component
function AppHeader() {
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
        <a href="/main" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Dashboard</a>
        <a href="/daily-reports" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Daily Reports</a>
        <a href="/staff" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Staff</a>
       
        <a href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1em' }}>Logout</a>
      </nav>
    </header>
  );
}

// Footer Component
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


// ContextMenu Component
function ContextMenu({ x, y, emp, gate, closeMenu, showEmployeeModal, handleReassign, clockOutEmployee, deleteAssignment, changeAssignment }) {
  return (
    <div style={{ position: 'fixed', left: x, top: y, zIndex: 99999, background: '#fff', border: '2px solid #003366', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', minWidth: '180px', padding: '0.7em 0.7em', pointerEvents: 'auto', color: '#222' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.5em', color: '#003366', fontSize: '1.08em' }}>{emp ? emp.name : 'Employee'}</div>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={e => { e.stopPropagation(); showEmployeeModal(emp.id); closeMenu(); }}>View Details</button>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={e => { e.stopPropagation(); handleReassign(emp, gate); }}>Re-Assign</button>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={e => { e.stopPropagation(); clockOutEmployee(emp.id); closeMenu(); }}>Clock Out</button>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={e => { e.stopPropagation(); deleteAssignment(emp.id); closeMenu(); }}>Delete Assignment</button>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={e => { e.stopPropagation(); changeAssignment(emp.id); closeMenu(); }}>Change Assignment</button>
      <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f8f8f8', border: 'none', borderRadius: '4px', color: '#888', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left', marginTop: '0.5em' }} onClick={e => { e.stopPropagation(); closeMenu(); }}>Close</button>
      {/* Modals, overlays, context menus, etc. */}
      {modalEmpId && (
        <EmployeeModal
          emp={employees.find(e => e.id === modalEmpId)}
          assignment={assignments[modalEmpId]}
          closeModal={closeModal}
          reassignEmployee={id => setReassignState({ show: true, emp: employees.find(e => e.id === id), gate: assignments[id]?.gate })}
          clockOutEmployee={id => {/* logic to clock out */}}
          deleteAssignment={id => {/* logic to delete assignment */}}
          changeAssignment={id => {/* logic to change assignment */}}
        />
      )}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          emp={contextMenu.emp}
          gate={contextMenu.gate}
          closeMenu={closeContextMenu}
          showEmployeeModal={showEmployeeModal}
          handleReassign={handleReassign}
          clockOutEmployee={id => {/* logic to clock out */}}
          deleteAssignment={id => {/* logic to delete assignment */}}
          changeAssignment={id => {/* logic to change assignment */}}
        />
      )}
    </div>
  );
}

// TaskNotes Component

// Constants and helpers from app.js
// Generate gates for concourses A-G, numbers 20-119 (100 per concourse)
const DEN_GATES = [];
const concourses = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
for (const concourse of concourses) {
  for (let i = 20; i < 120; i++) {
    DEN_GATES.push(`${concourse}${i}`);
  }
}
const BRAND = 'AROC';

function generateRandomEmployees() {
  // Always include Tina
  const mustHave = [{ name: 'Tina', role: 'ramp' }];
  // Random name generation with initials
  const firstNames = ['Alice', 'Carlos', 'Frank', 'Jack', 'Megan', 'Sam', 'Leo', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Rita', 'Steve', 'Tom', 'Hank', 'Grace', 'Ivy', 'Uma', 'Vera', 'Will', 'Xena', 'Yara', 'Zane', 'Bob', 'Dana', 'Eve', 'Max', 'Lara', 'Ben'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez'];
  const roles = ['ramp', 'cs', 'admin'];
  const now = new Date();
  const hour = now.getHours();
  const shift = (hour >= 6 && hour < 18) ? 'AM' : 'PM';
  let employees = [];
  let id = 1;
  // Add Tina first
  employees.push({
    name: 'Tina',
    role: 'ramp',
    id: id++,
    details: {
      phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
      shift,
      notes: ''
    }
  });
  // Generate random employees
  for (let i = 0; i < 29; i++) {
    let first = firstNames[Math.floor(Math.random() * firstNames.length)];
    let last = lastNames[Math.floor(Math.random() * lastNames.length)];
    let initials = `${first[0]}${last[0]}`;
    let role = roles[Math.floor(Math.random() * roles.length)];
    // Avoid duplicate Tina
    if (first === 'Tina' && role === 'ramp') continue;
    employees.push({
      name: `${first} ${last} (${initials})`,
      role,
      id: id++,
      details: {
        phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
        shift,
        notes: ''
      }
    });
  }
  return employees;
}

function generateRandomFlight(gate) {
  const airlines = ['UA', 'AA', 'DL', 'WN', 'AS', 'F9', 'B6'];
  const flightNum = airlines[Math.floor(Math.random() * airlines.length)] + Math.floor(100 + Math.random() * 900);
  const dests = ['LAX', 'ORD', 'ATL', 'DFW', 'SEA', 'PHX', 'MIA', 'SFO', 'LAS', 'MSP'];
  const dest = dests[Math.floor(Math.random() * dests.length)];
  const time = `${Math.floor(5 + Math.random() * 17)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  return { flightNum, dest, time, gate };
}

function generateFlights() {
  let flights = [];
  DEN_GATES.forEach(gate => {
    for (let i = 0; i < 2; i++) {
      flights.push(generateRandomFlight(gate));
    }
  });
  return flights;
}

// GatesOverview Component

// ReassignModal Component
function ReassignModal({ emp, gate, gates, doReassign, cancelReassign }) {
  // ...existing code...
}

// TaskNotes Component

// EmployeeModal Component

// LoginPage Component
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (isSignup) {
      if (!displayName) {
        setError('Please enter a display name.');
        setLoading(false);
        return;
      }
      const { data, error: signupError } = await supabase.auth.signUp({ email, password });
      if (signupError) setError(signupError.message);
      else {
        // Save display name to profile table
        const userId = data?.user?.id;
        if (userId) {
          await supabase.from('profiles').upsert({ id: userId, display_name: displayName });
        }
        setError('Signup successful! You can now log in.');
      }
    } else {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) setError(loginError.message);
      else {
        setError('');
            onLogin(true); // Set loggedIn to true after successful login
      }
    }
    setLoading(false);
  };
  // Use React Router's useNavigate for navigation
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
      {/* Login form above background */}
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.92)', padding: '2em', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: '320px', textAlign: 'center', zIndex: 1, position: 'relative', backdropFilter: 'blur(2px)' }}>
        <img src="/vite.svg" alt="AROC Logo" style={{ width: '90px', height: '90px', objectFit: 'contain', marginBottom: '0.5em', boxShadow: '0 2px 12px rgba(0,51,102,0.10)', borderRadius: '12px', background: '#f8f8fa' }} />
        <h2 style={{ color: '#003366', marginBottom: '0.5em', fontWeight: 700, fontSize: '2em', letterSpacing: '2px' }}>AROC</h2>
        <div style={{ color: '#003366', fontWeight: 600, marginBottom: '1em', fontSize: '1.1em' }}>Airline RAMP & CS Staffing Dashboard</div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em' }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em' }} />
        {isSignup && (
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display Name" required style={{ width: '100%', marginBottom: '1em', padding: '0.5em' }} />
        )}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.7em', background: '#003366', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600 }}>{isSignup ? 'Sign Up' : 'Login'}</button>
        <div style={{ marginTop: '1em' }}>
          <button type="button" onClick={() => setIsSignup(s => !s)} style={{ background: '#009966', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }}>{isSignup ? 'Switch to Login' : 'Switch to Sign Up'}</button>
        </div>
        
        {error && <div style={{ color: isSignup ? '#009966' : 'red', marginTop: '1em', fontWeight: 500 }}>{error}</div>}
      </form>
    </div>
  );
}

// StatsPage Component: Leaderboard
function StatsPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    async function fetchLeaderboard() {
      // Join profiles and progress, order by flights_successful desc
      const { data, error } = await supabase
        .from('progress')
        .select('user_id,flights_successful,profiles(display_name)')
        .order('flights_successful', { ascending: false })
        .limit(10);
      if (!error && data) setLeaderboard(data);
    }
    fetchLeaderboard();
  }, []);
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '2em auto', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,51,102,0.10)', padding: '2em' }}>
      <h2 style={{ color: '#003366', fontWeight: 700, fontSize: '2em', letterSpacing: '1px', marginBottom: '1em' }}>Leaderboard</h2>
      {/* ...existing leaderboard table code... */}
    </div>
  );
  const currentMinutes = (now - timelineStart) / 60000;

  // Helper: parse time string "HH:MM" to minutes since timelineStart
  function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    // Get today's date but use timelineStart as base
    const t = new Date(timelineStart);
    t.setHours(h, m, 0, 0);
    return (t - timelineStart) / 60000;
  }

  // Helper: get block color by airline code
// Helper: get block color by airline code
// Simulated flight statuses
const FLIGHT_STATUSES = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived', 'Gate Change'];
const STATUS_COLORS = {
  'On Time': '#b3e6b3',
  'Delayed': '#ffe066',
  'Boarding': '#4f8cff',
  'Departed': '#b3c6e6',
  'Arrived': '#e5e5ff',
  'Gate Change': '#ff3333'
};
function getBlockColor(flightNum) {
  if (!flightNum) return '#e3eafc';
  const airline = flightNum.slice(0, 2);
  switch (airline) {
    case 'UA': return '#d1eaff'; // United
    case 'AA': return '#ffe5e5'; // American
    case 'DL': return '#e5e5ff'; // Delta
    case 'WN': return '#fff7d1'; // Southwest
    case 'AS': return '#e5ffe5'; // Alaska
    case 'F9': return '#e5fff7'; // Frontier
    case 'B6': return '#e5f7ff'; // JetBlue
    default: return '#e3eafc';
  }
}

  // Helper: get block duration (minutes) based on flight time and previous flight
  function getBlockDuration(flight, flightsForGate, idx) {
    // If there is a next flight, duration is until next flight's time
    if (idx < flightsForGate.length - 1) {
      const nextFlight = flightsForGate[idx + 1];
      const startMin = timeToMinutes(flight.time);
      const endMin = timeToMinutes(nextFlight.time);
      return Math.max(endMin - startMin, 20); // Minimum 20 min block
    }
    // Otherwise, default to 45 min
    return 45;
  }

  // Header: show time ticks every 2 hours
  const headerTicks = [];
  for (let t = 0; t <= timelineMinutes; t += 120) {
    const tickTime = new Date(timelineStart.getTime() + t * 60000);
    headerTicks.push(tickTime);
  }

  // Expand/collapse state for gates
  const [expandedGates, setExpandedGates] = useState(() => Object.fromEntries(gates.map(g => [g, false])));
  const toggleGate = gate => {
    setExpandedGates(prev => ({ ...prev, [gate]: !prev[gate] }));
  };

  // Ref for timeline container to auto-scroll
  const timelineRef = useRef(null);
  useEffect(() => {
    if (timelineRef.current) {
      // Scroll to current time, with smooth animation
      timelineRef.current.scrollTo({
        left: Math.max(currentMinutes * pixelsPerMinute - 200, 0),
        behavior: 'smooth'
      });
    }
  }, [currentMinutes, pixelsPerMinute]);
  return (
    <>
      <AppHeader />
      <div ref={timelineRef} className="timeline-bar horizontal-timeline realistic-timeline" style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', maxHeight: 'calc(100vh - 120px)', position: 'relative', transition: 'box-shadow 0.5s', minWidth: timelineMinutes * pixelsPerMinute + 400, marginTop: '0.5em', zIndex: 1 }}>
      {/* Sticky timeline header */}
      <div style={{ position: 'sticky', top: 0, left: 0, zIndex: 100, background: 'rgba(255,255,255,0.98)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <div className="timeline-gate-label timeline-header-label" style={{ minWidth: 80, fontWeight: 600 }}>Gate</div>
        <div className="timeline-header-label" style={{ minWidth: 120, fontWeight: 600 }}>Flight</div>
        <div className="timeline-header-label" style={{ minWidth: 120, fontWeight: 600 }}>Employee</div>
        <div className="timeline-track" style={{ position: 'relative', height: '32px', flex: 1, minWidth: timelineMinutes * pixelsPerMinute, borderBottom: '1px solid #d0d8e8' }}>
          {/* Show ticks for 8 hours ahead, wrapping past midnight if needed */}
          {Array.from({length: Math.ceil(480/60)+1}, (_, i) => {
            // Each tick is 1 hour ahead
            let tickMinutes = currentMinutes + i*60;
            let tickHour = Math.floor((6 + Math.floor(tickMinutes/60)) % 24); // timelineStart is 6:00
            let tickMinute = 0;
            // If you want 30-min ticks, adjust accordingly
            return {tickMinutes, tickHour, tickMinute};
          }).map((tick, idx) => (
            <div key={idx} className="timeline-tick" style={{ left: (tick.tickMinutes - currentMinutes) * pixelsPerMinute, position: 'absolute', top: 0, color: '#003366', fontWeight: 600, fontSize: '1em', transition: 'left 0.7s cubic-bezier(.4,1.4,.6,1)' }}>
              {tick.tickHour.toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>
      </div>
      {/* Timeline rows */}
      <div className="timeline-rows" style={{ height: '100%', overflowY: 'auto', transition: 'box-shadow 0.5s', width: '100%' }}>
        {gates.map(gate => {
          const allFlights = getRelevantFlights(gate);
          // Only show flights within 8 hours from now, and before midnight
          const gateFlights = allFlights.filter(f => {
            const min = timeToMinutes(f.time);
            return min > currentMinutes && min <= Math.min(currentMinutes + 480, 1080);
          });
          return (
            <div key={gate} style={{ marginBottom: '1.5em', transition: 'margin-bottom 0.5s', width: '100%', position: 'relative' }}>
              {/* If no flights but last departed/arrived, show aircraft bar at gate */}
              {gateFlights.length === 0 && flights.some(f => f.gate === gate) && (
                (() => {
                  // Find last flight for this gate
                  const lastFlight = [...flights].reverse().find(f => f.gate === gate);
                  if (!lastFlight) return null;
                  // Aircraft type (random for demo)
                  const aircraft = ['319-a', '738-a', '756 DAY', '7570', '1110 SAT'][0];
                  const aircraftColor = '#d2b48c';
                  const left = 40;
                  const width = 120;
                  const top = 0;
                  return (
                    <div key={gate + '-aircraft-remain'}
                      style={{ position: 'absolute', left, top, width, height: 18, background: aircraftColor, borderRadius: 4, border: '2px solid #a66', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', zIndex: 3, display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.95em', color: '#fff', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}
                      title={`Aircraft remains at gate`}
                    >
                      {aircraft}
                    </div>
                  );
                })()
              )}
              <div className="timeline-row realistic-row" style={{ minHeight: boxHeight, background: '#f8f8fa', borderBottom: '2px solid #003366', display: 'flex', flexDirection: 'row', alignItems: 'center', transition: 'background 0.5s', width: '100%' }}>
                <div className="timeline-gate-label gate-label-vertical realistic-gate-label" style={{ height: boxHeight, minWidth: 80, display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', transition: 'background 0.5s', fontWeight: 500 }}>
                  {gate}
                </div>
                <div style={{ minWidth: 120, fontWeight: 500, color: '#003366' }}>
                  {relevantFlights.length > 0 ? relevantFlights[0].flightNum : <span style={{ color: '#888', fontWeight: 400 }}>No upcoming flights</span>}
                </div>
                <div style={{ minWidth: 120 }}>
                  {relevantFlights.length > 0 ? (
                    (assignments[gate] || []).filter(e => e.current.flightNum === relevantFlights[0].flightNum).map(emp => (
                      <span key={emp.id} style={{ background: '#003366', color: '#fff', marginRight: '0.5em', borderRadius: '5px', padding: '2px 8px', fontWeight: 600, letterSpacing: '0.5px' }}>{emp.name} <span style={{ color: '#ffe066', fontWeight: 700, marginLeft: '4px' }}>({emp.role})</span></span>
                    ))
                  ) : <span style={{ color: '#888', fontWeight: 400 }}>None</span>}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', position: 'relative', transition: 'background 0.5s', minWidth: timelineMinutes * pixelsPerMinute }}>
                  {relevantFlights.map((flight, idx) => {
                    const left = timeToMinutes(flight.time) * pixelsPerMinute;
                    const blockDuration = getBlockDuration(flight, relevantFlights, idx);
                    const blockWidth = blockDuration * pixelsPerMinute;
                    // Calculate vertical offset for overlapping flights
                    let topOffset = 0;
                    for (let j = 0; j < idx; j++) {
                      const prevFlight = relevantFlights[j];
                      const prevLeft = timeToMinutes(prevFlight.time) * pixelsPerMinute;
                      const prevBlockDuration = getBlockDuration(prevFlight, relevantFlights, j);
                      const prevBlockWidth = prevBlockDuration * pixelsPerMinute;
                      if (Math.abs(left - prevLeft) < prevBlockWidth) {
                        topOffset += boxHeight + 4;
                      }
                    }
                    // Condensed, dynamic text
                    return (
                      <div key={flight.flightNum}
                        style={{
                          position: 'absolute',
                          left,
                          top: topOffset,
                          width: blockWidth,
                          height: boxHeight,
                          background: getBlockColor(flight.flightNum),
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          padding: '0.1em 0.4em',
                          border: '2px solid #003366',
                          zIndex: 2,
                          transition: 'left 0.7s cubic-bezier(.4,1.4,.6,1), box-shadow 0.5s',
                          animation: 'fadeInBlock 0.8s',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.85em',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                        title={`${flight.flightNum} → ${flight.dest} @ ${flight.time}`}
                        onClick={() => setSelectedFlight({ ...flight, gate })}
                        onContextMenu={e => flightBlockContextMenuHandler(e, gate, flight.flightNum)}
                      >
                        <span style={{ fontWeight: 'bold', color: '#003366', marginRight: '0.7em', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '6em' }}>{flight.flightNum}</span>
                        <span style={{ color: '#555', marginRight: '0.7em', fontSize: '0.95em', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '5em' }}>{flight.dest}</span>
                        <span style={{ color: '#009966', fontWeight: 600, fontSize: '0.9em', marginRight: '0.7em' }}>{flight.time}</span>
                        <span style={{ color: '#009966', fontWeight: 600, fontSize: '0.85em' }}>Staff</span>
                      </div>
                    );
                  })}
                </div>
      {/* Staff details box for selected flight */}
      {selectedFlight && (
        <div style={{ position: 'fixed', top: '120px', right: '40px', width: '320px', background: '#fff', borderRadius: '14px', boxShadow: '0 4px 24px rgba(0,51,102,0.13)', padding: '1.5em 1.2em', zIndex: 9999 }}>
          <div style={{ fontWeight: 'bold', color: '#003366', fontSize: '1.15em', marginBottom: '0.5em' }}>{selectedFlight.flightNum} → {selectedFlight.dest}</div>
          <div style={{ color: '#555', fontSize: '1em', marginBottom: '0.5em' }}>Time: {selectedFlight.time} | Gate: {selectedFlight.gate}</div>
          <div style={{ marginBottom: '0.7em', fontWeight: 600, color: '#009966' }}>Assigned Staff:</div>
          {((assignments[selectedFlight.gate] || []).filter(e => e.current.flightNum === selectedFlight.flightNum).length === 0) ? (
            <div style={{ color: '#888', fontSize: '0.98em' }}>No employees assigned.</div>
          ) : (
            (assignments[selectedFlight.gate] || []).filter(e => e.current.flightNum === selectedFlight.flightNum).map(emp => (
              <div key={emp.id} style={{ background: '#003366', color: '#fff', marginBottom: '0.3em', borderRadius: '6px', padding: '4px 12px', fontWeight: 600, letterSpacing: '0.5px', display: 'flex', alignItems: 'center' }}>
                {emp.name} <span style={{ color: '#ffe066', fontWeight: 700, marginLeft: '8px' }}>({emp.role})</span>
                <button style={{ background: '#009966', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.2em 0.7em', fontWeight: 500, fontSize: '0.95em', cursor: 'pointer', marginLeft: '1em' }}
                  onClick={() => showEmployeeModal(emp.id)}
                >Details</button>
              </div>
            ))
          )}
          <button style={{ marginTop: '1em', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer', width: '100%' }} onClick={() => setSelectedFlight(null)}>Close</button>
        </div>
      )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <AppFooter />
    </>
  );
}

// TaskNotes Component
function TaskNotes({ notes, addNote }) {
  const [employee, setEmployee] = useState('');
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (employee && text) {
      addNote(employee, text);
      setEmployee('');
      setText('');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <input type="text" value={employee} onChange={e => setEmployee(e.target.value)} placeholder="Employee Name" required />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter task note or message" required />
        <button type="submit">Add Note</button>
      </form>
      <div id="notes-list">
        {notes.map((note, idx) => (
          <div key={idx} className="note"><strong>{note.employee}</strong>: {note.text}</div>
        ))}
      </div>
    </div>
  );
}

// EmployeeModal Component
function EmployeeModal({ emp, assignment, closeModal, reassignEmployee, clockOutEmployee, deleteAssignment, changeAssignment }) {
  if (!emp) return null;
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div id="modal-details">
          <h3>{emp.name} ({emp.role})</h3>
          <p><strong>Phone:</strong> {emp.details.phone}</p>
          <p><strong>Shift:</strong> {emp.details.shift}</p>
          <p><strong>Gate:</strong> {assignment ? assignment.gate : 'Unassigned'}</p>
          <p><strong>Current Flight:</strong> {assignment ? `${assignment.current.flightNum} → ${assignment.current.dest} @ ${assignment.current.time}` : 'N/A'}</p>
          <p><strong>Next Flight:</strong> {assignment ? `${assignment.next.flightNum} → ${assignment.next.dest} @ ${assignment.next.time}` : 'N/A'}</p>
          <p><strong>Notes:</strong> {emp.details.notes || 'None'}</p>
          <div style={{ marginTop: '1em' }}>
            <button onClick={() => reassignEmployee(emp.id)}>Re-Assign</button>{' '}
            <button onClick={() => clockOutEmployee(emp.id)}>Clock Out</button>{' '}
            <button onClick={() => deleteAssignment(emp.id)}>Delete Assignment</button>{' '}
          <button onClick={() => changeAssignment(emp.id)}>Change Assignment</button>
        </div>
      </div>
    </div>
  </div>
);
}

// Main App component
function App() {
  // ...existing code...
  // Close context menu on outside click
  useEffect(() => {
    function handleClick() {
      setFlightContextMenu(fc => fc.visible ? { ...fc, visible: false } : fc);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  // Employees state
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : generateRandomEmployees();
  });
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Flights state
  const [flights, setFlights] = useState(() => {
    // Add status and passenger load to each flight
    return generateFlights().map(f => ({
      ...f,
      status: FLIGHT_STATUSES[Math.floor(Math.random() * FLIGHT_STATUSES.length)],
      pax: Math.floor(60 + Math.random() * 120)
    }));
  });
  // Simulate flight status changes and new flights
  useEffect(() => {
    const interval = setInterval(() => {
      setFlights(prev => prev.map(f => {
        // Randomly update status
        let newStatus = f.status;
        if (Math.random() < 0.15) {
          newStatus = FLIGHT_STATUSES[Math.floor(Math.random() * FLIGHT_STATUSES.length)];
        }
        // Randomly update passenger load
        let newPax = f.pax;
        if (Math.random() < 0.1) {
          newPax = Math.max(60, Math.min(180, newPax + Math.floor(Math.random() * 20 - 10)));
        }
        return { ...f, status: newStatus, pax: newPax };
      }));
      // Occasionally add new flights
      if (Math.random() < 0.05) {
        setFlights(prev => [
          ...prev,
          ...DEN_GATES.slice(0, 2).map(gate => ({
            ...generateRandomFlight(gate),
            status: FLIGHT_STATUSES[Math.floor(Math.random() * FLIGHT_STATUSES.length)],
            pax: Math.floor(60 + Math.random() * 120)
          }))
        ]);
      }
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);
  // Live time state
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  // Track manually removed employees to prevent auto-reassignment
  const [manuallyRemoved, setManuallyRemoved] = useState(new Set());

  // Assignments state: { [gate]: [{...emp, current: flight, next: flight }] }
  const [assignments, setAssignments] = useState({});
  // Context menu state
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, emp: null, gate: null });
  // Login state
  // Remove internal login state
  // Modal states
  const [manualAssignOpen, setManualAssignOpen] = useState(false);
  const [selectedGate, setSelectedGate] = useState('');
  const [selectedFlight, setSelectedFlight] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [reassignState, setReassignState] = useState({ show: false, emp: null, gate: null });
  const [modalEmpId, setModalEmpId] = useState(null);
  const [user, setUser] = useState('');
  const [page, setPage] = useState('dashboard');
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [flightContextMenu, setFlightContextMenu] = useState({ visible: false, x: 0, y: 0, gate: '', flightNum: '' });
  const [timePlayed, setTimePlayed] = useState(0);
  const [flightsSuccessful, setFlightsSuccessful] = useState(0);

  // Listen for auth changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSupabaseUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Logout
  function handleLogout() {
    supabase.auth.signOut();
    setSupabaseUser(null);
    setLoggedIn(false);
  }

  // Save progress to Supabase
  async function saveProgress() {
    if (!supabaseUser) return;
    await supabase.from('progress').upsert({
      user_id: supabaseUser.id,
      time_played: timePlayed,
      flights_successful: flightsSuccessful
    });
  }

  // Modal logic
  const showEmployeeModal = (empId) => setModalEmpId(empId);
  const closeModal = () => setModalEmpId(null);

  // Context menu logic
  const handleContextMenu = (e, emp, gate) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX - 180,
      y: e.clientY,
      emp,
      gate
    });
  };
  const closeContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, emp: null, gate: null });

  // Visual re-assign
  const handleReassign = (emp, gate) => {
    setReassignState({ show: true, emp, gate });
    closeContextMenu();
  };
  const doReassign = (newGate) => {
    // ...existing logic...
    setReassignState({ show: false, emp: null, gate: null });
  };
  const cancelReassign = () => setReassignState({ show: false, emp: null, gate: null });

  // Assignment logic
  // Auto-assign employees to flights/gates based on shift and role
  useEffect(() => {
    // Only auto-assign if assignments are empty or user requests
    if (Object.keys(assignments).length === 0) {
      // Group flights by gate
      const flightsByGate = {};
      flights.forEach(f => {
        if (!flightsByGate[f.gate]) flightsByGate[f.gate] = [];
        flightsByGate[f.gate].push(f);
      });
      // Assign employees to gates/flights
      const newAssignments = {};
      let empIdx = 0;
      DEN_GATES.slice(0, 30).forEach(gate => {
        const gateFlights = flightsByGate[gate] || [];
        newAssignments[gate] = [];
        // Assign 1-2 employees per flight
        gateFlights.forEach((flight, fIdx) => {
          for (let i = 0; i < 2; i++) {
            if (empIdx >= employees.length) empIdx = 0;
            const emp = employees[empIdx];
            // Assign only if not manually removed
            if (!manuallyRemoved.has(emp.id)) {
              newAssignments[gate].push({
                ...emp,
                current: flight,
                next: gateFlights[fIdx + 1] || null
              });
              empIdx++;
            }
          }
        });
      });
      setAssignments(newAssignments);
    }
  }, [employees, flights, manuallyRemoved]);



  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, background: 'linear-gradient(120deg,#eaf3fa 0%,#f8f8fa 100%)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      // Main Layout: Sidebar + Timeline + Event Log
      <div style={{ display: 'flex', flex: 1, minHeight: 0, width: '100vw', height: 'calc(100vh - 60px)', margin: 0, padding: 0, gap: '2.5em', background: '#f4f8fc' }}>
        {/* Sidebar: Gates & Resources */}
      <aside style={{ width: 280, background: '#eaf3fa', borderRight: '2px solid #d1eaff', padding: '2em 1.5em', overflowY: 'auto', height: '100%', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,51,102,0.07)' }}>
      <div style={{ fontWeight: 700, fontSize: '1.2em', marginBottom: '1.5em', color: '#003366', letterSpacing: '1px' }}>Resources</div>
          {/* Dynamic gate/resource list */}
          {DEN_GATES.slice(0, 30).map(gate => {
            // Employees assigned to this gate
            const assignedEmps = (assignments[gate] || []);
            return (
              <div key={gate} style={{ marginBottom: '1.5em', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,51,102,0.10)', padding: '1.2em 1.2em' }}>
                <div style={{ fontWeight: 600, color: '#003366', marginBottom: 4 }}>{gate}</div>
                {assignedEmps.length === 0 ? (
                  <div style={{ fontSize: '0.98em', color: '#888', marginBottom: 2 }}>No employees assigned</div>
                ) : (
                  assignedEmps.map(emp => (
                    <div key={emp.id} style={{ fontSize: '0.98em', color: '#222', marginBottom: 2 }}>{emp.name} <span style={{ color: '#009966', fontWeight: 600 }}>({emp.role})</span></div>
                  ))
                )}
              </div>
            );
          })}
        </aside>
        {/* Event Log Sidebar */}
      <aside style={{ width: 280, background: '#fff', borderLeft: '2px solid #d1eaff', padding: '2em 1.5em', overflowY: 'auto', height: '100%', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,51,102,0.07)' }}>
      <div style={{ fontWeight: 700, fontSize: '1.2em', marginBottom: '1.5em', color: '#003366', letterSpacing: '1px' }}>Event Log</div>
          <EventLog flights={flights} />
        </aside>

        {/* Timeline Area */}
  <section style={{ flex: 1, width: '100%', height: '100%', padding: '2em 2em', margin: 0, overflow: 'auto', background: '#f4f8fc', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,51,102,0.07)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.3em', margin: '0.5em 0 1.5em 0.5em', color: '#003366', letterSpacing: '1.5px' }}>Timeline</div>
          {/* Time ticks header with dynamic current time and cursor */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1.5em', background: '#eaf3fa', borderBottom: '2px solid #d1eaff', padding: '1em 0 1em 80px', minHeight: 48, borderRadius: '12px' }}>
            {/* Dynamic time ticks: 06:00 to 24:00, spaced out */}
            {(() => {
              const ticks = [];
              const startHour = 6;
              const endHour = 24;
              for (let hour = startHour; hour <= endHour; hour += 2) {
                ticks.push(
                  <div key={hour} style={{ minWidth: 160, textAlign: 'center', color: '#003366', fontWeight: 600, fontSize: '1em', borderLeft: hour === startHour ? 'none' : '1px solid #d1eaff' }}>
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                );
              }
              return ticks;
            })()}
            {/* Current time vertical cursor/line */}
            {(() => {
              const now = new Date();
              const hour = now.getHours();
              const minute = now.getMinutes();
              // Calculate left position for cursor (160px per 2 hours)
              const left = ((hour - 6) * 80 + (minute / 60) * 80) + 60;
              return (
                <div style={{ position: 'absolute', left, top: 0, height: '100%', width: 4, background: 'linear-gradient(180deg, #ff3333 60%, #fff 100%)', zIndex: 10, boxShadow: '0 0 8px 2px #ff3333', borderRadius: 2, animation: 'pulseLine 1.2s infinite alternate' }} />
              );
            })()}
          </div>
          {/* Timeline rows for gates */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2em', width: '100%', overflowY: 'auto', background: '#f4f8fc', position: 'relative', overflowX: 'auto' }}>
            {DEN_GATES.slice(0, 20).map(gate => {
              // Employees assigned to this gate
              const assignedEmps = (assignments[gate] || []);
              // Unique employees for this gate
              const uniqueEmps = Array.from(new Set(assignedEmps.map(e => e.id))).map(id => assignedEmps.find(e => e.id === id));
              // Flights for this gate, filter out departed/arrived
              const now = new Date();
              const nowMinutes = now.getHours() * 60 + now.getMinutes();
              let gateFlights = flights.filter(f => f.gate === gate);
              // Only show flights that have not departed/arrived
              gateFlights = gateFlights.filter(f => {
                const flightMinutes = parseInt(f.time.split(':')[0]) * 60 + parseInt(f.time.split(':')[1]);
                return flightMinutes >= nowMinutes;
              });
              // Helper: parse time string "HH:MM" to minutes since 6:00
              function timeToMinutes(timeStr) {
                const [h, m] = timeStr.split(":").map(Number);
                return (h - 6) * 60 + m;
              }
              // Timeline row: gate label, vertical employee list, horizontal assignment bars
              return (
                <div key={gate} style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', marginBottom: '1.5em', background: '#f8f8fa', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,51,102,0.10)', minHeight: Math.max(70, uniqueEmps.length * 36 + 24), padding: '1.2em 1.2em', position: 'relative', overflow: 'auto', minWidth: 1200 }}>
                  {/* Gate label */}
                  <div style={{ minWidth: 120, background: '#2a8dd4', color: '#fff', fontWeight: 700, fontSize: '1.25em', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 14, borderBottomLeftRadius: 14, borderRight: '3px solid #fff', letterSpacing: '1px', padding: '0.7em 0' }}>{gate}</div>
                  {/* Employee list */}
                  <div style={{ minWidth: 220, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', borderRight: '2px solid #eaf3fa', padding: '1em 1.2em', position: 'relative', borderRadius: '8px' }}>
                    {uniqueEmps.length === 0 ? (
                      <div style={{ color: '#888', fontSize: '1.08em', fontWeight: 500 }}>No employees assigned</div>
                    ) : (
                      uniqueEmps.map((emp, idx) => (
                        <div key={emp.id} style={{
                          color: idx === 0 ? '#222' : idx === 1 ? '#c33' : '#222',
                          fontWeight: idx === 1 ? 700 : 600,
                          fontSize: '1.08em',
                          marginBottom: '0.2em',
                          borderBottom: '1px solid #eaf3fa',
                          paddingBottom: '0.2em',
                          cursor: 'pointer',
                          background: idx === 0 ? 'none' : idx === 1 ? 'none' : 'none',
                          fontFamily: 'Arial, sans-serif',
                        }} onContextMenu={e => {
                          e.preventDefault();
                          setContextMenu({ visible: true, x: e.clientX, y: e.clientY, emp, gate });
                        }}>
                          {emp.name}
                        </div>
                      ))
                    )}
                    {/* Horizontal lines for each employee row */}
                    {uniqueEmps.map((emp, idx) => (
                      <div key={emp.id + '-line'} style={{ position: 'absolute', top: 32 + idx * 32, left: 0, right: 0, height: 2, background: '#d0d8e8', zIndex: 1 }} />
                    ))}
                  </div>
                  {/* Timeline assignments */}
                  <div style={{ flex: 1, position: 'relative', minHeight: Math.max(70, uniqueEmps.length * 36 + 44), background: '#f4f8fc', overflow: 'visible', borderRadius: '8px', marginLeft: '1em', minWidth: 1000 }}>
                    {/* Vertical organization lines for timeline */}
                    {Array.from({length: 10}).map((_, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        left: `${(i+1)*120}px`,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: '#e3eafc',
                        zIndex: 1,
                        opacity: 0.7
                      }} />
                    ))}
                    {/* Aircraft bars (one per flight, above assignments) */}
                    {gateFlights.map((flight, fIdx) => {
                      // Aircraft type (random for demo)
                      const aircraft = ['319-a', '738-a', '756 DAY', '7570', '1110 SAT'][fIdx % 5];
                      // Bar color for aircraft
                      const aircraftColor = '#d2b48c'; // brown/tan
                      // Dynamic position and width
                      // Ensure blocks stay inside container
                      let leftAircraft = timeToMinutes(flight.time) * 2 + 40;
                      leftAircraft = Math.max(leftAircraft, 0);
                      let durationAircraft = 45;
                      if (fIdx < gateFlights.length - 1) {
                        durationAircraft = timeToMinutes(gateFlights[fIdx + 1].time) - timeToMinutes(flight.time);
                        if (durationAircraft < 20) durationAircraft = 20;
                      }
                      let widthAircraft = durationAircraft * 2.5;
                      // Prevent overflow
                      widthAircraft = Math.min(widthAircraft, 600 - leftAircraft - 24);
                      const topAircraft = 0;
                      return (
                        <div key={flight.flightNum + '-aircraft'}
                          style={{ position: 'absolute', left: leftAircraft, top: topAircraft, width: widthAircraft, height: 18, background: aircraftColor, borderRadius: 4, border: '2px solid #a66', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', zIndex: 3, display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.95em', color: '#fff', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}
                          title={`Aircraft: ${aircraft}`}
                        >
                          {aircraft}
                        </div>
                      );
                    })}
                    {/* Assignment bars */}
                    {gateFlights.map((flight, fIdx) => {
                      // Employees assigned to this flight
                      const assigned = assignedEmps.filter(e => e.current.flightNum === flight.flightNum);
                      // Dynamic position and width
                      let leftAssign = timeToMinutes(flight.time) * 2 + 40;
                      leftAssign = Math.max(leftAssign, 0);
                      let durationAssign = 45;
                      if (fIdx < gateFlights.length - 1) {
                        durationAssign = timeToMinutes(gateFlights[fIdx + 1].time) - timeToMinutes(flight.time);
                        if (durationAssign < 20) durationAssign = 20;
                      }
                      let widthAssign = durationAssign * 2.5;
                      // Prevent overflow
                      widthAssign = Math.min(widthAssign, 600 - leftAssign - 24);
                      // For each assigned employee, render a bar on their row
                      return assigned.map((emp, idx) => {
                        // Determine if flight is departure or arrival (simple logic: even idx = departure, odd = arrival)
                        const isDeparture = fIdx % 2 === 0;
                        // Alternate between DP/LD-DP for departures, AR/LD-AR for arrivals
                        const depTypes = ['DP', 'LD-DP'];
                        const arrTypes = ['AR', 'LD-AR'];
                        const type = isDeparture ? depTypes[idx % 2] : arrTypes[idx % 2];
                        // Bar color by type
                        let barColor = STATUS_COLORS[flight.status] || (isDeparture ? '#b3e6b3' : '#b3c6e6');
                        // Bar position
                        const topAssign = 22 + uniqueEmps.findIndex(e => e.id === emp.id) * 32;
                        return (
                          <div key={emp.id + '-' + flight.flightNum}
                            style={{ position: 'absolute', left: leftAssign, top: topAssign, width: widthAssign, height: 28, background: barColor, borderRadius: 6, border: '2px solid #003366', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', zIndex: 2, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '0.98em', cursor: 'pointer', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}
                            title={`${gate} ${flight.flightNum} ${type} ${durationAssign}min | Status: ${flight.status} | Pax: ${flight.pax}`}
                            onContextMenu={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              setFlightContextMenu({
                                visible: true,
                                x: e.clientX,
                                y: e.clientY,
                                emp,
                                gate,
                                flightNum: flight.flightNum
                              });
                            }}
                          >
                            <span style={{ marginRight: 6, color: '#2a8dd4', fontWeight: 700 }}>{gate}</span>
                            <span style={{ marginRight: 6, color: '#222', fontWeight: 700 }}>{flight.flightNum}</span>
                            <span style={{ marginRight: 6, color: '#009966', fontWeight: 700 }}>{type}</span>
                            <span style={{ marginRight: 6, color: '#555', fontWeight: 700 }}>:{durationAssign}</span>
                            <span style={{ marginLeft: 8, color: STATUS_COLORS[flight.status] || '#222', fontWeight: 700, fontSize: '0.95em', background: '#fff', borderRadius: 4, padding: '2px 8px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>{flight.status}</span>
                            <span style={{ marginLeft: 8, color: '#003366', fontWeight: 600, fontSize: '0.95em', background: '#eaf3fa', borderRadius: 4, padding: '2px 8px' }}>Pax: {flight.pax}</span>
                          </div>
                        );
                      });
    {/* Render context menu at top level for visibility */}
    {flightContextMenu.visible && (
      <div style={{ position: 'fixed', left: flightContextMenu.x, top: flightContextMenu.y, zIndex: 100000, background: '#fff', border: '2px solid #003366', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', minWidth: '220px', padding: '1em 1em', pointerEvents: 'auto', color: '#222', userSelect: 'none' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: 'bold', marginBottom: '0.5em', color: '#003366', fontSize: '1.08em' }}>Flight {flightContextMenu.flightNum} @ {flightContextMenu.gate}</div>
        <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={() => { setManualAssignOpen(true); setSelectedGate(flightContextMenu.gate); setSelectedFlight(flightContextMenu.flightNum); setFlightContextMenu({ ...flightContextMenu, visible: false }); }}>Assign/Move Employees</button>
        <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={() => { /* Simulate gate change */ setAssignments(prev => { const newAssign = { ...prev }; if (newAssign[flightContextMenu.gate]) { newAssign[flightContextMenu.gate] = newAssign[flightContextMenu.gate].map(emp => emp.current.flightNum === flightContextMenu.flightNum ? { ...emp, current: { ...emp.current, gate: 'G99' } } : emp); } return newAssign; }); setFlightContextMenu({ ...flightContextMenu, visible: false }); }}>Gate Change</button>
        <button style={{ display: 'block', width: '100%', padding: '0.4em 0.2em', margin: '0.2em 0', background: '#f4f6fa', border: 'none', borderRadius: '4px', color: '#003366', fontWeight: 500, fontSize: '1em', cursor: 'pointer', textAlign: 'left' }} onClick={() => { setFlightContextMenu({ ...flightContextMenu, visible: false }); }}>Close</button>
      </div>
    )}
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';

// Simulated staff and airport state
const initialStaff = [
  { name: 'Tina', role: 'Ramp', status: 'Idle' },
  { name: 'Carlos', role: 'Ticketing', status: 'Idle' },
  { name: 'Megan', role: 'Gate', status: 'Idle' },
];

const roles = ['Ramp', 'Ticketing', 'Gate', 'Security', 'Baggage', 'Maintenance'];

function getRandomReview() {
  const reviews = [
    'Great service! ✈️',
    'Long lines at security...',
    'Baggage lost again!',
    'Staff was very helpful.',
    'Clean airport, fast boarding.',
    'Gate agent was rude.',
    'Smooth experience!',
    'Flight delayed, but staff handled it well.',
    'Bathrooms need cleaning.',
    'Best airport ever!'
  ];
  return reviews[Math.floor(Math.random() * reviews.length)];
}

const IdleGame = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [review, setReview] = useState('');
  const [showReview, setShowReview] = useState(false);

  // 24x speed: 1 minute = 1 hour, 1 second = 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setMinute((m) => {
        if (m === 59) {
          setHour((h) => (h + 1) % 24);
          return 0;
        }
        return m + 1;
      });
      // Randomly show/hide reviews
      if (Math.random() < 0.3) {
        setReview(getRandomReview());
        setShowReview(true);
        setTimeout(() => setShowReview(false), 3000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Assign staff to roles
  const assignStaff = (index, role) => {
    setStaff((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], role, status: 'Working' };
      return updated;
    });
  };

  return (
    <div style={{ padding: 32, background: '#f5f5fa', minHeight: '100vh' }}>
      <h2>AROC Idle Game Mode</h2>
      <div style={{ fontSize: 18, marginBottom: 16 }}>
        Time: {hour.toString().padStart(2, '0')}: {minute.toString().padStart(2, '0')}
      </div>
      {showReview && (
        <div style={{ position: 'fixed', top: 16, left: 16, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 8px #0002', zIndex: 1000 }}>
          <strong>Review:</strong> {review}
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <h3>Staff</h3>
        {staff.map((s, i) => (
          <div key={i} style={{ marginBottom: 8, background: '#eef', padding: 8, borderRadius: 6 }}>
            <strong>{s.name}</strong> - Role: {s.role} - Status: {s.status}
            <select value={s.role} onChange={e => assignStaff(i, e.target.value)} style={{ marginLeft: 12 }}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3>Airport Status</h3>
        <div>Keep assigning staff to keep the airport running smoothly!</div>
      </div>
    </div>
  );
};

export default IdleGame;

import React, { useMemo } from 'react';

// Simulate event log from flight statuses
function EventLog({ flights }) {
  // Only show recent events (last 20)
  const events = useMemo(() => {
    return flights
      .filter(f => f.status !== 'On Time')
      .slice(-20)
      .map(f => ({
        time: f.time,
        gate: f.gate,
        flightNum: f.flightNum,
        status: f.status,
        pax: f.pax
      }));
  }, [flights]);

  return (
    <div style={{ fontSize: '0.98em', color: '#222' }}>
      {events.length === 0 ? (
        <div style={{ color: '#888', fontWeight: 500 }}>No recent events</div>
      ) : (
        events.map((ev, idx) => (
          <div key={idx} style={{ marginBottom: '0.7em', background: '#eaf3fa', borderRadius: 6, boxShadow: '0 1px 4px rgba(0,51,102,0.07)', padding: '0.6em 0.8em', borderLeft: `5px solid ${ev.status === 'Delayed' ? '#ffe066' : ev.status === 'Gate Change' ? '#ff3333' : '#4f8cff'}` }}>
            <div style={{ fontWeight: 700, color: '#003366', marginBottom: 2 }}>{ev.flightNum} @ {ev.gate}</div>
            <div style={{ color: '#009966', fontWeight: 600 }}>{ev.status}</div>
            <div style={{ color: '#555', fontSize: '0.95em' }}>Time: {ev.time} | Pax: {ev.pax}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default EventLog;

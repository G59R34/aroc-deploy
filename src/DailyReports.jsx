import React from 'react';
import './App.css';

// Simulate daily report data
function generateDailyReports(employees, flights, assignments) {
  // For each flight, collect work done by admin, cs, ramp
  return flights.map(flight => {
    const assigned = Object.values(assignments).flat().filter(e => e.current.flightNum === flight.flightNum);
    const adminWork = assigned.filter(e => e.role === 'admin').map(e => `${e.name} (Admin)`);
    const csWork = assigned.filter(e => e.role === 'cs').map(e => `${e.name} (CS)`);
    const rampWork = assigned.filter(e => e.role === 'ramp').map(e => `${e.name} (Ramp)`);
    return {
      flightNum: flight.flightNum,
      gate: flight.gate,
      dest: flight.dest,
      time: flight.time,
      adminWork,
      csWork,
      rampWork
    };
  });
}

function DailyReports({ employees, flights, assignments }) {
  const reports = generateDailyReports(employees, flights, assignments);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 70px)', padding: '2em 1em', background: 'transparent' }}>
      <div style={{ width: '100%', maxWidth: 1200, background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,51,102,0.10)', padding: '3em 2.5em 2.5em 2.5em', margin: '2.5em auto 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#003366', marginBottom: '1.5em', fontWeight: 700, fontSize: '2.1em', letterSpacing: '1px' }}>Daily Reports</h2>
        <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,51,102,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.08em', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#003366', color: '#fff', position: 'sticky', top: 0, zIndex: 2 }}>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Flight</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Gate</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Destination</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Time</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Admin Work</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>CS Work</th>
                <th style={{ padding: '0.8em 0.5em', fontWeight: 700 }}>Ramp Work</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={report.flightNum} style={{ background: idx % 2 === 0 ? '#f8f8fa' : '#fff', borderBottom: '1px solid #e0e6f0', transition: 'background 0.3s' }}>
                  <td style={{ padding: '0.7em 0.5em', fontWeight: 600, color: '#003366' }}>{report.flightNum}</td>
                  <td style={{ padding: '0.7em 0.5em' }}>{report.gate}</td>
                  <td style={{ padding: '0.7em 0.5em' }}>{report.dest}</td>
                  <td style={{ padding: '0.7em 0.5em' }}>{report.time}</td>
                  <td style={{ padding: '0.7em 0.5em', color: '#0055aa' }}>{report.adminWork.length ? report.adminWork.join(', ') : <span style={{ color: '#bbb' }}>None</span>}</td>
                  <td style={{ padding: '0.7em 0.5em', color: '#009966' }}>{report.csWork.length ? report.csWork.join(', ') : <span style={{ color: '#bbb' }}>None</span>}</td>
                  <td style={{ padding: '0.7em 0.5em', color: '#e67e22' }}>{report.rampWork.length ? report.rampWork.join(', ') : <span style={{ color: '#bbb' }}>None</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '2.5em', textAlign: 'right' }}>
          <button style={{ background: 'linear-gradient(90deg,#009966 60%,#003366 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.9em 2em', fontWeight: 700, fontSize: '1.08em', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,51,102,0.10)', letterSpacing: '1px', transition: 'background 0.3s' }} onClick={() => alert('Report sent to corporate!')}>Send Report to Corporate</button>
        </div>
      </div>
    </div>
  );
}

export default DailyReports;

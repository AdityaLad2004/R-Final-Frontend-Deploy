import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

// CSS styles to replace Tailwind
const styles = `
/* Global styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
  margin: 0;
  padding: 0;
}
  /* Add these styles to your existing CSS */
.welcome-banner {
  background: linear-gradient(to right, #dbeafe, #eff6ff);
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.welcome-banner h2 {
  color: #1e40af;
  margin-bottom: 8px;
}

.welcome-banner p {
  color: #4b5563;
}

.appointment-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.appointment-dialog-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-header button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.dialog-body {
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.quick-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.quick-stat {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.stat-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.stat-indicator-green {
  background-color: #10b981;
}

.stat-indicator-blue {
  background-color: #3b82f6;
}

.stat-indicator-purple {
  background-color: #8b5cf6;
}

.recent-section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 16px;
}

.recent-patients {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.recent-patient-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9fafb;
  border-radius: 6px;
}

.patient-initial {
  width: 32px;
  height: 32px;
  background-color: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-weight: 600;
}

.patient-name-small {
  font-size: 14px;
  font-weight: 500;
}

.access-time {
  font-size: 12px;
  color: #6b7280;
  margin-left: 8px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Navbar styles */
nav {
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 16px 24px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  margin-right: 12px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: #1e40af;
}

.mobile-menu-button {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  display: none;
}

.mobile-menu-button svg {
  height: 24px;
  width: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  margin-right: 32px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2563eb;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.user-name {
  font-weight: 500;
  color: #4b5563;
}

/* Main content styles */
.main-content {
  padding: 32px 16px;
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
}

.heading-primary {
  font-size: 24px;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 24px;
}

.heading-secondary {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .mobile-menu-button {
    display: none;
  }
  
  .nav-links {
    display: flex;
  }
}

@media (max-width: 767px) {
  .mobile-menu-button {
    display: block;
  }
  
  .nav-links {
    display: none;
  }
}

.stat-card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.stat-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.stat-card-blue {
  background-color: #eff6ff;
}

.stat-card-green {
  background-color: #ecfdf5;
}

.stat-card-purple {
  background-color: #f5f3ff;
}

.stat-card-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  background-color: rgba(59, 130, 246, 0.2);
  padding: 12px;
  border-radius: 50%;
}

.stat-icon-blue {
  background-color: #dbeafe;
}

.stat-icon-green {
  background-color: #d1fae5;
}

.stat-icon-purple {
  background-color: #ede9fe;
}

.stat-icon svg {
  height: 32px;
  width: 32px;
}

.stat-icon-blue svg {
  color: #2563eb;
}

.stat-icon-green svg {
  color: #059669;
}

.stat-icon-purple svg {
  color: #7c3aed;
}

.stat-details {
  margin-left: 16px;
}

.stat-label {
  color: #6b7280;
  font-size: 14px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.action-button svg {
  height: 20px;
  width: 20px;
  margin-right: 8px;
}

.action-button-default {
  background-color: #dbeafe;
  color: #1e40af;
}

.action-button-default:hover {
  background-color: #bfdbfe;
}

.action-button-active {
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-header {
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
}

.appointments-list {
  padding: 24px;
}

.appointment-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9fafb;
  margin-bottom: 16px;
  transition: background-color 0.3s;
}

.appointment-item:hover {
  background-color: #f3f4f6;
}

.appointment-icon {
  background-color: #dbeafe;
  padding: 12px;
  border-radius: 50%;
}

.appointment-icon svg {
  height: 24px;
  width: 24px;
  color: #2563eb;
}

.appointment-details {
  margin-left: 16px;
}

.appointment-name {
  font-weight: 500;
  color: #1f2937;
}

.appointment-time {
  font-size: 14px;
  color: #6b7280;
}

.patients-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .patients-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.patient-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: box-shadow 0.3s;
  cursor: pointer;
}

.patient-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.patient-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.patient-avatar {
  width: 48px;
  height: 48px;
  background-color: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  margin-right: 16px;
  font-size: 20px;
}

.patient-name {
  font-weight: 500;
  font-size: 18px;
}

.patient-meta {
  color: #6b7280;
  font-size: 14px;
}

.view-details {
  display: flex;
  justify-content: flex-end;
}

.view-details-button {
  color: #2563eb;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
}

.view-details-button:hover {
  color: #1e40af;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

.chart-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.chart-title {
  font-size: 18px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 16px;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .documents-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .documents-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.document-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: background-color 0.3s;
}

.document-card:hover {
  background-color: #f9fafb;
}

.document-info {
  display: flex;
  align-items: flex-start;
}

.document-icon {
  background-color: #dbeafe;
  padding: 8px;
  border-radius: 8px;
  margin-right: 16px;
}

.document-icon svg {
  height: 24px;
  width: 24px;
  color: #2563eb;
}

.document-name {
  font-weight: 500;
  color: #111827;
}

.document-meta {
  color: #6b7280;
  font-size: 14px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  text-align: center;
}

.empty-state svg {
  height: 64px;
  width: 64px;
  color: #9ca3af;
  margin-bottom: 16px;
}

.empty-state-text {
  color: #6b7280;
}
`;

// NavBar Component
function NavBar() {
  return (
    <nav>
      <div className="nav-container container">
        <Link className="logo-link" to="/">
          <div className="logo-circle">
              <img className="logo-icon" src={require('../media/photos/navbarlogo.jpg')} alt="MindGrow Logo" />
            </div>
          <span className="logo-text">MindGrow</span>
        </Link>
        

        
        <div className="nav-links">
          <Link className="nav-link" to="/Doctor">Home</Link>
          <Link className="nav-link" to="/Doctor#patients">Patients</Link>
          <Link className="nav-link" to="/Doctor#reports">Reports</Link>
          <div className="user-profile">
            <div className="user-avatar">
              <span>👨‍⚕️</span>
            </div>
            <span className="user-name">Dr. Radha</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showTodayAppointments, setShowTodayAppointments] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [showPatients, setShowPatients] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState('Dr. Gunjan Bhavija');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/patients`);
        setPatients(res.data.userStats); // Make sure API returns {name, age, gender}
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };
    

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/appointments`);
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/list-documents`);
      setDocuments(res.data.documents);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
      alert('Error loading cloud documents.');
    }
  };

  // Preprocessing for Charts
  const ageDistribution = patients.reduce((acc, patient) => {
    const group = Math.floor(patient.age / 10) * 10; // Age buckets like 10, 20, 30
    const label = `${group}-${group + 9}`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const ageChartData = Object.keys(ageDistribution).map(bucket => ({
    ageRange: bucket,
    count: ageDistribution[bucket],
  }));

  const genderDistribution = patients.reduce((acc, patient) => {
    acc[patient.gender] = (acc[patient.gender] || 0) + 1;
    return acc;
  }, {});

  const genderChartData = Object.keys(genderDistribution).map(gender => ({
    name: gender,
    value: genderDistribution[gender],
  }));

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  // Calculate appointment counts
  const todayDate = new Date().toLocaleDateString();
  const todayAppointments = appointments.filter(app => 
    new Date(app.date).toLocaleDateString() === todayDate
  ).length;
  
  const totalAppointments = appointments.length;

  return (
    <>
      <style>{styles}</style>
      <NavBar />
      <div className="app-wrapper">

        
        <div className="main-content container">
          <div className="card">
            <h1 className="heading-primary">Doctor Dashboard</h1>

<div className="welcome-banner">
  <h2>Welcome back, Doctor!</h2>
  <p>Here's your practice overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
</div>
            <div className="stats-grid">
              {/* Dashboard Summary Cards */}
              <div className="stat-card stat-card-blue">
                <div className="stat-card-content">
                  <div className="stat-icon stat-icon-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="stat-details">
                    <h2 className="stat-label">Total Patients</h2>
                    <p className="stat-value">{patients.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="stat-card stat-card-green">
                <div className="stat-card-content">
                  <div className="stat-icon stat-icon-green">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-details" onClick={() => setShowTodayAppointments(true)} style={{cursor: 'pointer'}}>
                  <h2 className="stat-label">Today's Appointments</h2>
                    <p className="stat-value">{todayAppointments}</p>
                  </div>
                </div>
              </div>
              
              <div className="stat-card stat-card-purple">
                <div className="stat-card-content">
                  <div className="stat-icon stat-icon-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-details">
                    <h2 className="stat-label">Total Appointments</h2>
                    <p className="stat-value">{totalAppointments}</p>
                  </div>
                </div>
              </div>
            </div>
            {showTodayAppointments && (
  <div className="appointment-dialog">
    <div className="appointment-dialog-content">
      <div className="dialog-header">
        <h3>Today's Appointments</h3>
        <button onClick={() => setShowTodayAppointments(false)}>×</button>
      </div>
      <div className="dialog-body">
        {appointments.filter(app => new Date(app.date).toLocaleDateString() === todayDate).length === 0 ? (
          <p>No appointments scheduled for today.</p>
        ) : (
          appointments.filter(app => new Date(app.date).toLocaleDateString() === todayDate).map((app, i) => (
            <div key={i} className="appointment-item">
              <div className="appointment-details">
                <p className="appointment-name">{app.patientName}</p>
                <p className="appointment-time">at {app.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)}
            
            {/* Quick Action Buttons */}
            <div className="action-buttons">
              <button id="patients"
                onClick={() => {
                  setShowPatients(!showPatients);
                  setShowDocuments(false);
                }}
                className={showPatients ? "action-button action-button-active" : "action-button action-button-default"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                View Patients
              </button>
              
              <button id="reports"
                onClick={() => {
                  setShowDocuments(!showDocuments);
                  if (!showDocuments) fetchDocuments();
                  setShowPatients(false);
                }}
                className={showDocuments ? "action-button action-button-active" : "action-button action-button-default"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Cloud Documents
              </button>
            </div>
            <div className="quick-stats">
  <div className="quick-stat">
    <div className="stat-indicator stat-indicator-green"></div>
    <span>System Status: Online</span>
  </div>
  <div className="quick-stat">
    <div className="stat-indicator stat-indicator-blue"></div>
    <span>Latest Update: {new Date().toLocaleDateString()}</span>
  </div>
  </div>
  <div className="recent-section">
  <h3 className="section-title">Recently Accessed Patients</h3>
  <div className="recent-patients">
    {patients.slice(0, 3).map((patient, i) => (
      <div key={i} className="recent-patient-item">
        <div className="patient-initial">{patient.name[0]}</div>
        <div className="patient-name-small">{patient.name}</div>
        <div className="access-time">5m ago</div>
      </div>
    ))}
  </div>
</div>
            {/* Appointment List */}
            <div className="card">
              <div className="section-header">
                <h2 className="heading-secondary">Upcoming Appointments</h2>
              </div>
              <div className="appointments-list">
                {appointments.length === 0 ? (
                  <p className="empty-state-text">No appointments scheduled.</p>
                ) : (
                  <div className="appointments-container">
                    {appointments.map((app, i) => (
                      <div key={i} className="appointment-item">
                        <div className="appointment-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="appointment-details">
                          <p className="appointment-name">{app.patientName}</p>
                          <p className="appointment-time">
                            {new Date(app.date).toLocaleDateString()} at {app.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Patients Section */}
          {showPatients && (
            <div className="card">
              <h2 className="heading-primary">Patient Analytics</h2>
              
              <div className="patients-grid">
                {patients.map((patient, index) => (
                  <div 
                    key={index} 
                    className="patient-card"
                    onClick={() => navigate(`/patient-scores/${patient.name}`)}
                  >
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {patient.gender === 'Male' ? '👨' : '👩'}
                      </div>
                      <div>
                        <h3 className="patient-name">{patient.name}</h3>
                        <p className="patient-meta">
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="view-details">
                      <button className="view-details-button">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="charts-grid">
                {/* Age Distribution Chart */}
                <div className="chart-card">
                  <h3 className="chart-title">Age Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageChartData}>
                      <XAxis dataKey="ageRange" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gender Distribution Chart */}
                <div className="chart-card">
                  <h3 className="chart-title">Gender Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={genderChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {genderChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Cloud Documents Section */}
          {showDocuments && (
            <div className="card">
              <h2 className="heading-primary">Cloud Documents</h2>
              
              {documents.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <p className="empty-state-text">No documents found in S3 bucket.</p>
                </div>
              ) : (
                <div className="documents-grid">
                  {documents.map((doc, i) => (
                    <div key={i} className="document-card">
                      <div className="document-info">
                        <div className="document-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="document-name">{doc.key}</h3>
                          <p className="document-meta">{Math.round(doc.size / 1024)} KB</p>
                          <p className="document-meta">Modified: {new Date(doc.lastModified).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Doctor;
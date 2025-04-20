import React from 'react'
import { Bell, User, Home, BarChart2, Heart, Activity, Calendar, Settings, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <>
    {/* Header */}
    <header className="header">
    <div className="logo-container">
      <img className="logo-icon" src={require('../media/photos/navbarlogo.jpg')} alt="MindGrow Logo" />
      <Link to="/" className="logo-text">MindGrow</Link>
    </div>
    <div className="nav-container">
      <div className="nav-links">

        <a href="/Parent#dash" className="active">Dashboard</a>
        <a href="/Parent#performance">Progress</a>
        <a href="/Parent#consult">Consultations</a>
        <a href="#">Settings</a>

      </div>
      <div className="icons-container">
        <div className="notification-icon">
          <Bell size={20} className="icon" />
          <span className="notification-dot"></span>
        </div>
        <div className="user-icon">
          <User size={16} />
        </div>
      </div>
    </div>
  </header>
  </>
  )
}

export default Header
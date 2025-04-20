import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar Styles
  const styles = {
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '16px 24px',
      position: 'relative'
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    },
    logoCircle: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '0%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginRight: '12px'
    },
    logoIcon: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#1e40af'
    },
    mobileMenuButton: {
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      padding: '8px',
      display: window.innerWidth < 768 ? 'block' : 'none',
      background: 'none',
      cursor: 'pointer'
    },
    menuIcon: {
      height: '24px',
      width: '24px'
    },
    navLinks: {
      display: window.innerWidth >= 768 ? 'flex' : 'none',
      alignItems: 'center'
    },
    navLink: {
      textDecoration: 'none',
      color: '#4b5563',
      marginRight: '32px',
      transition: 'color 0.2s'
    },
    navLinkHover: {
      color: '#2563eb'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center'
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '8px'
    },
    userName: {
      fontWeight: 500,
      color: '#4b5563'
    },
    mobileNavLinks: {
      display: mobileMenuOpen ? 'flex' : 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '16px 24px',
      zIndex: 10,
      flexDirection: 'column'
    },
    mobileNavLink: {
      padding: '8px 0',
      display: 'block',
      marginRight: 0,
      textDecoration: 'none',
      color: '#4b5563'
    },
    mobileUserProfile: {
      marginTop: '8px',
      padding: '8px 0',
      display: 'flex',
      alignItems: 'center'
    }
  };

  // Media query effects
  React.useEffect(() => {
    const handleResize = () => {
      // Force re-render on window resize to update styles
      setMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link style={styles.logoLink} to="/">
          <div style={styles.logoCircle}>
            <img style={styles.logoIcon} src={require('../media/photos/navbarlogo.jpg')} alt="MindGrow Logo" />
          </div>
          <span style={styles.logoText}>MindGrow</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          style={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={styles.menuIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <div style={styles.navLinks}>
          <Link style={styles.navLink} to="/Doctor">Home</Link>
          <Link style={styles.navLink} to="/Doctor#patients">Patients</Link>
          <Link style={styles.navLink} to="/PatientScores">Reports</Link>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>
              <span>👨‍⚕️</span>
            </div>
            <span style={styles.userName}>Dr. Radha</span>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div style={styles.mobileNavLinks}>
          <Link 
            style={styles.mobileNavLink}
            to="/Doctor"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            style={styles.mobileNavLink}
            to="/Doctor#patients"
            onClick={() => setMobileMenuOpen(false)}
          >
            Patients
          </Link>
          <Link 
            style={styles.mobileNavLink}
            to="/PatientScores"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reports
          </Link>
          <div style={styles.mobileUserProfile}>
            <div style={styles.userAvatar}>
              <span>👨‍⚕️</span>
            </div>
            <span style={styles.userName}>Dr. Radha</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
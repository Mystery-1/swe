import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCalendarAlt,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import '../style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="static-home-container">
      {/* Hero Section */}
      <header className="static-hero-section">
        <div className="hero-content">
          <h1>Empower Your Day with TaskMaster Pro</h1>
          <p className="hero-subtitle">
            Streamline your workflow, organize your tasks, and boost productivity.
          </p>
          <Link to="/TaskEntry">
          <button className="hero-cta-button">Add your tasks now</button>            
          </Link>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="static-main-content">
        <section className="static-about-section">
          <h2>Why Choose TaskMaster Pro?</h2>
          <p>
            Designed for professionals, TaskMaster Pro offers a seamless task management experience 
            with features tailored to boost your productivity and keep you on track throughout the day.
          </p>
        </section>

        {/* Features Section */}
        <section className="static-features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
              <h3>Task Management</h3>
              <p>Easily add, organize, and prioritize tasks for a productive day.</p>
            </div>

            <div className="feature-card">
              <FontAwesomeIcon icon={faCalendarAlt} className="feature-icon" />
              <h3>Efficient Scheduling</h3>
              <p>Create optimized schedules that align with your workflow.</p>
            </div>

            <div className="feature-card">
              <FontAwesomeIcon icon={faBell} className="feature-icon" />
              <h3>Real-Time Alerts</h3>
              <p>Stay updated with timely notifications and reminders.</p>
            </div>

            <div className="feature-card">
              <FontAwesomeIcon icon={faUser} className="feature-icon" />
              <h3>Profile Customization</h3>
              <p>Personalize your settings to suit your unique work style.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="static-footer">
        <p>© 2024 TaskMaster Pro.</p>
      </footer>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import About from '../about/About';
import Courses from '../courses/Courses';
import AnnouncementsTicker from '../announcement/AnnouncementTicker';

const Home = () => {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to Our School</h1>
        <p>Excellence in Education Since 1950</p>
        <div className="hero-buttons">
          <Link to="/admission" className="btn btn-primary">Apply for Admission</Link>
          <Link to="/latest" className="btn btn-secondary">Latest Updates</Link>
        </div>
      </div>
      <AnnouncementsTicker/>
      <div className="features-section">
        <div className="feature-card">
          <h3>Quality Education</h3>
          <p>Experienced faculty and modern teaching methods</p>
        </div>
        <div className="feature-card">
          <h3>Modern Facilities</h3>
          <p>State-of-the-art classrooms and laboratories</p>
        </div>
        <div className="feature-card">
          <h3>Sports & Activities</h3>
          <p>Wide range of extracurricular activities</p>
        </div>
      </div>
      <About/>
      <Courses/>
    </div>
  );
};

export default Home;

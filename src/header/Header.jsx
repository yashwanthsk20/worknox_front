import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
        <NavLink className="navbar-brand" to="/">
  <img 
    src="./images/worknox_logo.png" 
    alt="Genius University Logo" 
    style={{ height: "60px", marginRight: "8px",width:"70px" }} 
  />
 
</NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/courses" 
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/latest" 
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  Latest Updates
                </NavLink>
              </li>
                {/* <li className="nav-item">
                  <NavLink 
                    to="/blog" 
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  >
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/event" 
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  >
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  >
                    Contact
                  </NavLink>
                </li> */}
              <li className="nav-item cta">
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  <span>Signup/Sign in</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

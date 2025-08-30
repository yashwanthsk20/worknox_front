import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <div>
      <footer
        className="ftco-footer ftco-bg-dark ftco-section img"
        style={{
          backgroundImage: 'url(images/bg_2.jpg)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row mb-5">
            {/* LOGO + ABOUT */}
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2>
                  <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img
                      src="./images/worknox_logo.png"
                      alt="University Logo"
                      style={{ height: '60px', width: '70px', marginRight: '8px' }}
                    />
                    {/* <span className="text-light">Genius University</span> */}
                  </NavLink>
                </h2>
                <p>
                  Genius University is dedicated to nurturing future leaders with knowledge,
                  innovation, and integrity. Our mission is to empower students to achieve
                  excellence in academics and beyond.
                </p>
                <ul className="ftco-footer-social list-unstyled mt-4 d-flex">
                  <li className="ftco-animate mr-3">
                    <a href="#">
                      <span className="icon-twitter"></span>
                    </a>
                  </li>
                  <li className="ftco-animate mr-3">
                    <a href="#">
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="#">
                      <span className="icon-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4 ml-md-4">
                <h2 className="ftco-heading-2">Quick Links</h2>
                <ul className="list-unstyled">
                  <li>
                    <NavLink to="/" className="py-2 d-block">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className="py-2 d-block">
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admissions" className="py-2 d-block">
                      Admissions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/academics" className="py-2 d-block">
                      Academics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className="py-2 d-block">
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* ACADEMICS SECTION */}
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Academics</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="py-2 d-block">
                      Undergraduate Programs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Postgraduate Programs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Online Learning
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Research & Innovation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="py-2 d-block">
                      Scholarships
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="col-md-3">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Have Questions?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon icon-map-marker"></span>
                      <span className="text">
                        123 Education Lane, Knowledge City, California, USA
                      </span>
                    </li>
                    <li>
                      <a href="tel:+1234567890">
                        <span className="icon icon-phone"></span>
                        <span className="text">+1 234 567 890</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@geniusuniversity.edu">
                        <span className="icon icon-envelope"></span>
                        <span className="text">info@geniusuniversity.edu</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                Copyright &copy;
                {new Date().getFullYear()} | All rights reserved | 
                Designed by Yashvanth S K<i className=" text-danger"></i> 
             
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

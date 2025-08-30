import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Globe } from "lucide-react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Our School
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Nurturing young minds with knowledge, discipline, and innovation since 1995.  
            We believe in shaping future leaders through holistic education.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="card mission"
        >
          <h2>🎯 Our Mission</h2>
          <p>
            To provide high-quality education that nurtures intellectual growth, 
            creativity, and ethical values. Our mission is to empower students to 
            succeed academically and socially in a rapidly changing world.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="card vision"
        >
          <h2>🌟 Our Vision</h2>
          <p>
            To be a leading educational institution that inspires innovation, 
            leadership, and excellence in students, making them responsible 
            global citizens and lifelong learners.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="value-box">
            <BookOpen className="icon blue" />
            <h3>Excellence</h3>
            <p>We strive for the highest academic and personal standards.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="value-box">
            <Users className="icon green" />
            <h3>Community</h3>
            <p>We value teamwork, respect, and inclusivity.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="value-box">
            <Award className="icon yellow" />
            <h3>Integrity</h3>
            <p>We uphold honesty, fairness, and responsibility.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="value-box">
            <Globe className="icon purple" />
            <h3>Global Outlook</h3>
            <p>We prepare students for a connected and diverse world.</p>
          </motion.div>
        </div>
      </section>

      {/* History / Timeline */}
      <section className="timeline-section">
        <h2>Our Journey</h2>
        <ul className="timeline">
          <li>
            <div className="dot blue"></div>
            <time>1995</time>
            <h3>Foundation</h3>
            <p>School established with 120 students and 10 teachers.</p>
          </li>
          <li>
            <div className="dot green"></div>
            <time>2005</time>
            <h3>Expansion</h3>
            <p>Introduced Science, Arts, and Commerce streams in Higher Secondary.</p>
          </li>
          <li>
            <div className="dot yellow"></div>
            <time>2015</time>
            <h3>Recognition</h3>
            <p>Awarded as one of the Top 10 schools in the region for academic excellence.</p>
          </li>
          <li>
            <div className="dot purple"></div>
            <time>2023</time>
            <h3>Digital Transformation</h3>
            <p>Smart classrooms, e-learning platforms, and global collaborations introduced.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;

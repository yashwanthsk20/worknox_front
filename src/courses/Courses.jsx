import React, { useState } from "react";
import "./Courses.css";

const coursesData = [
  {
    id: 1,
    title: "Primary School",
    description:
      "Building strong foundations in English, Mathematics, Science, and Social Studies for young learners.",
    duration: "Grades 1 - 5",
    level: "Primary",
    img: "./images/s1.png",
  },
  {
    id: 2,
    title: "Middle School",
    description:
      "Focus on logical thinking, STEM subjects, literature, and project-based learning.",
    duration: "Grades 6 - 8",
    level: "Middle",
    img: "./images/s2.png",
  },
  {
    id: 3,
    title: "High School",
    description:
      "Preparing students for board exams and higher education with advanced subjects and career guidance.",
    duration: "Grades 9 - 12",
    level: "High",
    img: "./images/s3.png",
  },
  {
    id: 4,
    title: "Arts & Music",
    description:
      "Develop creativity through painting, dance, music, drama, and other cultural activities.",
    duration: "After School Program",
    level: "Extracurricular",
    img: "./images/a1.png",
  },
  {
    id: 5,
    title: "Sports & Fitness",
    description:
      "Encouraging discipline and teamwork through games like football, basketball, athletics, and yoga.",
    duration: "After School Program",
    level: "Extracurricular",
    img: "./images/ss2.png",
  },
];

const Courses = () => {
  const [filter, setFilter] = useState("All");

  const filteredCourses =
    filter === "All"
      ? coursesData
      : coursesData.filter((c) => c.level === filter);

  return (
    <section className="courses-section py-5">
      <div className="container">
        <h2 className="text-center mb-4 title">Our School Programs</h2>
        <p className="text-center text-muted mb-5">
          At Genius School, we nurture students from primary to high school with
          a balance of academics, sports, and extracurriculars.
        </p>

        {/* Filter Buttons */}
        <div className="d-flex justify-content-center mb-4 flex-wrap">
          {["All", "Primary", "Middle", "High", "Extracurricular"].map((cat) => (
            <button
              key={cat}
              className={`btn mx-2 mb-2 ${
                filter === cat ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="row">
          {filteredCourses.map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4 mb-4">
              <div className="course-card shadow-lg">
                <img src={course.img} alt={course.title} className="img-fluid" />
                <div className="p-3">
                  <h5>{course.title}</h5>
                  <p className="text-muted">{course.description}</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-info">{course.level}</span>
                    <span className="badge bg-secondary">{course.duration}</span>
                  </div>
                  <a href="/admission" className="btn btn-outline-primary w-100 mt-3">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

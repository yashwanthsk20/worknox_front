import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaChartBar,
 
  FaFilter,
} from "react-icons/fa";

import { FiTrendingUp } from "react-icons/fi";

// import "./adminss.css";

const API_URL = "https://lovely-renewal-production.up.railway.app/api/admissions";
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const admissions = res.data.admissions || [];
      setStudents(admissions);

      // Prepare chart data
      const classCount = {};
      const statusCount = {};
      admissions.forEach((s) => {
        const normalizedStatus = (s.status || "").toLowerCase();
        classCount[s.class] = (classCount[s.class] || 0) + 1;
        statusCount[normalizedStatus] =
          (statusCount[normalizedStatus] || 0) + 1;
      });

      setClassData(
        Object.entries(classCount).map(([key, value]) => ({
          name: key,
          count: value,
        }))
      );

      setStatusData(
        Object.entries(statusCount).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value,
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Filter students based on selected class/status
  const filteredStudents = students.filter((s) => {
    const normalizedStatus = (s.status || "").toLowerCase();
    return (
      (!selectedClass || s.class === selectedClass) &&
      (!selectedStatus || normalizedStatus === selectedStatus.toLowerCase())
    );
  });

  // Summary counts
  const totalStudents = students.length;
  const approved = students.filter(
    (s) => (s.status || "").toLowerCase() === "approved"
  ).length;
  const pending = students.filter(
    (s) => (s.status || "").toLowerCase() === "pending"
  ).length;
  const rejected = students.filter(
    (s) => (s.status || "").toLowerCase() === "rejected"
  ).length;

  const summaryCards = [
    {
      title: "Total Students",
      count: totalStudents,
      color: "blue",
      icon: <FaUsers />,
      progress: 100,
      change: "+12%"
    },
    {
      title: "Approved",
      count: approved,
      color: "green",
      icon: <FaCheckCircle />,
      progress: totalStudents > 0 ? (approved / totalStudents) * 100 : 0,
      change: "+8%"
    },
    {
      title: "Pending",
      count: pending,
      color: "yellow",
      icon: <FaHourglassHalf />,
      progress: totalStudents > 0 ? (pending / totalStudents) * 100 : 0,
      change: "-5%"
    },
    {
      title: "Rejected",
      count: rejected,
      color: "red",
      icon: <FaTimesCircle />,
      progress: totalStudents > 0 ? (rejected / totalStudents) * 100 : 0,
      change: "+3%"
    },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="main-content">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#64748b' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Comprehensive overview of admissions and analytics</p>
          </div>
          <div className="page-actions">
            <FaChartBar size={32} />
          </div>
        </div>
        <div className="floating-decoration decoration-1"></div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`stat-card ${card.color}`}>
            <div className="stat-card-header">
              <div className={`stat-icon ${card.color}`}>
                {card.icon}
              </div>
              <div className={`stat-change ${card.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {card.change}
              </div>
            </div>
            <div className="stat-title">{card.title}</div>
            <div className="stat-value">{card.count}</div>
            <div className="stat-progress">
              <div 
                className={`stat-progress-bar ${card.color}`}
                style={{ width: `${card.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Admissions by Class Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Admissions by Class</h2>
              <p className="chart-subtitle">Distribution across different classes</p>
            </div>
            {selectedClass && (
              <div className="chart-filter">
                <div className="filter-tag">
                  <FaFilter /> Class: {selectedClass}
                </div>
                <div 
                  className="filter-clear"
                  onClick={() => setSelectedClass(null)}
                >
                  Clear
                </div>
              </div>
            )}
          </div>
          <div style={{ width: "100%", height: "300px", cursor: "pointer" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={classData}
                onClick={(data) => setSelectedClass(data.activeLabel)}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Admissions Status Pie Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Admissions Status</h2>
              <p className="chart-subtitle">Status distribution overview</p>
            </div>
            {selectedStatus && (
              <div className="chart-filter">
                <div className="filter-tag">
                  <FaFilter /> Status: {selectedStatus}
                </div>
                <div 
                  className="filter-clear"
                  onClick={() => setSelectedStatus(null)}
                >
                  Clear
                </div>
              </div>
            )}
          </div>
          <div style={{ width: "100%", height: "300px", cursor: "pointer" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  onClick={(data) => setSelectedStatus(data.name)}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="data-table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">Recent Applications</h2>
            <p className="table-subtitle">Latest student admission applications</p>
          </div>
          <div className="table-meta">
            {filteredStudents.length} of {totalStudents} students
            {(selectedClass || selectedStatus) && (
              <button 
                className="btn btn-reset"
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedStatus(null);
                }}
                style={{ marginLeft: '16px' }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              {selectedClass || selectedStatus ? 'No students match the selected filters.' : 'No students to display.'}
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Status</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.slice(0, 10).map((s, idx) => (
                <tr key={s._id || idx}>
                  <td>
                    <div className="student-cell">
                      <div className="student-avatar">
                        {getInitials(s.fullName)}
                      </div>
                      <div className="student-info">
                        <div className="student-name">{s.fullName}</div>
                        <div className="student-meta">ID: {s._id ? s._id.slice(-8) : `temp-${idx}`}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="class-badge">
                      <span>{s.class}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge ${(s.status || '').toLowerCase()}`}>
                      {(s.status || '').toLowerCase() === 'approved' && <FaCheckCircle />}
                      {(s.status || '').toLowerCase() === 'rejected' && <FaTimesCircle />}
                      {(s.status || '').toLowerCase() === 'pending' && <FaHourglassHalf />}
                      <span style={{ textTransform: 'capitalize' }}>{s.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-item">
                        <span style={{ color: '#64748b', fontSize: '14px' }}>{s.email}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Table Footer */}
        <div className="table-footer">
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            Showing {Math.min(filteredStudents.length, 10)} of {filteredStudents.length} results
            {filteredStudents.length > 10 && (
              <span style={{ marginLeft: '8px', color: '#3b82f6' }}>
                View all in Admissions tab
              </span>
            )}
          </div>
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            {filteredStudents.length > 10 && (
              <>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
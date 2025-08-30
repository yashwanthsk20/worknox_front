import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaEnvelope, FaPhone, FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "./adminss.css";

const API_URL = "https://lovely-renewal-production.up.railway.app/api/admissions";

const AdmissionsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setStudents(response.data.admissions);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, { status });
      fetchAdmissions();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "" || student.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Student Admissions</h1>
            <p className="page-subtitle">Manage and track all admission applications</p>
          </div>
          <div className="page-actions">
            <FaUsers size={32} />
          </div>
        </div>
        <div className="floating-decoration decoration-1"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <span className="filter-label">Status:</span>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="data-table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">Admission Applications</h2>
            <p className="table-subtitle">Review and manage student applications</p>
          </div>
          <div className="table-meta">
            {filteredStudents.length} of {students.length} students
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>Loading admissions...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              {searchTerm || statusFilter ? 'No admissions match your filters.' : 'No admissions found.'}
            </p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s._id}>
                  <td>
                    <div className="student-cell">
                      <div className="student-avatar">
                        {getInitials(s.fullName)}
                      </div>
                      <div className="student-info">
                        <div className="student-name">{s.fullName}</div>
                        <div className="student-meta">ID: {s._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <a href={`mailto:${s.email}`} className="email-link">{s.email}</a>
                      </div>
                      <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <span>{s.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="class-badge">
                      <span>{s.class}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: '#374151', fontWeight: '500' }}>
                      {s.parentName}
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge ${s.status.toLowerCase()}`}>
                      {s.status.toLowerCase() === 'approved' && <FaCheckCircle />}
                      {s.status.toLowerCase() === 'rejected' && <FaTimesCircle />}
                      <span style={{ textTransform: 'capitalize' }}>{s.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-approve"
                        onClick={() => handleStatusChange(s._id, "approved")}
                        disabled={s.status === 'approved'}
                      >
                        <FaCheckCircle className="btn-icon" />
                        Approve
                      </button>
                      <button
                        className="btn btn-reject"
                        onClick={() => handleStatusChange(s._id, "rejected")}
                        disabled={s.status === 'rejected'}
                      >
                        <FaTimesCircle className="btn-icon" />
                        Reject
                      </button>
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
            Showing {filteredStudents.length} results
          </div>
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsTable;
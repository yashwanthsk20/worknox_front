import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBullhorn, FaCalendarAlt, FaTrophy, FaInfoCircle, FaTrash, FaPlus } from "react-icons/fa";
// import "./adminss.css";

const API_URL = "https://worknoxback-production.up.railway.app/api/updates";

const UpdatesManager = () => {
  const [formData, setFormData] = useState({ title: "", content: "", type: "general" });
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setUpdates(res.data.updates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add`, formData);
      setFormData({ title: "", content: "", type: "general" });
      fetchUpdates();
    } catch (err) {
      console.error(err);
      alert("Error creating update");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUpdates();
      } catch (err) {
        console.error(err);
        alert("Error deleting update");
      }
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement': return <FaBullhorn />;
      case 'deadline': return <FaCalendarAlt />;
      case 'result': return <FaTrophy />;
      default: return <FaInfoCircle />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'blue';
      case 'deadline': return 'red';
      case 'result': return 'green';
      default: return 'purple';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Updates Manager</h1>
            <p className="page-subtitle">Create and manage school announcements and updates</p>
          </div>
          <div className="page-actions">
            <FaBullhorn size={32} />
          </div>
        </div>
        <div className="floating-decoration decoration-1"></div>
      </div>

      {/* Create Update Form */}
      <div className="data-table-container" style={{ marginBottom: '32px' }}>
        <div className="table-header">
          <div>
            <h2 className="table-title">Create New Update</h2>
            <p className="table-subtitle">Add announcements, deadlines, and notifications</p>
          </div>
          <div className="page-actions">
            <FaPlus size={24} />
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Update Title
              </label>
              <input
                type="text"
                placeholder="Enter update title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="search-input"
                required
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Update Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="filter-select"
                style={{ width: '100%' }}
              >
                <option value="general">General</option>
                <option value="announcement">Announcement</option>
                <option value="deadline">Deadline</option>
                <option value="result">Result</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Content
            </label>
            <textarea
              placeholder="Enter update content..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="search-input"
              required
              rows="4"
              style={{ width: '100%', minHeight: '120px', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <FaPlus className="btn-icon" />
            Create Update
          </button>
        </form>
      </div>

      {/* Updates List */}
      <div className="data-table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">All Updates</h2>
            <p className="table-subtitle">Recent announcements and notifications</p>
          </div>
          <div className="table-meta">
            {updates.length} total updates
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>Loading updates...</p>
          </div>
        ) : updates.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>No updates found. Create your first update above!</p>
          </div>
        ) : (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gap: '24px' }}>
              {updates.map((update) => (
                <div key={update._id} className="update-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div className={`stat-icon ${getTypeColor(update.type)}`}>
                          {getTypeIcon(update.type)}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                            {update.title}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                            <span className={`status-badge ${getTypeColor(update.type)}`}>
                              {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                            </span>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>
                              {new Date(update.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                        {update.content}
                      </p>
                    </div>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleDelete(update._id)}
                      style={{ marginLeft: '16px', flexShrink: 0 }}
                    >
                      <FaTrash className="btn-icon" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table Footer */}
        <div className="table-footer">
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            Showing all {updates.length} updates
          </div>
          <div className="pagination">
            <button className="pagination-btn active">1</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesManager;
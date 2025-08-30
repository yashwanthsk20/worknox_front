import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AnnouncementsTicker.css";

const API_URL = "https://worknoxback-production.up.railway.app/api/updates";

const COLORS = {
  general: "#3B82F6",
  announcement: "#10B981",
  deadline: "#F59E0B",
  result: "#EF4444",
};

const AnnouncementsTicker = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(API_URL);
      // Filter only announcements
      const filtered = res.data.updates.filter(u => u.type === "announcement");
      setAnnouncements(filtered || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="ticker-item"
            style={{ borderLeftColor: COLORS[item.type] || "#10B981" }}
          >
            <strong>{item.title}</strong>: {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsTicker;

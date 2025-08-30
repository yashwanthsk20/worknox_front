import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LatestNews.css";

const API_URL = "https://lovely-renewal-production.up.railway.app/api/updates";

const COLORS = {
  general: "#3B82F6",
  announcement: "#10B981",
  deadline: "#F59E0B",
  result: "#EF4444",
};

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL);
      setNews(res.data.updates || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const displayedNews = news
    .filter((u) => filter === "all" || u.type === filter)
    .filter((u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.content.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="latest-news-container">
      <h1>Latest School News</h1>

      {/* Search and Filter */}
      <div className="news-controls">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {["all", "general", "announcement", "deadline", "result"].map((type) => (
          <button
            key={type}
            style={{
              backgroundColor: filter === type ? COLORS[type] || "#3B82F6" : "#E5E7EB",
              color: filter === type ? "#fff" : "#111827"
            }}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="news-grid">
        {displayedNews.map((u) => (
          <div
            key={u._id}
            className="news-card"
            style={{ borderLeftColor: COLORS[u.type] || "#3B82F6" }}
          >
            <h2>
              {u.title}
              <span style={{ backgroundColor: COLORS[u.type] || "#3B82F6" }}>
                {u.type.toUpperCase()}
              </span>
            </h2>
            <p>{u.content}</p>
            <span className="date">{new Date(u.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {displayedNews.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#6B7280" }}>
          No news found for this filter/search.
        </p>
      )}
    </div>
  );
};

export default LatestNews;

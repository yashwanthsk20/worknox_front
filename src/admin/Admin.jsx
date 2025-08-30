

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./adminauth.css"; // ✅ Import external CSS

// const API_URL = "https://worknoxback-production.up.railway.app/api/admin";

// const Admin = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const endpoint = isLogin ? "/login" : "/register";
//       const response = await fetch(`${API_URL}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Something went wrong!");
//         return;
//       }

//       if (isLogin) {
//         localStorage.setItem("adminToken", data.token);
//         localStorage.setItem("userRole", data.admin.role);

//         setMessage("✅ Login successful! Redirecting...");

//         setTimeout(() => {
//           if (data.admin.role === "admin") {
//             navigate("/admindash");
//           } else {
//             navigate("/");
//           }
//         }, 1000);
//       } else {
//         setMessage("✅ Registration successful! Please login.");
//         setIsLogin(true);
//       }
//     } catch (error) {
//       console.error("Auth error:", error);
//       setMessage("Server error, please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>{isLogin ? "Admin Login" : "Register Admin"}</h2>

//         {message && <p className="auth-message">{message}</p>}

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="auth-input"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="auth-input"
//           />
//           <button type="submit" className="auth-btn">
//             {isLogin ? "Login" : "Register"}
//           </button>
//         </form>

//         <p className="auth-toggle">
//           {isLogin ? "Don’t have an account?" : "Already registered?"}{" "}
//           <button onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Register here" : "Login here"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Admin;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminauth.css";

const API_URL = "https://worknoxback-production.up.railway.app/api/admin";

const Admin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Floating elements animation
  useEffect(() => {
    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.innerHTML = ['📚', '✏️', '🎓', '📖', '🏫', '🌟'][Math.floor(Math.random() * 6)];
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 3 + 's';
      element.style.animationDuration = (Math.random() * 3 + 4) + 's';
      document.querySelector('.auth-background')?.appendChild(element);
      
      setTimeout(() => {
        element.remove();
      }, 7000);
    };

    const interval = setInterval(createFloatingElement, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? "/login" : "/register";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.message || "Something went wrong!");
        return;
      }

      if (isLogin) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("userRole", data.admin.role);
        setMessage("🎉 Welcome back! Redirecting to dashboard...");
        
        setTimeout(() => {
          if (data.admin.role === "admin") {
            navigate("/admindash");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setMessage("✅ Registration successful! Please login to continue.");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setMessage("🔴 Server connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        {/* Animated background elements */}
        <div className="bg-pattern"></div>
      </div>
      
      <div className="auth-content">
        {/* School Logo/Header */}
        <div className="school-header">
          <div className="school-logo">🏫</div>
          <h1 className="school-name">EduAdmin Portal</h1>
          <p className="school-tagline">Excellence in Education Management</p>
        </div>

        <div className="auth-card">
          <div className="card-header">
            <h2 className="auth-title">
              {isLogin ? (
                <>
                  <span className="title-icon">🔐</span>
                  Administrator Login
                </>
              ) : (
                <>
                  <span className="title-icon">📝</span>
                  Create Admin Account
                </>
              )}
            </h2>
            <p className="auth-subtitle">
              {isLogin 
                ? "Access your administrative dashboard" 
                : "Register as a new administrator"
              }
            </p>
          </div>

          {message && (
            <div className={`auth-message ${message.includes('🔴') ? 'error' : message.includes('✅') || message.includes('🎉') ? 'success' : 'info'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">👤</span>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="auth-input"
                />
              </div>
            )}

            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="auth-input password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`auth-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  <span className="btn-icon">{isLogin ? "🚀" : "✨"}</span>
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-toggle">
            <p>
              {isLogin ? "New to the system?" : "Already have an account?"}
            </p>
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isLogin ? (
                <>
                  <span className="toggle-icon">📝</span>
                  Register New Admin
                </>
              ) : (
                <>
                  <span className="toggle-icon">🔐</span>
                  Back to Login
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>🏫 Secure Administrative Access</p>
          <p>Powered by EduTech Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
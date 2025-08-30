// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./AdminLayout.css";

// const AdminLayout = ({ children }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/admin");
//   };

//   return (
//     <div className="admin-layout">
//       <aside className="sidebar flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//           <ul className="space-y-4">
//             <li>
//               <Link to="/admindash" className="hover:text-gray-300">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/admintable" className="hover:text-gray-300">
//                 Student Admissions
//               </Link>
//             </li>
//             <li>
//               <Link to="/adminupdate" className="hover:text-gray-300">
//                 Updates Manager
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Logout button at the bottom */}
//         <div className="mt-6">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>
//       <main className="admin-content">{children}</main>
//     </div>
//   );
// };

// export default AdminLayout;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [konamiCode, setKonamiCode] = useState([]);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSecretPanel, setShowSecretPanel] = useState(false);
  const [adminMood, setAdminMood] = useState('😐');
  const [secretMessage, setSecretMessage] = useState('');

  // The legendary Konami code sequence
  const KONAMI_SEQUENCE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ];

  const handleLogout = () => {
    if (isEasterEggActive) {
      alert("🎮 Thanks for playing! Logging out...");
    }
    localStorage.removeItem("token");
    navigate("/admin");
  };

  // Konami code detector - only active on admin pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only activate on admin pages
      if (!window.location.pathname.startsWith('/admin')) return;
      
      const newSequence = [...konamiCode, e.code];
      
      if (newSequence.length > KONAMI_SEQUENCE.length) {
        newSequence.shift();
      }
      
      setKonamiCode(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_SEQUENCE)) {
        activateEasterEgg();
        setKonamiCode([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  const activateEasterEgg = () => {
    setIsEasterEggActive(true);
    setSecretMessage('🎉 KONAMI CODE ACTIVATED! Welcome to SUPER ADMIN MODE! 🎉');
    setTimeout(() => setSecretMessage(''), 3000);
  };

  // Title click counter for secret panel
  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 1) setAdminMood('🤔');
    if (newCount === 3) setAdminMood('😏');
    if (newCount === 5) {
      setAdminMood('😄');
      setShowSecretPanel(true);
      setTimeout(() => {
        setShowSecretPanel(false);
        setClickCount(0);
        setAdminMood('😐');
      }, 5000);
    }
  };

  return (
    <div className={`admin-layout ${isEasterEggActive ? 'easter-egg-mode' : ''}`}>
      {/* Easter Egg Styles - Scoped to admin layout only */}
      <style>{`
        .admin-layout.easter-egg-mode {
          animation: admin-shake 0.5s ease-in-out;
        }
        
        @keyframes admin-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes admin-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        
        @keyframes admin-glow {
          0%, 100% { box-shadow: 0 0 10px #fbbf24; }
          50% { box-shadow: 0 0 20px #fbbf24, 0 0 25px #f59e0b; }
        }
        
        @keyframes admin-rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .admin-layout .sidebar.rainbow-mode {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7) !important;
          background-size: 400% 400% !important;
          animation: admin-rainbow 3s ease infinite;
          border: 2px solid gold;
        }
        
        .admin-layout .sidebar h2.bounce-mode {
          animation: admin-bounce 1s infinite;
        }
        
        .admin-layout .sidebar a.nav-bounce {
          animation: admin-bounce 0.5s ease infinite alternate;
        }
        
        .admin-layout .logout-button.super-mode {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52) !important;
          animation: admin-glow 2s infinite;
          border: 2px solid gold !important;
        }
        
        .admin-layout .secret-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 9999;
          text-align: center;
          animation: admin-bounce 0.5s ease;
          border: 3px solid gold;
          max-width: 400px;
        }
        
        .admin-layout .secret-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(45deg, #ff6b6b, #ffd93d);
          color: white;
          padding: 15px 20px;
          border-radius: 10px;
          font-weight: bold;
          z-index: 9999;
          animation: admin-bounce 0.5s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .admin-layout .konami-tracker {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-size: 0.7rem;
          color: #94a3b8;
          opacity: 0.7;
          background: rgba(0,0,0,0.1);
          padding: 5px 10px;
          border-radius: 15px;
          z-index: 1000;
        }
      `}</style>

      {/* Secret Message */}
      {secretMessage && (
        <div className="secret-message">
          {secretMessage}
        </div>
      )}
      
      {/* Secret Panel */}
      {showSecretPanel && (
        <div className="secret-panel">
          <h3>🎉 SECRET DEVELOPER PANEL! 🎉</h3>
          <p>You found the hidden click counter!</p>
          <p>Your team has great curiosity! 👨‍💻👩‍💻</p>
          <div style={{ marginTop: '15px' }}>
            <span>Fun Fact: You clicked {clickCount} times!</span>
          </div>
        </div>
      )}

      <aside className={`sidebar flex flex-col justify-between ${
        isEasterEggActive ? 'rainbow-mode' : ''
      }`}>
        <div>
          <h2 
            className={`text-xl font-bold mb-6 cursor-pointer transition-all hover:scale-105 ${
              isEasterEggActive ? 'bounce-mode' : ''
            }`}
            onClick={handleTitleClick}
            title="Click me multiple times... 😉"
            style={{ userSelect: 'none' }}
          >
            {isEasterEggActive ? '🎮' : ''} Admin Panel {adminMood}
          </h2>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/admindash" 
                className={`hover:text-gray-300 ${
                  isEasterEggActive ? 'nav-bounce' : ''
                }`}
              >
                📊 {isEasterEggActive ? 'SUPER ' : ''}Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admintable" 
                className={`hover:text-gray-300 ${
                  isEasterEggActive ? 'nav-bounce' : ''
                }`}
              >
                👥 Student {isEasterEggActive ? 'Legends' : 'Admissions'}
              </Link>
            </li>
            <li>
              <Link 
                to="/adminupdate" 
                className={`hover:text-gray-300 ${
                  isEasterEggActive ? 'nav-bounce' : ''
                }`}
              >
                🔧 Updates {isEasterEggActive ? 'Wizard' : 'Manager'}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Logout button at the bottom */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className={`logout-button w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow ${
              isEasterEggActive ? 'super-mode' : ''
            }`}
          >
            {isEasterEggActive ? '🚀 SUPER LOGOUT' : 'Logout'}
          </button>
        </div>

        {!isEasterEggActive && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '20px',
            fontSize: '0.8rem',
            color: '#64748b',
            fontStyle: 'italic',
            opacity: 0.7
          }}>
           
          </div>
        )}
      </aside>

      <main className="admin-content">
        {children}
        
        {/* Konami Progress Tracker */}
        {konamiCode.length > 0 && (
          <div className="konami-tracker">
            Konami Progress: {konamiCode.length}/{KONAMI_SEQUENCE.length}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
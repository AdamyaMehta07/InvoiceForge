import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
 
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };
 
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-name">
          Invoice<span>Forge</span>
        </div>
        <div className="sidebar-logo-tag">Adamya Mehta</div>
      </div>
 
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${isActive("/") && !isActive("/create") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          Dashboard
        </button>
 
        <button
          className={`nav-item ${isActive("/create") ? "active" : ""}`}
          onClick={() => navigate("/create")}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New Invoice
        </button>
 
        <div style={{ marginTop: "auto" }} />
      </nav>
 
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">Built by Adamya Mehta</div>
      </div>
    </aside>
  );
};
 
export default Sidebar;
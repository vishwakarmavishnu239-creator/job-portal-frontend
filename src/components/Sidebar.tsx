// import { Link } from "react-router-dom";
// import { FaBriefcase, FaFileAlt, FaPlus } from "react-icons/fa";

// export default function Sidebar() {

//   return (

//     <div className="sidebar" 
//     //style={{
//       //width:"240px",
//       //height:"100vh",
//       //background:"#1e293b",
//       //color:"white",
//       //padding:"20px"
//     //}}
//     >

//       <h4>Job Portal</h4>

//       <hr/>

//       <Link className="d-block text-white mb-3" to="/dashboard">
//         Dashboard
//       </Link>

//       <Link className="d-block text-white mb-3" to="/jobs">
//         <FaBriefcase/> Jobs
//       </Link>

//       <Link className="d-block text-white mb-3" to="/post-job">
//         <FaPlus/> Post Job
//       </Link>

//       <Link className="d-block text-white mb-3" to="/applications">
//         <FaFileAlt/> Applications
//       </Link>

//     </div>

//   );
// }
import { Link, useLocation, useNavigate } from "react-router-dom";

const roleMenus: Record<string, { label: string; icon: string; path: string }[]> = {
  ADMIN: [
    { label: "Dashboard", icon: "⚡", path: "/dashboard" },
    { label: "All Jobs", icon: "💼", path: "/jobs" },
    { label: "Applications", icon: "📋", path: "/applications" },
    { label: "Manage Users", icon: "👥", path: "/admin/users" },
    { label: "Analytics", icon: "📊", path: "/admin/analytics" },
  ],
  RECRUITER: [
    { label: "Dashboard", icon: "⚡", path: "/recruiter/dashboard" },
    { label: "Post a Job", icon: "➕", path: "/post-job" },
    { label: "My Job Listings", icon: "💼", path: "/recruiter/jobs" },
    { label: "Applications", icon: "📋", path: "/applications" },
  ],
  CANDIDATE: [
    { label: "Dashboard", icon: "⚡", path: "/candidate/dashboard" },
    { label: "Browse Jobs", icon: "🔍", path: "/jobs" },
    { label: "My Applications", icon: "📋", path: "/candidate/applications" },
    { label: "My Profile", icon: "👤", path: "/candidate/profile" },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "CANDIDATE";
  const name = localStorage.getItem("name") || "User";
  const menu = roleMenus[role] || roleMenus["CANDIDATE"];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const roleColors: Record<string, string> = {
    ADMIN: "#f59e0b",
    RECRUITER: "#10b981",
    CANDIDATE: "#6366f1",
  };
  const accent = roleColors[role] || "#6366f1";

  return (
    <div style={{
      width: "260px",
      minWidth: "260px",
      height: "100vh",
      position: "sticky",
      top: 0,
      background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      overflow: "hidden",
    }}>
      {/* Brand */}
      <div style={{
        padding: "28px 24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "bold", color: "#fff",
          }}>J</div>
          <div>
            <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", fontFamily: "'DM Sans', sans-serif" }}>JobPortal</div>
            <div style={{ color: accent, fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>{role}</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: "12px"
      }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${accent}44, ${accent}22)`,
          border: `2px solid ${accent}66`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accent, fontWeight: "700", fontSize: "16px"
        }}>{name.charAt(0).toUpperCase()}</div>
        <div>
          <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "600" }}>{name}</div>
          <div style={{ color: "#64748b", fontSize: "12px" }}>Logged in</div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <div style={{ color: "#475569", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px 8px" }}>Menu</div>
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "11px 14px", borderRadius: "10px",
                marginBottom: "4px", textDecoration: "none",
                background: active ? `linear-gradient(135deg, ${accent}22, ${accent}11)` : "transparent",
                border: active ? `1px solid ${accent}33` : "1px solid transparent",
                color: active ? accent : "#94a3b8",
                fontWeight: active ? "600" : "400",
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                }
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
              {active && <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: accent }} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={logout}
          style={{
            width: "100%", padding: "11px 14px", borderRadius: "10px",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171", cursor: "pointer", fontSize: "14px", fontWeight: "600",
            display: "flex", alignItems: "center", gap: "10px", transition: "all 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}
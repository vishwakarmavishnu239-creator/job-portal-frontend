// import { useNavigate } from "react-router-dom";

// export default function Topbar(){

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return(

//     <div className="topbar"
//     // style={{
//     //   height:"60px",
//     //   background:"#ffffff",
//     //   borderBottom:"1px solid #ddd",
//     //   display:"flex",
//     //   justifyContent:"space-between",
//     //   alignItems:"center",
//     //   padding:"0 30px"
//     // }}
//     >

//       <h4>Dashboard</h4>

//       <button className="btn btn-danger" onClick={logout}>
//         Logout
//       </button>

//     </div>

//   )

// }
import { useNavigate, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Admin Dashboard",
  "/recruiter/dashboard": "Recruiter Dashboard",
  "/candidate/dashboard": "Candidate Dashboard",
  "/jobs": "Browse Jobs",
  "/post-job": "Post a Job",
  "/applications": "Applications",
  "/admin/users": "Manage Users",
  "/admin/analytics": "Analytics",
  "/recruiter/jobs": "My Job Listings",
  "/candidate/applications": "My Applications",
  "/candidate/profile": "My Profile",
};

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role") || "CANDIDATE";
  const name = localStorage.getItem("name") || "User";
  const title = pageTitles[location.pathname] || "Dashboard";

  const roleColors: Record<string, string> = {
    ADMIN: "#f59e0b",
    RECRUITER: "#10b981",
    CANDIDATE: "#6366f1",
  };
  const accent = roleColors[role];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      height: "68px",
      background: "#ffffff",
      borderBottom: "1px solid #e8edf5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0f172a", fontFamily: "'DM Sans', sans-serif" }}>{title}</h2>
        <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Notification Bell */}
        <button style={{
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px",
          width: "40px", height: "40px", cursor: "pointer", fontSize: "18px",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          🔔
          <span style={{
            position: "absolute", top: "6px", right: "6px",
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#ef4444", border: "2px solid white",
          }} />
        </button>

        {/* User Chip */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderRadius: "12px", padding: "6px 14px 6px 8px",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "700", fontSize: "14px",
          }}>{name.charAt(0).toUpperCase()}</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{name}</div>
            <div style={{ fontSize: "11px", color: accent, fontWeight: "600" }}>{role}</div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            border: "none", borderRadius: "10px",
            padding: "8px 18px", color: "white",
            fontSize: "13px", fontWeight: "600", cursor: "pointer",
          }}
        >Logout</button>
      </div>
    </div>
  );
}
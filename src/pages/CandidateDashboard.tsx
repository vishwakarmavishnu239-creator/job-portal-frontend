import { Link } from "react-router-dom";

const featuredJobs = [
  { title: "Frontend Developer", company: "TechCorp", location: "Hyderabad", salary: "₹8-12 LPA", type: "Full-time", logo: "🚀", color: "#6366f1" },
  { title: "UI/UX Designer", company: "DesignHub", location: "Bangalore", salary: "₹6-10 LPA", type: "Remote", logo: "🎨", color: "#f59e0b" },
  { title: "Data Analyst", company: "DataVision", location: "Mumbai", salary: "₹7-11 LPA", type: "Hybrid", logo: "📊", color: "#10b981" },
];

const skills = ["React", "TypeScript", "Node.js", "UI/UX", "Python"];

export default function CandidateDashboard() {
  const name = localStorage.getItem("name") || "Candidate";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Welcome */}
      <div style={{
        background: "linear-gradient(135deg, #312e81 0%, #4c1d95 100%)",
        borderRadius: "20px", padding: "32px 36px", marginBottom: "28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(167,139,250,0.15)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "#a5b4fc", margin: "0 0 6px", fontSize: "13px", fontWeight: "600" }}>👋 WELCOME BACK</p>
          <h2 style={{ color: "#fff", margin: "0 0 10px", fontSize: "26px", fontWeight: "800" }}>Hello, {name}!</h2>
          <p style={{ color: "#c4b5fd", margin: "0 0 20px", fontSize: "15px" }}>Your dream job is just a click away. Let's get started!</p>
          <Link to="/jobs" style={{
            display: "inline-block", background: "white", color: "#4c1d95",
            padding: "10px 24px", borderRadius: "10px", textDecoration: "none",
            fontWeight: "700", fontSize: "14px",
          }}>Browse Jobs →</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {[
          { icon: "📋", label: "Applications Sent", value: "12", color: "#6366f1" },
          { icon: "👁️", label: "Profile Views", value: "47", color: "#10b981" },
          { icon: "💬", label: "Interview Calls", value: "3", color: "#f59e0b" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0", display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{s.icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{s.label}</p>
              <h3 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* Featured Jobs */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Recommended for You</h3>
            <Link to="/jobs" style={{ fontSize: "13px", color: "#6366f1", fontWeight: "600", textDecoration: "none" }}>View all →</Link>
          </div>
          {featuredJobs.map((job, i) => (
            <div key={i} style={{
              display: "flex", gap: "16px", padding: "16px", borderRadius: "14px",
              border: "1px solid #f1f5f9", marginBottom: "12px", background: "#fafafa", alignItems: "flex-start",
            }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${job.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", minWidth: "48px" }}>{job.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>{job.title}</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>🏢 {job.company} · 📍 {job.location}</div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                  <span style={{ background: `${job.color}15`, color: job.color, borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: "600" }}>{job.type}</span>
                  <span style={{ background: "#f0fdf4", color: "#059669", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: "600" }}>{job.salary}</span>
                </div>
              </div>
              <Link to="/jobs" style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white",
                border: "none", borderRadius: "10px", padding: "8px 16px",
                fontSize: "13px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap",
              }}>Apply</Link>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Profile Completion */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Profile Strength</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#64748b" }}>Completion</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#6366f1" }}>72%</span>
            </div>
            <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #6366f1, #818cf8)", borderRadius: "4px" }} />
            </div>
            <p style={{ margin: "12px 0 0", fontSize: "12px", color: "#94a3b8" }}>Add your skills and resume to get more visibility</p>
          </div>

          {/* Skills */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Your Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map(skill => (
                <span key={skill} style={{ background: "#f0f0ff", color: "#4f46e5", borderRadius: "8px", padding: "6px 12px", fontSize: "13px", fontWeight: "600", border: "1px solid #e0e0ff" }}>{skill}</span>
              ))}
              <span style={{ background: "#f8fafc", color: "#94a3b8", borderRadius: "8px", padding: "6px 12px", fontSize: "13px", border: "1px dashed #cbd5e1", cursor: "pointer" }}>+ Add</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Quick Links</h3>
            {[
              { label: "View My Applications", icon: "📋", path: "/candidate/applications" },
              { label: "Update Profile", icon: "👤", path: "/candidate/profile" },
              { label: "Browse All Jobs", icon: "🔍", path: "/jobs" },
            ].map(link => (
              <Link key={link.label} to={link.path} style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
                borderRadius: "10px", textDecoration: "none", color: "#374151",
                fontSize: "14px", fontWeight: "500", transition: "background 0.2s",
                marginBottom: "6px",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f8fafc"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
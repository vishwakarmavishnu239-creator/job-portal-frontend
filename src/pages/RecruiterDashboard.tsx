import { Link } from "react-router-dom";

const myJobs = [
  { title: "Senior React Developer", applicants: 24, status: "Active", days: 5, color: "#10b981" },
  { title: "Product Manager", applicants: 16, status: "Active", days: 8, color: "#10b981" },
  { title: "DevOps Engineer", applicants: 9, status: "Closed", days: 21, color: "#94a3b8" },
];

const recentApplicants = [
  { name: "Arjun Mehta", role: "Senior React Developer", score: "92%", status: "Review" },
  { name: "Sneha Patel", role: "Product Manager", score: "88%", status: "Shortlisted" },
  { name: "Vikram Singh", role: "Senior React Developer", score: "81%", status: "Review" },
  { name: "Priya Nair", role: "DevOps Engineer", score: "76%", status: "Rejected" },
];

const statusColors: Record<string, string> = {
  Review: "#f59e0b",
  Shortlisted: "#10b981",
  Rejected: "#ef4444",
};

export default function RecruiterDashboard() {
  const name = localStorage.getItem("name") || "Recruiter";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
        borderRadius: "20px", padding: "32px 36px", marginBottom: "28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(16,185,129,0.15)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "#6ee7b7", margin: "0 0 6px", fontSize: "13px", fontWeight: "600" }}>🏢 RECRUITER HUB</p>
          <h2 style={{ color: "#fff", margin: "0 0 10px", fontSize: "26px", fontWeight: "800" }}>Welcome, {name}!</h2>
          <p style={{ color: "#a7f3d0", margin: "0 0 20px", fontSize: "15px" }}>You have 49 new applications to review today.</p>
          <Link to="/post-job" style={{
            display: "inline-block", background: "#10b981", color: "white",
            padding: "10px 24px", borderRadius: "10px", textDecoration: "none",
            fontWeight: "700", fontSize: "14px",
          }}>+ Post New Job</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {[
          { icon: "💼", label: "Active Jobs", value: "8", color: "#10b981" },
          { icon: "📋", label: "Total Applications", value: "149", color: "#6366f1" },
          { icon: "⭐", label: "Shortlisted", value: "32", color: "#f59e0b" },
          { icon: "✅", label: "Hired This Month", value: "6", color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: "16px", padding: "22px",
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                <h3 style={{ margin: 0, fontSize: "30px", fontWeight: "800", color: "#0f172a" }}>{s.value}</h3>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* My Jobs */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>My Job Listings</h3>
            <Link to="/recruiter/jobs" style={{ fontSize: "13px", color: "#10b981", fontWeight: "600", textDecoration: "none" }}>View all →</Link>
          </div>
          {myJobs.map((job, i) => (
            <div key={i} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#fafafa", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>{job.title}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Posted {job.days} days ago</div>
                </div>
                <span style={{ background: `${job.color}15`, color: job.color, borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontWeight: "600" }}>{job.status}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                <span style={{ fontSize: "16px" }}>👥</span>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#6366f1" }}>{job.applicants}</span>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>applicants</span>
              </div>
            </div>
          ))}
          <Link to="/post-job" style={{
            display: "block", textAlign: "center", padding: "12px", borderRadius: "12px",
            border: "2px dashed #d1fae5", color: "#10b981", textDecoration: "none",
            fontWeight: "700", fontSize: "14px", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f0fdf4"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
          >+ Post New Job</Link>
        </div>

        {/* Recent Applicants */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Recent Applicants</h3>
            <Link to="/applications" style={{ fontSize: "13px", color: "#10b981", fontWeight: "600", textDecoration: "none" }}>View all →</Link>
          </div>
          {recentApplicants.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: i < recentApplicants.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#6366f1", fontSize: "16px" }}>
                {a.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{a.name}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{a.role}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#10b981" }}>{a.score}</div>
                <span style={{ background: `${statusColors[a.status]}20`, color: statusColors[a.status], borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
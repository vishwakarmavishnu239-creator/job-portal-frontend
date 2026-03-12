// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Applications(){

//   const [applications,setApplications] = useState<any[]>([]);

//   useEffect(()=>{

//     API.get("/applications")
//       .then(res => setApplications(res.data));

//   },[]);

//   return(

//     <div className="container mt-4">

//       <h2>Applications</h2>

//       <table className="table table-hover">

// <thead className="table-light">

// <tr>
// <th>Job</th>
// <th>Candidate</th>
// <th>Email</th>
// <th>Resume</th>
// </tr>

// </thead>

// <tbody>

// {applications.map(app => (

// <tr key={app.id}>
// <td>{app.job?.title}</td>
// <td>{app.user?.name}</td>
// <td>{app.user?.email}</td>
// <td>{app.resume}</td>
// </tr>

// ))}

// </tbody>

// </table>

//     </div>
//   )
// }
import { useEffect, useState } from "react";
import API from "../services/api";

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#fef9c3", text: "#a16207" },
  reviewed: { bg: "#dbeafe", text: "#1d4ed8" },
  shortlisted: { bg: "#dcfce7", text: "#166534" },
  rejected: { bg: "#fee2e2", text: "#dc2626" },
  hired: { bg: "#f0fdf4", text: "#15803d" },
};

export default function Applications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get("/applications")
      .then(res => setApplications(res.data))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b, #312e81)",
        borderRadius: "20px", padding: "28px 32px", marginBottom: "28px",
      }}>
        <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "24px", fontWeight: "800" }}>
          {role === "CANDIDATE" ? "My Applications 📋" : "All Applications 📋"}
        </h2>
        <p style={{ color: "#a5b4fc", margin: 0, fontSize: "14px" }}>
          {role === "CANDIDATE" ? "Track the status of your job applications" : "Review and manage candidate applications"}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total", value: applications.length, color: "#6366f1" },
          { label: "Pending", value: applications.filter(a => !a.status || a.status === "pending").length, color: "#f59e0b" },
          { label: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, color: "#10b981" },
          { label: "Rejected", value: applications.filter(a => a.status === "rejected").length, color: "#ef4444" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</span>
            </div>
            <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>Loading applications...</div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <h3 style={{ color: "#0f172a", margin: "0 0 8px" }}>No applications yet</h3>
            <p style={{ color: "#94a3b8" }}>
              {role === "CANDIDATE" ? "Start applying to jobs to see them here" : "No applications have been submitted yet"}
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {["Job Title", "Candidate", "Email", "Resume", "Status"].map(h => (
                  <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => {
                const statusKey = (app.status || "pending").toLowerCase();
                const sc = statusColors[statusKey] || statusColors["pending"];
                return (
                  <tr key={app.id} style={{ borderBottom: i < applications.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fafafa"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{app.job?.title || "N/A"}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{app.job?.company || ""}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#f0f0ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#6366f1", fontSize: "14px" }}>
                          {(app.user?.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>{app.user?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#64748b" }}>{app.user?.email || "N/A"}</td>
                    <td style={{ padding: "16px 20px" }}>
                      {app.resume ? (
                        <a href={app.resume} style={{ color: "#6366f1", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>View Resume</a>
                      ) : <span style={{ color: "#94a3b8", fontSize: "13px" }}>Not uploaded</span>}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ background: sc.bg, color: sc.text, borderRadius: "8px", padding: "5px 12px", fontSize: "12px", fontWeight: "700", textTransform: "capitalize" }}>
                        {statusKey}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
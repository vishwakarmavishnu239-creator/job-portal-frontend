// export default function Dashboard(){

//   return(

//     <div>

//       <h2>Welcome to Job Portal</h2>

//       <div className="row">

//   <div className="col-md-4">
//     <div className="card shadow p-4">
//       <h5>Total Jobs</h5>
//       <h2>15</h2>
//     </div>
//   </div>

//   <div className="col-md-4">
//     <div className="card shadow p-4">
//       <h5>Applications</h5>
//       <h2>32</h2>
//     </div>
//   </div>

//   <div className="col-md-4">
//     <div className="card shadow p-4">
//       <h5>Users</h5>
//       <h2>10</h2>
//     </div>
//   </div>

// </div>

//     </div>

//   )
// }
const StatCard = ({ icon, label, value, change, color }: any) => (
  <div style={{
    background: "#fff", borderRadius: "16px", padding: "24px",
    border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    transition: "transform 0.2s, box-shadow 0.2s",
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
        <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#0f172a" }}>{value}</h3>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#10b981", fontWeight: "600" }}>{change}</p>
      </div>
      <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{icon}</div>
    </div>
  </div>
);

const recentActivity = [
  { action: "New candidate registered", user: "Priya Sharma", time: "2 min ago", type: "user" },
  { action: "Job posted: Senior Dev", user: "TechCorp Ltd", time: "15 min ago", type: "job" },
  { action: "Application submitted", user: "Rahul Kumar", time: "1 hr ago", type: "apply" },
  { action: "Recruiter approved", user: "HireNow Inc", time: "3 hr ago", type: "approve" },
  { action: "Job filled: UI Designer", user: "DesignStudio", time: "5 hr ago", type: "done" },
];

const typeColors: Record<string, string> = { user: "#6366f1", job: "#f59e0b", apply: "#10b981", approve: "#3b82f6", done: "#8b5cf6" };
const typeIcons: Record<string, string> = { user: "👤", job: "💼", apply: "📋", approve: "✅", done: "🎉" };

export default function Dashboard() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderRadius: "20px", padding: "32px 36px", marginBottom: "32px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(99,102,241,0.15)" }} />
        <div style={{ position: "absolute", bottom: "-30px", right: "120px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(245,158,11,0.12)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>⚡ ADMIN CONTROL CENTER</div>
          <h2 style={{ color: "#fff", margin: "0 0 10px", fontSize: "26px", fontWeight: "800" }}>Good morning, Admin! 👋</h2>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>Here's what's happening on your job portal today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <StatCard icon="💼" label="Total Jobs" value="124" change="↑ 12 this week" color="#6366f1" />
        <StatCard icon="📋" label="Applications" value="538" change="↑ 47 today" color="#10b981" />
        <StatCard icon="👥" label="Total Users" value="1,284" change="↑ 23 this week" color="#f59e0b" />
        <StatCard icon="🏢" label="Companies" value="86" change="↑ 5 new" color="#3b82f6" />
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Recent Activity */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Recent Activity</h3>
          {recentActivity.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${typeColors[item.type]}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", minWidth: "38px" }}>{typeIcons[item.type]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>{item.action}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{item.user}</div>
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap" }}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Quick Actions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "👥", label: "Manage Users", color: "#6366f1", path: "/admin/users" },
              { icon: "💼", label: "View All Jobs", color: "#10b981", path: "/jobs" },
              { icon: "📋", label: "Applications", color: "#f59e0b", path: "/applications" },
              { icon: "📊", label: "Analytics", color: "#3b82f6", path: "/admin/analytics" },
            ].map(action => (
              <link key={action.label} href={action.path} style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "20px 10px", borderRadius: "14px", background: `${action.color}10`,
                border: `1px solid ${action.color}25`, textDecoration: "none", transition: "all 0.2s", gap: "8px",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${action.color}20`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${action.color}10`}
              >
                <span style={{ fontSize: "26px" }}>{action.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: action.color }}>{action.label}</span>
              </link>
            ))}
          </div>

          {/* System Status */}
          <div style={{ marginTop: "20px", padding: "16px", background: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#064e3b" }}>All Systems Operational</span>
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "#065f46" }}>API · Database · Email service running normally</p>
          </div>
        </div>
      </div>
    </div>
  );
}
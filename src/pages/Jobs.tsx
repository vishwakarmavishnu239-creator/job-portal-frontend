// import { useEffect, useState } from "react";
// import API from "../services/api";

// export function Jobs() {

//   const [jobs, setJobs] = useState<any[]>([]);

//   useEffect(() => {

//     API.get("/jobs")
//       .then(res => setJobs(res.data))
//       .catch(err => console.log(err));

//   }, []);

//   const applyJob = async (jobId:number) => {

//     try{

//       await API.post("/applications",{
//         jobId: jobId,
//         resume: "My Resume"
//       });

//       alert("Applied Successfully");

//     }catch(err){
//       alert("Application Failed");
//     }

//   };

//   return(

//     <div className="container mt-4">

//       <h2 className="text-center mb-4">Available Jobs</h2>

//       <div className="row g-4">

//         {jobs.map(job => (

//           <div className="col-md-4" key={job.id}>

//             <div className="card p-4 shadow-sm job-card">

//               <h5>{job.title}</h5>

//               <p className="text-muted">
//                 🏢 {job.company}
//               </p>

//               <p>
//                 📍 {job.location}
//               </p>

//               <button
//                 className="btn btn-primary w-100"
//                 onClick={()=>applyJob(job.id)}
//               >
//                 Apply Now
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// }
import { useEffect, useState } from "react";
import API from "../services/api";

export function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const applyJob = async (jobId: number) => {
    try {
      await API.post("/applications", { jobId, resume: "My Resume" });
      alert("✅ Applied Successfully!");
    } catch {
      alert("❌ Application Failed");
    }
  };

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  );

  const jobColors = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
        borderRadius: "20px", padding: "32px 36px", marginBottom: "28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(99,102,241,0.12)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ color: "#fff", margin: "0 0 8px", fontSize: "26px", fontWeight: "800" }}>Browse Opportunities 🔍</h2>
          <p style={{ color: "#94a3b8", margin: "0 0 20px", fontSize: "15px" }}>Explore {jobs.length || "..."} job openings from top companies</p>
          <input
            placeholder="Search by title, company, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", maxWidth: "480px", padding: "14px 20px", borderRadius: "12px",
              border: "none", fontSize: "15px", outline: "none",
              background: "rgba(255,255,255,0.1)", color: "#fff",
              backdropFilter: "blur(10px)", boxSizing: "border-box",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8", fontSize: "16px" }}>Loading jobs...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h3 style={{ color: "#0f172a", margin: "0 0 8px" }}>No jobs found</h3>
          <p style={{ color: "#94a3b8" }}>Try a different search term</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map((job, i) => {
            const color = jobColors[i % jobColors.length];
            return (
              <div key={job.id} style={{
                background: "#fff", borderRadius: "18px", padding: "24px",
                border: "1px solid #e2e8f0", transition: "all 0.25s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${color}25`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                }}
              >
                {/* Top accent bar */}
                <div style={{ height: "4px", borderRadius: "2px", background: `linear-gradient(90deg, ${color}, ${color}66)`, marginBottom: "20px" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                    {["💻", "🎨", "📊", "🔧", "🚀", "🏗️"][i % 6]}
                  </div>
                  <span style={{ background: "#f0fdf4", color: "#059669", borderRadius: "8px", padding: "4px 10px", fontSize: "12px", fontWeight: "700" }}>Open</span>
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: "800", color: "#0f172a" }}>{job.title}</h3>
                <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#374151", fontWeight: "600" }}>🏢 {job.company}</p>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#64748b" }}>📍 {job.location}</p>

                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <span style={{ background: `${color}12`, color: color, borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontWeight: "600" }}>Full-time</span>
                  <span style={{ background: "#f8fafc", color: "#64748b", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontWeight: "600", border: "1px solid #e2e8f0" }}>On-site</span>
                </div>

                <button
                  onClick={() => applyJob(job.id)}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "12px",
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    border: "none", color: "white", fontSize: "14px",
                    fontWeight: "700", cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: `0 4px 14px ${color}40`,
                  }}
                >Apply Now →</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
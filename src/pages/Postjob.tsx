// import { useState } from "react";
// import API from "../services/api";

// export default function PostJob() {

//   const [title,setTitle] = useState("");
//   const [company,setCompany] = useState("");
//   const [location,setLocation] = useState("");

//   const submit = async (e:any) => {

//     e.preventDefault();

//     await API.post("/jobs",{
//       title,
//       company,
//       location
//     });

//     alert("Job posted");

//   };

//   return (

//     <div className="container mt-4">

//       <h2>Post Job</h2>

//       <form onSubmit={submit}>

//         <input
//         className="form-control mt-2"
//         placeholder="Job Title"
//         onChange={(e)=>setTitle(e.target.value)}
//         />

//         <input
//         className="form-control mt-2"
//         placeholder="Company"
//         onChange={(e)=>setCompany(e.target.value)}
//         />

//         <input
//         className="form-control mt-2"
//         placeholder="Location"
//         onChange={(e)=>setLocation(e.target.value)}
//         />

//         <button className="btn btn-success mt-3">
//           Post Job
//         </button>

//       </form>

//     </div>
//   );
// }
import { useState } from "react";
import API from "../services/api";

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Manager"];

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("Full-time");
  const [experience, setExperience] = useState("Mid Level");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!title || !company || !location) {
      alert("Please fill required fields"); return;
    }
    setLoading(true);
    try {
      await API.post("/jobs", { title, company, location, salary, type, experience, description });
      setSuccess(true);
      setTitle(""); setCompany(""); setLocation(""); setSalary(""); setDescription("");
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Failed to post job");
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: "10px",
    border: "1.5px solid #e2e8f0", fontSize: "15px", outline: "none",
    background: "#f8fafc", boxSizing: "border-box" as const,
    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: "760px" }}>
      <div style={{
        background: "linear-gradient(135deg, #064e3b, #065f46)",
        borderRadius: "20px", padding: "28px 32px", marginBottom: "28px",
      }}>
        <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "24px", fontWeight: "800" }}>Post a New Job ✨</h2>
        <p style={{ color: "#a7f3d0", margin: 0, fontSize: "14px" }}>Fill in the details below to attract the best candidates</p>
      </div>

      {success && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "22px" }}>✅</span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#166534" }}>Job Posted Successfully!</div>
            <div style={{ fontSize: "13px", color: "#16a34a" }}>Your job listing is now live and visible to candidates.</div>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        {/* Section: Basic Info */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#0f172a", paddingBottom: "12px", borderBottom: "2px solid #f1f5f9" }}>📋 Basic Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Job Title *</label>
              <input placeholder="e.g. Senior React Developer" value={title} onChange={e => setTitle(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.border = "1.5px solid #10b981"; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Company *</label>
              <input placeholder="e.g. TechCorp Ltd" value={company} onChange={e => setCompany(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.border = "1.5px solid #10b981"; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Location *</label>
              <input placeholder="e.g. Hyderabad / Remote" value={location} onChange={e => setLocation(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.border = "1.5px solid #10b981"; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Salary Range</label>
              <input placeholder="e.g. ₹8-12 LPA" value={salary} onChange={e => setSalary(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.border = "1.5px solid #10b981"; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>
          </div>
        </div>

        {/* Section: Job Type */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#0f172a", paddingBottom: "12px", borderBottom: "2px solid #f1f5f9" }}>⚙️ Job Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Job Type</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {jobTypes.map(t => (
                  <button key={t} onClick={() => setType(t)} style={{
                    padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600",
                    border: type === t ? "2px solid #10b981" : "2px solid #e2e8f0",
                    background: type === t ? "#f0fdf4" : "#f8fafc",
                    color: type === t ? "#059669" : "#374151",
                    transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>Experience Level</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {experienceLevels.map(e => (
                  <button key={e} onClick={() => setExperience(e)} style={{
                    padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600",
                    border: experience === e ? "2px solid #6366f1" : "2px solid #e2e8f0",
                    background: experience === e ? "#f0f0ff" : "#f8fafc",
                    color: experience === e ? "#4f46e5" : "#374151",
                    transition: "all 0.15s",
                  }}>{e}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: "700", color: "#0f172a", paddingBottom: "12px", borderBottom: "2px solid #f1f5f9" }}>📝 Job Description</h3>
          <textarea
            placeholder="Describe the role, responsibilities, requirements, and benefits..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            style={{
              ...inputStyle, resize: "vertical" as const, minHeight: "120px",
            }}
            onFocus={e => { e.target.style.border = "1.5px solid #10b981"; e.target.style.background = "#fff"; }}
            onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            padding: "14px 40px", borderRadius: "12px",
            background: loading ? "#94a3b8" : "linear-gradient(135deg, #10b981, #059669)",
            border: "none", color: "white", fontSize: "16px", fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
            boxShadow: loading ? "none" : "0 4px 18px rgba(16,185,129,0.4)",
          }}
        >
          {loading ? "Posting..." : "🚀 Post Job Now"}
        </button>
      </div>
    </div>
  );
}
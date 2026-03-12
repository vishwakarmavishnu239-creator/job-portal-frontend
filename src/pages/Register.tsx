// import { useState } from "react";
// import API from "../services/api";

// export function Register() {

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [role,setRole] = useState("CANDIDATE");

//   const handleSubmit = async () => {

//     try{

//       await API.post("/users/register",{
//         name,
//         email,
//         password,
//         role
//       });

//       alert("User registered");

//     }catch(err:any){

//       alert(err.response?.data?.message || "Error");

//     }

//   };

//   return(

//     <div>

//       <input placeholder="Name"
//       onChange={(e)=>setName(e.target.value)}/>

//       <input placeholder="Email"
//       onChange={(e)=>setEmail(e.target.value)}/>

//       <input type="password" placeholder="Password"
//       onChange={(e)=>setPassword(e.target.value)}/>

//       {/* Role dropdown */}

//       <select onChange={(e)=>setRole(e.target.value)}>

//         <option value="CANDIDATE">Candidate</option>
//         <option value="RECRUITER">Recruiter</option>
//         <option value="ADMIN">Admin</option>

//       </select>

//       <button onClick={handleSubmit}>Register</button>

//     </div>

//   );

// }
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    try {
      await API.post("/users/register", { name, email, password, role });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally { setLoading(false); }
  };

  const roleOptions = [
    { value: "CANDIDATE", label: "Candidate", icon: "👤", desc: "Looking for jobs" },
    { value: "RECRUITER", label: "Recruiter", icon: "🏢", desc: "Hiring talent" },
    { value: "ADMIN", label: "Admin", icon: "⚡", desc: "Portal manager" },
  ];

  const roleColors: Record<string, string> = { CANDIDATE: "#6366f1", RECRUITER: "#10b981", ADMIN: "#f59e0b" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f8fafc", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "#1e1b4b", borderRadius: "14px", padding: "10px 20px", marginBottom: "24px",
          }}>
            <span style={{ fontSize: "20px" }}>💼</span>
            <span style={{ color: "#a5b4fc", fontWeight: "700", fontSize: "17px" }}>JobPortal</span>
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>Create your account</h2>
          <p style={{ margin: 0, color: "#64748b" }}>Join thousands of professionals today</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 4px 40px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Role Selector */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "10px" }}>I am a...</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {roleOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => setRole(opt.value)}
                  style={{
                    padding: "14px 10px", borderRadius: "12px", textAlign: "center", cursor: "pointer",
                    border: role === opt.value ? `2px solid ${roleColors[opt.value]}` : "2px solid #e2e8f0",
                    background: role === opt.value ? `${roleColors[opt.value]}10` : "#f8fafc",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>{opt.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: role === opt.value ? roleColors[opt.value] : "#374151" }}>{opt.label}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {[
            { label: "Full Name", placeholder: "John Doe", value: name, setter: setName, type: "text" },
            { label: "Email Address", placeholder: "you@example.com", value: email, setter: setEmail, type: "email" },
            { label: "Password", placeholder: "Create a strong password", value: password, setter: setPassword, type: "password" },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "7px" }}>{field.label}</label>
              <input
                placeholder={field.placeholder}
                type={field.type}
                value={field.value}
                onChange={e => field.setter(e.target.value)}
                style={{
                  width: "100%", padding: "13px 16px", borderRadius: "10px",
                  border: "1.5px solid #e2e8f0", fontSize: "15px", outline: "none",
                  background: "#f8fafc", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onFocus={e => { e.target.style.border = `1.5px solid ${roleColors[role]}`; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: "12px", marginTop: "8px",
              background: loading ? "#94a3b8" : `linear-gradient(135deg, ${roleColors[role]}, ${roleColors[role]}cc)`,
              border: "none", color: "white", fontSize: "16px", fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: loading ? "none" : `0 4px 20px ${roleColors[role]}44`,
            }}
          >
            {loading ? "Creating account..." : `Create ${role.charAt(0) + role.slice(1).toLowerCase()} Account →`}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px", color: "#64748b", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6366f1", fontWeight: "700", textDecoration: "none" }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
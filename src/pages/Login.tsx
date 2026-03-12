// import { useState } from 'react';
// import API from '../services/api';
// import "../styles/login.css";
// import { useNavigate } from "react-router-dom";

// export function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();   // ✅ must be here

//   const handleSubmit = async () => {

//     try {

//       const res = await API.post('/auth/login', {
//         email,
//         password
//       });

//       localStorage.setItem('token', res.data.access_token);
//       localStorage.setItem('role', res.data.role);

//       const role = res.data.role;

//       alert("Login Successful");

//       if(role === "ADMIN"){
//         navigate("/dashboard");
//       }

//       else if(role === "RECRUITER"){
//         navigate("/post-job");
//       }

//       else{
//         navigate("/jobs");
//       }

//     } catch (err:any) {

//       alert(err.response?.data?.message || "Login Failed");

//     }

//   };

//   return (

//     <div className="login-page">

//       <div className="login-card">

//         <h2>Job Portal</h2>
//         <p>Welcome back 👋</p>

//         <input
//           placeholder="Email"
//           className="form-control"
//           onChange={e => setEmail(e.target.value)}
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           className="form-control"
//           onChange={e => setPassword(e.target.value)}
//         />

//         <button
//           className="btn btn-primary w-100 mt-3"
//           onClick={handleSubmit}
//         >
//           Login
//         </button>

//       </div>

//     </div>

//   );
// }

import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name || email.split('@')[0]);

      const role = res.data.role;
      if (role === "ADMIN") navigate("/dashboard");
      else if (role === "RECRUITER") navigate("/recruiter/dashboard");
      else navigate("/candidate/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", background: "#0d1117",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: "linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%)",
        padding: "60px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "440px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "14px", padding: "10px 20px", marginBottom: "40px",
          }}>
            <span style={{ fontSize: "24px" }}>💼</span>
            <span style={{ color: "#a5b4fc", fontWeight: "700", fontSize: "18px" }}>JobPortal</span>
          </div>

          <h1 style={{ color: "#f1f5f9", fontSize: "42px", fontWeight: "800", lineHeight: 1.15, margin: "0 0 20px" }}>
            Find Your <span style={{ color: "#6366f1" }}>Dream</span> Career Today
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.7, margin: "0 0 48px" }}>
            Connect with top companies, explore thousands of opportunities, and take the next step in your professional journey.
          </p>

          {[
            { icon: "🚀", title: "10,000+ Active Jobs", desc: "Updated daily from top companies" },
            { icon: "🏢", title: "500+ Top Companies", desc: "From startups to Fortune 500" },
            { icon: "✅", title: "Quick Apply", desc: "One-click applications" },
          ].map((item) => (
            <div key={item.title} style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "flex-start" }}>
              <div style={{
                width: "44px", height: "44px", minWidth: "44px", borderRadius: "12px",
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
              }}>{item.icon}</div>
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: "700", fontSize: "15px" }}>{item.title}</div>
                <div style={{ color: "#64748b", fontSize: "13px" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={{
        width: "480px", minWidth: "480px", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#ffffff", padding: "48px 56px",
      }}>
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>Welcome back 👋</h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "15px" }}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px",
              padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>⚠️ {error}</div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Email Address</label>
            <input
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%", padding: "13px 16px", borderRadius: "10px",
                border: "1.5px solid #e2e8f0", fontSize: "15px", outline: "none",
                background: "#f8fafc", boxSizing: "border-box", transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%", padding: "13px 16px", borderRadius: "10px",
                border: "1.5px solid #e2e8f0", fontSize: "15px", outline: "none",
                background: "#f8fafc", boxSizing: "border-box", transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.border = "1.5px solid #e2e8f0"; e.target.style.background = "#f8fafc"; }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px", borderRadius: "12px",
              background: loading ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "none", color: "white", fontSize: "16px",
              fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div style={{ textAlign: "center", marginTop: "24px", color: "#64748b", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6366f1", fontWeight: "700", textDecoration: "none" }}>Create one free</Link>
          </div>

          {/* Role hints */}
          <div style={{
            marginTop: "32px", padding: "16px", borderRadius: "12px",
            background: "#f8fafc", border: "1px solid #e2e8f0",
          }}>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Role-based access</div>
            {[
              { role: "CANDIDATE", color: "#6366f1", desc: "Browse & apply to jobs" },
              { role: "RECRUITER", color: "#10b981", desc: "Post jobs & manage talent" },
              { role: "ADMIN", color: "#f59e0b", desc: "Full portal management" },
            ].map(r => (
              <div key={r.role} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: r.color }} />
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: "600" }}>{r.role}</span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>— {r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
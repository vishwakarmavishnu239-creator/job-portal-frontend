import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const goHome = () => {
    if (role === "ADMIN") navigate("/dashboard");
    else if (role === "RECRUITER") navigate("/recruiter/dashboard");
    else navigate("/candidate/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f8fafc", fontFamily: "'DM Sans', sans-serif", flexDirection: "column", gap: "20px",
    }}>
      <div style={{ fontSize: "80px" }}>🚫</div>
      <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>Access Denied</h2>
      <p style={{ margin: 0, color: "#64748b", fontSize: "16px" }}>You don't have permission to view this page.</p>
      <button onClick={goHome} style={{
        padding: "12px 28px", borderRadius: "12px",
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        border: "none", color: "white", fontSize: "15px", fontWeight: "700", cursor: "pointer",
      }}>Go to My Dashboard</button>
    </div>
  );
}
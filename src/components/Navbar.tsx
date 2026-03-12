import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <nav className="navbar navbar-dark bg-dark px-4">

      <span className="navbar-brand">Job Portal</span>

      <div>

        <Link className="btn btn-light mx-2" to="/jobs">Jobs</Link>

        <Link className="btn btn-light mx-2" to="/post-job">
          Post Job
        </Link>

        <Link className="btn btn-light mx-2" to="/applications">
          Applications
        </Link>

        <button className="btn btn-danger mx-2" onClick={logout}>
          Login!
        </button>

      </div>

    </nav>

  );
}
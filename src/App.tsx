// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from "./components/Navbar";
// import { Register } from './pages/Register';
// import { Login } from './pages/Login';
// import { Jobs } from './pages/Jobs';
// import  PostJob  from "./pages/Postjob";
// import  Applications  from './pages/Applications';
// import Layout from "./components/Layoutbar";
// import Dashboard from './components/Dashboard';

// export function App() {
//   return (
//     <BrowserRouter>
//     <Navbar />
//       <Routes>
//         <Route
//  path="/dashboard"
//  element={
//   <Layout>
//     <Dashboard/>
//   </Layout>
//  }
// />
//          <Route path="/" element={<Register />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//  path="/jobs"
//  element={
//   <Layout>
//     <Jobs/>
//   </Layout>
//  }
// />
//         <Route
//  path="/post-job"
//  element={
//   <Layout>
//     <PostJob/>
//   </Layout>
//  }
// />
//         <Route
//  path="/applications"
//  element={
//   <Layout>
//     <Applications/>
//   </Layout>
//  }
// />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Jobs } from './pages/Jobs';
import PostJob from "./pages/Postjob";
import Applications from './pages/Applications';
import Layout from "./components/Layoutbar";
import Dashboard from './components/Dashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ADMIN Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout><div style={{ padding: "20px", fontFamily: "'DM Sans',sans-serif" }}><h2>👥 Manage Users — Coming Soon</h2></div></Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout><div style={{ padding: "20px", fontFamily: "'DM Sans',sans-serif" }}><h2>📊 Analytics — Coming Soon</h2></div></Layout>
          </ProtectedRoute>
        } />

        {/* RECRUITER Routes */}
        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <Layout><RecruiterDashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/recruiter/jobs" element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <Layout><div style={{ padding: "20px", fontFamily: "'DM Sans',sans-serif" }}><h2>💼 My Job Listings — Coming Soon</h2></div></Layout>
          </ProtectedRoute>
        } />
        <Route path="/post-job" element={
          <ProtectedRoute allowedRoles={["RECRUITER", "ADMIN"]}>
            <Layout><PostJob /></Layout>
          </ProtectedRoute>
        } />

        {/* CANDIDATE Routes */}
        <Route path="/candidate/dashboard" element={
          <ProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Layout><CandidateDashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/candidate/applications" element={
          <ProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Layout><Applications /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/candidate/profile" element={
          <ProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Layout><div style={{ padding: "20px", fontFamily: "'DM Sans',sans-serif" }}><h2>👤 My Profile — Coming Soon</h2></div></Layout>
          </ProtectedRoute>
        } />

        {/* Shared Routes (admin + recruiter can view) */}
        <Route path="/jobs" element={
          <ProtectedRoute allowedRoles={["CANDIDATE", "RECRUITER", "ADMIN"]}>
            <Layout><Jobs /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/applications" element={
          <ProtectedRoute allowedRoles={["RECRUITER", "ADMIN"]}>
            <Layout><Applications /></Layout>
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

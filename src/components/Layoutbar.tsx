// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import "../styles/dashboard.css"

// export default function Layout({ children }: any) {

//   return (

//     <div style={{
//       display: "flex",
//       width: "100%",
//       minHeight: "100vh"
//     }}>

//       <Sidebar />

//       <div style={{
//         flex: 1,
//         width: "100%",
//         background: "#f1f5f9"
//       }}>

//         <Topbar />

//         <div style={{
//           padding: "30px",
//           width: "100%"
//         }}>
//           {children}
//         </div>

//       </div>

//     </div>

//   );
// }
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
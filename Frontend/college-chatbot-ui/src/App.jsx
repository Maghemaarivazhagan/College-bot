import "./App.css";
import Bot from "./Bot";
import Contact from "./Contact";
import Course from "./Course";
import Trust from "./Trust";
import Management from "./Management";
import Navbar from "./Navbar";



function App() {
  return (
    <>
    <div className="top-bar">
  <div className="top-bar-content">
    <span className="institution">Vivekanandha Educational Institution</span>
    <span className="email">contact@vivekanandha.edu</span>
  </div>
</div>

{/* Sidebar + Banner row */}
<div className="sidebar-banner-row">
  <Navbar />
  <div className="college-image-container">
    <img className="College-Image" src="college campus.jpeg" alt="College Campus" />
  </div>
</div>

{/* Sections below */}
<div className="sections">
  <Trust />
  <Management />
  <Course />
  <Bot/>
  <Contact />
</div>

   </>
  );
}

export default App;

import React from "react";
import CollegeLogo from "/college logo.jpeg"; // replace with your logo path

export default function Navbar() {
  return (
    <div className="square-navbar">
    
      <div className="logo-container">
        <img src={CollegeLogo} alt="College Logo" />
      </div>

      <ul>
        <li><a href="#trust">Trust</a></li>
        <li><a href="#management">Management</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
}

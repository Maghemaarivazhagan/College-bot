import React, { useState } from "react";
import "./Course.css";

const courseData = [
  {
    category: "Medical",
    subCategories: [
      {
        name: "UG (MBBS)",
        courses: [
          "Anatomy",
          "Physiology",
          "Biochemistry",
          "Microbiology",
          "Pharmacology",
          "Pathology",
          "Forensic Medicine",
          "Community Medicine",
        ],
      },
      {
        name: "PG (MD/MS)",
        courses: [
          "Anatomy",
          "Biochemistry",
          "Microbiology",
          "Pathology",
          "Community Medicine",
          "General Medicine",
          "D.V.L (Dermatology)",
          "Anesthesiology",
          "Radio Diagnosis",
          "General Surgery",
          "Orthopedics",
          "OT Rhinolaryngology (ENT)",
        ],
      },
    ],
  },
  {
    category: "Dental",
    subCategories: [
      {
        name: "UG Courses",
        courses: ["B.D.S 4+1 Years (Bachelor of Dental Surgery)"],
      },
      {
        name: "PG Courses",
        courses: [
          "M.D.S - Prosthodontics and Crown & Bridge",
          "Periodontology",
          "Conservative Dentistry & Endodontics",
          "Orthodontics & Dentofacial Orthopaedics",
          "Oral Pathology & Microbiology",
          "Public Health Dentistry",
          "Paediatrics & Preventive Dentistry",
          "Oral Medicine & Radiology",
          "Oral & Maxillofacial Surgery",
        ],
      },
    ],
  },
  {
    category: "Pharmacy",
    subCategories: [
      {
        name: "Diploma",
        courses: ["D.Pharm (2 Years)"],
      },
      {
        name: "UG Courses",
        courses: ["B.Pharm (4 Years)", "B.Pharm Lateral Entry (3 Years)", "Integrated PG (6 Years)", "Pharm D"],
      },
      {
        name: "PG Courses",
        courses: [
          "M.Pharm - Pharmaceutics",
          "M.Pharm – Pharmacology",
          "M.Pharm – Pharmacognosy",
          "M.Pharm – Pharmaceutical Chemistry",
          "M.Pharm - Pharmaceutical Analysis",
          "M.Pharm - Pharmacy Practice",
        ],
      },
      {
        name: "Research Program",
        courses: ["Ph.D Full Time / Part Time (Co-Ed)"],
      },
    ],
  },
  {
    category: "Engineering",
    subCategories: [
      {
        name: "UG Courses (4 Years)",
        courses: [
          "B.E. Computer Science & Engg",
          "B.E. CSE-AI & ML*",
          "B.E. Electronics & Communication Engg",
          "B.E. Electrical & Electronics Engg",
          "B.E. Bio-Medical Engg",
          "B.E. Civil Engineering",
          "B.Tech. Information Technology",
          "B.Tech. Biotechnology",
          "B.Tech. Agricultural Engineering",
          "B.Tech. Artificial Intelligence & Data Science",
        ],
      },
      {
        name: "Integrated Course (5 Years)",
        courses: ["M.Tech. Computer Science & Engg*"],
      },
      {
        name: "PG Courses (2 Years)",
        courses: [
          "M.E. Computer Science & Engg",
          "M.E. VLSI Design",
          "M.E. Power Systems",
          "M.Tech. Biotechnology",
        ],
      },
      {
        name: "Lateral Entry",
        courses: ["B.E. Computer Science & Engg", "B.E. Electronics & Communication Engg"],
      },
      {
        name: "Research Program",
        courses: [
          "Computer Science & Engg",
          "Electronics & Communication Engg",
          "Electrical & Electronics Engg",
          "Bio-Medical Engg",
          "Civil Engineering",
          "Information Technology",
          "Biotechnology",
          "Agricultural Engineering",
          "Artificial Intelligence & Data Science",
          "Mechanical Engineering",
        ],
      },
    ],
  },
  {
    category: "Arts & Science",
    subCategories: [
      {
        name: "UG Courses",
        courses: [
          "B.Sc. Computer Science",
          "B.C.A",
          "B.Sc. Information Technology",
          "B.Sc. Data Science",
          "B.Sc. CS (Cyber Security)",
          "B.Sc. CS (AI & Machine Learning)",
          "B.Sc. CS (AI & DS)*",
          "B.Sc. Software Engineering*",
          "B.Sc. Microbiology",
          "B.Sc. Bio-Chemistry",
          "B.Sc. Biotechnology",
          "B.Sc. Botany",
          "B.Sc. Zoology",
          "B.Sc. Nutrition & Dietetics",
          "B.Sc. Mathematics",
          "B.Sc. Physics",
          "B.Sc. Chemistry",
          "B.Sc. Textile & Fashion Design",
          "B.Sc. Costume Design & Fashion",
          "B.Sc. Psychology",
          "B.B.A",
          "B.Com",
          "B.Com. (C.A)",
          "B.Com. (Banking & Insurance)",
          "B.Com. (Accounting & Finance)",
          "B.Com. (Professional Accounting)",
          "B.A. English",
          "B.A. Political Science",
          "B.A. Tamil",
          "B.A. History",
          "B.A. Economics",
        ],
      },
    ],
  },
];

function Courses() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenSubCategory(null); 
  };

  const toggleSubCategory = (sub) => {
    setOpenSubCategory(openSubCategory === sub ? null : sub);
  };

  return (
    <section id="courses" className="courses-section">
      <h2>Courses Offered</h2>
      <div className="courses-wrapper">
        {courseData.map((cat, idx) => (
          <div key={idx} className="course-category">
            <button
              className={`category-btn ${openCategory === cat.category ? "active" : ""}`}
              onClick={() => toggleCategory(cat.category)}
            >
              {openCategory === cat.category ? "−" : "+"} {cat.category}
            </button>
            {openCategory === cat.category && (
              <div className="subcategory-list">
                {cat.subCategories.map((sub, sidx) => (
                  <div key={sidx} className="subcategory">
                    <button
                      className={`subcategory-btn ${
                        openSubCategory === sub.name ? "active" : ""
                      }`}
                      onClick={() => toggleSubCategory(sub.name)}
                    >
                      {openSubCategory === sub.name ? "−" : "+"} {sub.name}
                    </button>
                    {openSubCategory === sub.name && (
                      <ul className="courses-list">
                        {sub.courses.map((course, cidx) => (
                          <li key={cidx}>{course}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;

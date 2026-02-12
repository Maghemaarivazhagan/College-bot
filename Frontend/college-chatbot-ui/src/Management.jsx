import React from "react";
import "./Management.css";
import  { useEffect, useRef } from "react";

function Management() {
     const cardsRef = useRef([]);
   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  const managementTeam = [
    {
      name: "Prof. Dr. M. Karunanithi",
      title: "Chairman & Secretary",
      description: `Prof. Dr. M. Karunanithi is the Chairman and Secretary of Vivekanandha Educational Institutions & Vivekanandha Medical Care Hospital. 
      His untiring work as a philanthropist has been honored with Vidhya Rattan, Rashtriya Rattan, Hind Rattan, and Kongunattu Sathanaiyalar awards. 
      He is a versatile pioneer in women's empowerment, guiding thousands of students and serving as a role model for young minds.`,
      img: "public/chairman.png"
    },
    {
      name: "Mrs. Krishnaveni Karunanithi",
      title: "Managing Director",
      description: `Mrs. Krishnaveni Karunanithi, Managing Director, Vivekanandha Educational Institutions & Vivekanandha Medical Care Hospital, 
      is an embodiment of virtues, motivating women to excel both professionally and domestically. She supports the Chairman in all his endeavors and 
      plays a pivotal role in guiding young girls to achieve their goals.`,
      img: "public/Krishnaveni.png"
    },
    {
      name: "Dr. K. Krupanidhi Karunanithi",
      title: "Vice Chairman",
      description: `Dr. K. Krupanidhi Karunanithi, Vice Chairman, follows the Chairman's vision for women's progress, 
      ensuring quality education, especially for rural students. He inspires the younger generation to fulfill their ambitions.`,
      img: "public/Krupanidhi.png"
    },
    {
      name: "Dr. S. Arthanareeswaran",
      title: "Joint Managing Director",
      description: `Dr. S. Arthanareeswaran, Joint Managing Director, provides unrelenting support to enhance women's talents and skill sets, 
      empowering them in all spheres.`,
      img: "public/Arthanareeswaran.png"
    },
    {
      name: "Dr. K. Sreeraaghanidhi Arthanareeswaran",
      title: "Joint Secretary",
      description: `Dr. K. Sreeraaghanidhi Arthanareeswaran, Joint Secretary, has laid a strong foundation for continual progress in women's education. 
      She helps women become accomplished personalities, aligning with the institution's motto of 'Women Empowerment'.`,
      img: "public/Sreeraaghanidhi.png"
    },
    {
      name: "Dr. K.B. Nivethana Krupanidhi",
      title: "Director",
      description: `Dr. K.B. Nivethana Krupanidhi, Director, Vivekanandha Educational Institutions & Vivekanandha Medical Care Hospital, 
      encourages innovation and youth empowerment. As a young woman icon, she leads academics with confidence and ensures the institution reaches global excellence.`,
      img: "public/last management.png"
    }
  ];

  return (
     <section id="management" className="management">
      <h2>The Management</h2>

      <div className="management-wrapper">
        {managementTeam.map((member, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="management-member"
          >
            <div className="border-box"></div>

            <img src={member.img} alt={member.name} />

            <div className="member-text">
              <h3>{member.name}</h3>
              <h4>{member.title}</h4>
              <p>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Management;

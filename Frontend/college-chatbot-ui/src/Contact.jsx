import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact glass">
      <h2>Contact Us</h2>

      <form className="contact-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" rows="4" required />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default Contact;

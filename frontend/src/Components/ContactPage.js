import React from 'react';
import './ContactPage.css'; // Import the CSS file

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <div className="details">
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 (234) 567-8901</p>
          <p><strong>Address:</strong> 1234 Example St, City, Country</p>
        </div>
      </div>
      <form className="contact-form">
        <h2>Send a Message</h2>
        <label>
          Name:
          <input type="text" required placeholder="Your name" />
        </label>
        <label>
          Email:
          <input type="email" required placeholder="Your email" />
        </label>
        <label>
          Message:
          <textarea required rows="4" placeholder="Your message here..."></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;

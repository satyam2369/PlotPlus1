import React from 'react';
import './Footer.css'; // Assuming you will use a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Plotplus</h3>
          <p>
            Plotplus is your creative hub for seamless project creation. Explore tools, 
            resources, and inspiration to bring your ideas to life.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">Our Story</a></li>
            <li><a href="/services">Read</a></li>
            <li><a href="/contact">Write</a></li>
            <li><a href="/faq">Upload</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Subscribe</h3>
          <form>
            <input type="email" placeholder="Your Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Plotplus. All rights reserved.</p>
        <div className="socials">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

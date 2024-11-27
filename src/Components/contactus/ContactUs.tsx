import React, { FC } from 'react';
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactUs: FC = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Header Section */}
      <div className="header-section d-flex align-items-center justify-content-center">
        <h1 className="header-title">Contact Us</h1>
      </div>

      <div
        className="container-fluid custom-container d-flex flex-column justify-content-center align-items-center bg-white"
        style={{
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        {/* Content Section */}
        <div className="row w-100 align-items-center mt-5 mx-0">
          {/* Left Column: Form and Contact Info */}
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h2 className="text-center text-primary mb-4">RC Tennis Academy</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">Full Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">E-mail</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">Subject</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-dark">Message</label>
                <textarea className="form-control" id="message" rows={3}></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100">Contact Us</button>
            </form>
            <div className="contact-info mt-4 text-center text-dark">
              <p><strong>Phone no:</strong> 1-888-888-8888 </p>
              <p><strong>Based in:</strong> San Francisco, California</p>
              <div className="social-icons d-flex justify-content-center">
                <a href="#" className="me-3" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="#" className="me-3" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="#" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center mt-4 mt-lg-0">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509232!2d-122.41941568468138!3d37.77492977975996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d8ca3e1%3A0x333adf1c5b6c1e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1692890274742!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{
                border: '0',
                borderRadius: '8px',
              }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React, { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ContactUs: FC = () => {
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div
        className="w-full h-48 sm:h-64 bg-cover bg-center flex justify-center items-center shadow-lg"
        style={{ backgroundImage: "url('/contactUs.jpg')" }}
      >
        <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">Contact Us</h1>
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center bg-white py-8 px-4">
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Column: Form and Contact Info */}
          <div className="flex flex-col justify-center bg-blue-500 text-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              RC Tennis Academy
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2"> Full Name </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                  required
                />
              </div>
              <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2"> E-mail </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                onInput={(e) => {
                  // Prevent the first character from being a number
                  if (/^\d/.test(e.currentTarget.value)) {
                    e.currentTarget.value = e.currentTarget.value.replace(/^\d/, '');
                  }
                }}
                pattern="^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Email with letters or numbers (not starting with a number)
                title="Email should start with a letter and follow a valid email format (e.g., example123@domain.com)"
                required
              />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block font-bold mb-2"> Subject </label>
                <input type="text" id="subject" name="subject"
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block font-bold mb-2"> Message </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required >
                </textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Submit
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className='text-lg sm:text-xl mb-2'>Email : support@ifaceh.com</p>
              <p className="text-lg sm:text-xl mb-2">Phone no: 1-888-888-8888</p>
              <p className="text-lg sm:text-xl mb-4">Based in: San Francisco, California</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="#" className="text-white hover:text-red-300 transition">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509232!2d-122.41941568468138!3d37.77492977975996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d8ca3e1%3A0x333adf1c5b6c1e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1692890274742!5m2!1sen!2sus"
              className="w-full h-64 sm:h-96"
              style={{ border: 'none' }}
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
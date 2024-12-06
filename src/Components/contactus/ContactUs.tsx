import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { sendEmail } from '../../Services/ContactService';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactUs: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);
      setCaptchaVerified(true);
    } else {
      setCaptchaToken(null);
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified || !captchaToken) {
      alert('Please complete CAPTCHA verification.');
      return;
    }

    setLoading(true);
    setResponseMessage('');

    try {
      await sendEmail({ ...formData, captchaToken });
      setResponseMessage('Form submitted successfully!');
      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken(null);
      setCaptchaVerified(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
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

      {/* Main Section */}
      <div className="container mx-auto flex flex-col justify-center items-center bg-white py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Column */}
          <div className="flex flex-col justify-center bg-blue-500 text-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">RC Tennis Academy</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  pattern="^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Email should start with a letter and follow a valid format (e.g., example123@domain.com)"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block font-bold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <ReCAPTCHA sitekey="6Lf_TIoqAAAAAAXYolwSahryD09PcdLptCEnQaQH" onChange={handleCaptchaChange} />
              </div>
              {/* <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button> */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded-md transition duration-300">
                {loading ? 'Submitting...' : 'Submit'}
              </button>

            </form>

            {/* Contact Info */}
            <div className="mt-6 text-center">
              <p className="text-lg sm:text-xl mb-2">Email: support@ifaceh.com</p>
              <p className="text-lg sm:text-xl mb-2">Phone: 1-888-888-8888</p>
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

          {/* Right Column */}
          <div className="flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509232!2d-122.41941568468138!3d37.77492977975996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d8ca3e1%3A0x333adf1c5b6c1e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1692890274742!5m2!1sen!2sus"
              className="w-full h-full"
              style={{ border: 'none', minHeight: '350px' }}
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
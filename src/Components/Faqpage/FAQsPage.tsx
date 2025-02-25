import React, { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What programs does RC Tennis Academy offer?",
    answer:
      "We offer beginner, intermediate, and advanced tennis training programs for all age groups.",
  },
  {
    question: "Where is RC Tennis Academy located?",
    answer: "Our academy is located at XYZ Sports Complex, Main Street, City.",
  },
  {
    question: "How can I enroll in a program?",
    answer: "You can enroll by visiting our website and filling out the registration form.",
  },
  {
    question: "Do you offer private coaching sessions?",
    answer: "Yes, we offer private coaching sessions tailored to individual needs.",
  },
];

const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-6 transition-all duration-300 transform hover:scale-105">
      <button
        className="w-full text-left flex justify-between items-center text-xl font-semibold text-blue-700 hover:text-blue-900 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {faq.question}
        <span className="text-2xl transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}">▼</span>
      </button>
      {isOpen && <p className="mt-3 text-gray-600 bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 text-lg">{faq.answer}</p>}
    </div>
  );
};

const FAQsPage: React.FC = () => {
  return (
    <div className="max-w-3xl min-h-screen mx-auto p-10 mt-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-blue-800">FAQs</h1>
      <div className="bg-white shadow-2xl rounded-lg p-8 border border-gray-300 transform hover:scale-105 transition-all duration-300">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;

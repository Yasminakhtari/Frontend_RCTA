import React, { useRef } from 'react';

const CoursePage: React.FC = () => {
  const sessionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSessions = () => {
    if (sessionRef.current) {
      sessionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-gray-500 text-sm mb-4">
        <span>Classes</span> <span className="mx-2">&gt;</span> <span>Tennis Foundations (for beginners)</span>
      </nav>

      {/* Course Title Section */}
      <header className="mb-8 mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900">For Intermediate Players: “Rally Ready”</h1>
      </header>

      {/* Description and Sessions Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        <button className="px-4 py-2 text-gray-900 border-b-2 border-blue-500 font-medium focus:outline-none">
          Description
        </button>
        <button
          className="px-4 py-2 text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={scrollToSessions}
        >
          Sessions
        </button>
      </div>

      {/* Course Description */}
      <div className="mb-12">
        <p className="text-gray-700 text-lg leading-relaxed">
        Take your game to the next level by mastering consistent rallies, spins, and court positioning. Perfect for players who want to improve control, strategy, and overall technique during match play.
        </p>
      </div>

      {/* Session Details */}
      <div ref={sessionRef} className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Coach</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Days</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Register</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Mon, Wed, Fri</td>
                <td className="border border-gray-300 px-4 py-2">5pm – 7pm</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Register
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Tues, Thurs</td>
                <td className="border border-gray-300 px-4 py-2">5pm – 8pm</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Register
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Sat, Sun</td>
                <td className="border border-gray-300 px-4 py-2">9am – 12pm</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Register
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

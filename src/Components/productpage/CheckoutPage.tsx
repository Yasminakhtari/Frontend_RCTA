// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage: React.FC = () => {
//     const navigate = useNavigate(); // Initialize navigate


//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center mt-16">
//       <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
//       {/* <button
//           onClick={() => navigate(-1)} // Navigate to the previous page
//           className="mb-4 text-blue-600 hover:underline"
//         >
//           &larr; Back
//         </button> */}
//         <button
//           onClick={() => navigate(-1)} // Go back without clearing the cart
//           className="mb-4 text-blue-600 hover:underline"
//         >
//           &larr; Back
//         </button>

//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

//         {/* Name and Email */}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="John Doe"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="john.doe@example.com"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="mt-4">
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//             Phone
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             placeholder="123-456-7890"
//           />
//         </div>

//         {/* Shipping Address Heading */}
//         <h2 className="text-xl font-semibold text-center mt-6 mb-4">Shipping Address</h2>

//         {/* Shipping Address Fields */}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
//               Address Line 1
//             </label>
//             <input
//               type="text"
//               id="addressLine1"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="123 Main St"
//             />
//           </div>
//           <div>
//             <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
//               Address Line 2
//             </label>
//             <input
//               type="text"
//               id="addressLine2"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Apartment, suite, etc. (optional)"
//             />
//           </div>
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//               City
//             </label>
//             <input
//               type="text"
//               id="city"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="City"
//             />
//           </div>
//           <div>
//             <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//               State
//             </label>
//             <input
//               type="text"
//               id="state"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="State"
//             />
//           </div>
//           <div>
//             <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
//               Zip Code
//             </label>
//             <input
//               type="text"
//               id="zipCode"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Zip Code"
//             />
//           </div>
//         </div>

//         {/* Pay Button */}
//         <div className="mt-6">
//           <button
//             type="button"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center mt-16">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          &larr; Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="123-456-7890"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mt-6 mb-4">Shipping Address</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="123 Main St"
            />
          </div>
          <div>
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="State"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Zip Code"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Cash">Cash</option>
            <option value="Zelle">Zelle</option>
            <option value="Venmo">Venmo</option>
            <option value="Check">Check</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
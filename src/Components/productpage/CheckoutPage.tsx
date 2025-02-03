// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const CheckoutPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isClassOnly = location.state?.isClassOnly || false;

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center mt-16">
//       <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 text-blue-600 hover:underline"
//         >
//           &larr; Back
//         </button>

//         <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

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
//           <div className="mt-4">
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//             Phone
//          </label>
//            <input
//             type="tel"
//             id="phone"
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             placeholder="123-456-7890"
//           />
//         </div>
//         </div>

//         {!isClassOnly && (
//           <>
//             <h2 className="text-xl font-semibold text-center mt-6 mb-4">
//               Shipping Address (For Products)
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="addressLine1"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="123 Main St"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
//                   Address Line 2
//                 </label>
//                 <input
//                   type="text"
//                   id="addressLine2"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Apartment, suite, etc. (optional)"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="City"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="State"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
//                   Zip Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zipCode"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Zip Code"
//                 />
//               </div>
//             </div>
//           </>
//         )}

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

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveOrder } from "../../Services/OrderService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClassOnly = location.state?.isClassOnly || false;
  const orderId = location.state?.orderId || 0;
  const cartData = location.state?.cartData || {}
  console.log(cartData)
  let formattedItems = cartData.items;

  if (typeof formattedItems === "string") {
    // Convert items string to valid JSON format
    formattedItems = formattedItems
      // Wrap object keys with quotes
      .replace(/(\w+)=/g, '"$1":')
      // Wrap string values (like "Products") with quotes
      .replace(/:\s*([A-Za-z0-9&()\-_\s]+)/g, ': "$1"')
      // Remove unnecessary quotes around numbers (e.g., 123 instead of "123")
      .replace(/:\s*([\d.]+)(?=\s*[^,}])/g, ': $1')
      // Handle any remaining quotes around numbers
      .replace(/"(\d+\.\d+)"/g, '$1')
      .replace(/"(\d+)"/g, '$1');

    // Log formattedItems before parsing
    console.log("Formatted Items (before parsing):", formattedItems);

    // Parse the formatted string into an actual array
    try {
      formattedItems = JSON.parse(formattedItems);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      formattedItems = []; // Fallback to empty array if parsing fails
    }
  }


  console.log("Formatted Items:", formattedItems);

  const hasProducts = Array.isArray(formattedItems) && formattedItems.some((item: any) => {
    console.log("Item Groups:", item.groups); // Log the value of groups for each item
    return String(item.groups).trim().toLowerCase() === "products";
  });

  console.log("Has Products:", hasProducts); // Log the result of the condition

  console.log("Has Products:", hasProducts);
  const handleProceedToPayment = async () => {
    try {
      // Ensure items are properly formatted as an array
      let formattedItems = cartData.items;

      if (typeof formattedItems === "string") {
        // Convert items string to valid JSON format
        formattedItems = formattedItems
          .replace(/(\w+)=/g, '"$1":') // Wrap keys with quotes
          .replace(/:\s*([\w\s&()-]+)/g, ': "$1"') // Wrap string values in quotes
          .replace(/"\s*([\d.]+)"/g, "$1"); // Remove quotes around numbers

        // Parse the formatted string into an actual array
        formattedItems = JSON.parse(formattedItems);
      }
      // Prepare JSON payload
      console.log((cartData?.items))
      const payload = {
        orderId, // Include orderId when present
        userId: cartData.userId,
        total: cartData.total,
        paymentMethod: cartData.paymentMethod,
        items: formattedItems, // Ensure it's sent as JSON
      };

      console.log("Sending Payload:", JSON.stringify(payload));

      // Call the saveOrder function with JSON payload
      const savedOrder = await saveOrder(JSON.stringify(payload));
      console.log("Saved Order Response:", savedOrder);

      successNotification("Success", "Payment Successfull");

      // Navigate to checkout page with the updated order ID
      if (savedOrder.data?.paymentStatus === "Success") {
        navigate("/cart", { state: { saveOrder: savedOrder.data?.paymentStatus } });
      }
    } catch (error) {
      console.error("Error saving order:", error);
      errorNotification("Error", "Failed to save the order");
    }
  }
  useEffect(() => {
    console.log("Cart Data:", cartData);
    console.log("Cart Items:", cartData?.items);
    console.log("Has Products:", hasProducts);
  }, [cartData]); // Runs whenever cartData changes
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
        </div>


        {hasProducts && (
          <>
            <h2 className="text-xl font-semibold text-center mt-6 mb-4">
              Shipping Address (For Products)
            </h2>
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
          </>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleProceedToPayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

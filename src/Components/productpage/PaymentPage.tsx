// import React, { useState } from "react";
// import { useCart } from "./CartContext"; 
// import { useNavigate } from "react-router-dom";

// const PaymentPage: React.FC = () => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("contact");
//   const { cart } = useCart(); // Access the cart
//   const navigate = useNavigate();

//   // Check if all products belong to the "Class" category
//   const isClassOnly = cart.every(
//     (product: { category: string }) => product.category === "Class"
//   );

//   const handlePaymentSelection = (method: string) => {
//     setPaymentMethod(method);
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
//       {paymentMethod === "card" ? (
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Card Payment</h3>
//             <p className="text-sm mb-6">
//               You have selected Card Payment. Please proceed with your payment.
//             </p>
//             <button
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//               onClick={() =>
//                 navigate("/checkout", { state: { isClassOnly } })
//               }
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
//             <div className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 id="contact"
//                 name="payment"
//                 className="mr-2"
//                 defaultChecked={paymentMethod === "contact"}
//                 onChange={() => handlePaymentSelection("contact")}
//               />
//               <label htmlFor="contact">Contact Payment</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="radio"
//                 id="card"
//                 name="payment"
//                 className="mr-2"
//                 onChange={() => handlePaymentSelection("card")}
//               />
//               <label htmlFor="card">Card Payment</label>
//             </div>

//             <div className="mt-6 bg-gray-50 p-4 rounded">
//               <h4 className="font-semibold mb-2">Bank Information</h4>
//               <p>Please transfer the total amount to the following bank account:</p>
//               <ul className="mt-2 text-sm space-y-1">
//                 <li>
//                   <span className="font-semibold">Bank Name: </span>Example Bank
//                 </li>
//                 <li>
//                   <span className="font-semibold">Account Name: </span>Your Company Name
//                 </li>
//                 <li>
//                   <span className="font-semibold">Account Number: </span>1234567890
//                 </li>
//                 <li>
//                   <span className="font-semibold">Sort Code: </span>12-34-56
//                 </li>
//                 <li>
//                   <span className="font-semibold">Reference: </span>Your Order Number
//                 </li>
//               </ul>
//             </div>

//             {/* <p className="text-sm mt-4">
//               {isClassOnly
//                 ? "Shipping address is not required as your cart contains only class-related items."
//                 : "Please provide your shipping details for delivery."}
//             </p> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;

// import React, { useState } from "react";
// import { useCart } from "./CartContext";
// import { useNavigate, useLocation } from "react-router-dom";

// const PaymentPage: React.FC = () => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("contact");
//   const { state } = useLocation();
//   const isClassOnly = state?.isClassOnly || false;
//   const navigate = useNavigate();

//   const handlePaymentSelection = (method: string) => {
//     setPaymentMethod(method);
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
//       {paymentMethod === "card" ? (
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Card Payment</h3>
//             <p className="text-sm mb-6">
//               You have selected Card Payment. Please proceed with your payment.
//             </p>
//             <button
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//               onClick={() =>
//                 navigate("/checkout", { state: { isClassOnly } })
//               }
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
//             <div className="flex items-center mb-4">
//               <input
//                 type="radio"
//                 id="contact"
//                 name="payment"
//                 className="mr-2"
//                 defaultChecked={paymentMethod === "contact"}
//                 onChange={() => handlePaymentSelection("contact")}
//               />
//               <label htmlFor="contact">Contact Payment</label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="radio"
//                 id="card"
//                 name="payment"
//                 className="mr-2"
//                 onChange={() => handlePaymentSelection("card")}
//               />
//               <label htmlFor="card">Card Payment</label>
//             </div>
//             <div className="mt-6 bg-gray-50 p-4 rounded">
//               <h4 className="font-semibold mb-2">Bank Information</h4>
//               <p>Please transfer the total amount to the following bank account:</p>
//               <ul className="mt-2 text-sm space-y-1">
//                 <li>
//                   <span className="font-semibold">Bank Name: </span>Example Bank
//                 </li>
//                 <li>
//                   <span className="font-semibold">Account Name: </span>Your Company Name
//                 </li>
//                 <li>
//                   <span className="font-semibold">Account Number: </span>1234567890
//                 </li>
//                 <li>
//                   <span className="font-semibold">Sort Code: </span>12-34-56
//                 </li>
//                 <li>
//                   <span className="font-semibold">Reference: </span>Your Order Number
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveOrder } from "../../Services/OrderService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("contact");
  const [showContactPaymentMessage, setShowContactPaymentMessage] = useState(false); // New state to control message display
  const { state } = useLocation();
  const isClassOnly = state?.isClassOnly || false;
  const isCart = state?.cart || false;
  const isTotal = state?.total || false;
  // const userId = state?.userId || null;
  const navigate = useNavigate();

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
  };
  console.log(isCart)
  // console.log(userId)
  const handleProceedToPayment = async (payment: string) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("loginData") || '{}');
      const userId = userDetails?.userDetails?.id;
      console.log(userDetails?.userDetails?.id);

          // Validate userId
    if (!userId) {
      console.error("User ID is missing!");
      errorNotification("Error", "User is not logged in.");
      return;
    }

    // Validate cart items
    if (!Array.isArray(isCart) || isCart.length === 0) {
      console.error("Cart is empty!");
      errorNotification("Error", "Your cart is empty.");
      return;
    }

  
      // Prepare JSON payload
      const payload = {
        userId: userId,
        total: isTotal,
        paymentMethod: payment,
        // Convert items array to a JSON string
        items: isCart.map((item: any) => ({
          id: item.id,
          groups: item.groups,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
      };
  
      console.log("Sending Payload:", JSON.stringify(payload));
  
      // Call the saveOrder function
      const savedCart = await saveOrder(JSON.stringify(payload));
      console.log(savedCart);
      
      if (savedCart.overallStatus === "ERROR") {
        errorNotification("Error", savedCart.message || "Failed to save the order");
        return;
      }
  
      // If successful, show success notification
      successNotification("Success", "Card Payment Details");
      console.log(savedCart.data)
      if(savedCart.data?.paymentMethod === 'card'){
        navigate("/checkout",{ state: { isClassOnly,
          orderId: savedCart.data.id, // Use a meaningful key name
          cartData:savedCart.data
         } })
      }
      else{
        setShowContactPaymentMessage(true); // Show the message for contact payment
      }
    } catch (error) {
      console.error("Error saving order:", error);
  
      // If error occurs, show error notification
      errorNotification("Error", "Failed to save the order");
    }
  };
  

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
      {paymentMethod === "card" ? (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Card Payment</h3>
            <p className="text-sm mb-6">
              You have selected Card Payment. Please proceed with your payment.
            </p>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              // onClick={() =>
              //   navigate("/checkout", { state: { isClassOnly } })
              // }
              onClick={() => handleProceedToPayment(paymentMethod)}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : showContactPaymentMessage ? ( // Show message after successful contact payment
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Processing - Contact Admin</h3>
            <p className="text-sm mb-6">
            Please reach out to the Admin for further instructions to complete your payment securely.
            </p>
          </div>
        </div>
      )
      : (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="contact"
                name="payment"
                className="mr-2"
                defaultChecked={paymentMethod === "contact"}
                onChange={() => handlePaymentSelection("contact")}
              />
              <label htmlFor="contact">Contact For Payment</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="payment"
                className="mr-2"
                onChange={() => handlePaymentSelection("card")}
              />
              <label htmlFor="card">Card Payment</label>
            </div>
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Bank Information</h4>
              <p>Please transfer the total amount to the following bank account:</p>
              <ul className="mt-2 text-sm space-y-1">
                <li>
                  <span className="font-semibold">Bank Name: </span>Example Bank
                </li>
                <li>
                  <span className="font-semibold">Account Name: </span>Your Company Name
                </li>
                <li>
                  <span className="font-semibold">Account Number: </span>1234567890
                </li>
                <li>
                  <span className="font-semibold">Sort Code: </span>12-34-56
                </li>
                <li>
                  <span className="font-semibold">Reference: </span>Your Order Number
                </li>
              </ul>
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold mt-6 hover:bg-green-700 transition duration-200"
              // onClick={() =>
              //   navigate("/contact-confirmation", { state: { isClassOnly } })
              // }
              onClick={() => handleProceedToPayment(paymentMethod)}
            >
              Proceed with Contact Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;


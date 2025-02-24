// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CheckCircleIcon, ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
// import Confetti from "react-confetti";
// import { usePDF } from "react-to-pdf";
// import { motion } from "framer-motion";
// import sslsecure from "../../assets/ssl-secure.svg";
// import freeshipping from "../../assets/free-shipping.svg"
// import moneyback from "../../assets/money-back.svg";

// const OrderConfirmationPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const orderDetails = state?.orderDetails || {};
//   const shippingAddress = state?.shippingAddress || {};
//   const { toPDF, targetRef } = usePDF({ filename: `order-${orderDetails.id}.pdf` });
//   const [showConfetti, setShowConfetti] = React.useState(true);

//   const parseOrderItems = (items: any) => {
//     try {
//       if (typeof items === 'string') return JSON.parse(items);
//       if (Array.isArray(items)) return items;
//       return [];
//     } catch (e) {
//       return [];
//     }
//   };

//   const items = parseOrderItems(orderDetails.items);

//   const handleShare = async () => {
//     try {
//       await navigator.share({
//         title: `Order Confirmation #${orderDetails.id}`,
//         text: `Check out my recent purchase worth $${orderDetails.total?.toFixed(2)}`,
//         url: window.location.href,
//       });
//     } catch (error) {
//       console.log('Sharing failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       {showConfetti && (
//         <Confetti
//           recycle={false}
//           numberOfPieces={400}
//           onConfettiComplete={() => setShowConfetti(false)}
//           className="w-full h-full"
//         />
//       )}

//       <div className="max-w-4xl mx-auto" ref={targetRef}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
//         >
         
//           <div className="absolute -top-16 -right-16 w-32 h-32 bg-yellow-300 rounded-full opacity-20" />
//           <div className="absolute -top-24 -left-16 w-40 h-40 bg-green-300 rounded-full opacity-20" />

//           <div className="text-center mb-8 relative z-10">
//             <CheckCircleIcon className="h-24 w-24 text-green-600 mx-auto animate-bounce" />
//             <h1 className="text-4xl font-bold text-gray-900 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-green-600">
//               Order Confirmed!
//             </h1>
//             <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
//               Thank you for your purchase! Your order is being processed and will arrive soon.
//             </p>
//           </div>

         
//           <div className="flex justify-center gap-4 mb-8">
//             <button
//                 onClick={() => toPDF()}
//               className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               <ArrowDownTrayIcon className="w-5 h-5" />
//               Download PDF
//             </button>
//             <button
//               onClick={handleShare}
//               className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             >
//               <ShareIcon className="w-5 h-5" />
//               Share Order
//             </button>
//           </div>

     
//           <div className="mb-12">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
//             <div className="flex justify-between items-center text-sm text-gray-600">
//               <div className="text-center">
//                 <div className="w-3 h-3 bg-green-600 rounded-full mx-auto mb-2" />
//                 <p>Order Placed</p>
//                 <p className="text-xs">Today</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-2" />
//                 <p>Processing</p>
//                 <p className="text-xs">Estimated 1-2 days</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-2" />
//                 <p>Shipped</p>
//                 <p className="text-xs">Check email</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-2" />
//                 <p>Delivered</p>
//                 <p className="text-xs">Track package</p>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="border-t border-b border-gray-200 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
//               <dl className="space-y-3">
//                 <div className="flex justify-between">
//                   <dt className="text-gray-600">Order Number</dt>
//                   <dd className="font-medium">#{orderDetails.id}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt className="text-gray-600">Date</dt>
//                   <dd className="font-medium">{new Date().toLocaleDateString()}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt className="text-gray-600">Total Amount</dt>
//                   <dd className="font-medium text-green-600">
//                     ${orderDetails.total?.toFixed(2)}
//                   </dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt className="text-gray-600">Payment Method</dt>
//                   <dd className="font-medium">{orderDetails.paymentMethod || 'Credit Card'}</dd>
//                 </div>
//               </dl>
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
//               <div className="space-y-2 text-gray-600">
//                 <p>{shippingAddress.name}</p>
//                 <p>{shippingAddress.addressLine1}</p>
//                 {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
//                 <p>
//                   {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
//                 </p>
//                 <p>📱 {shippingAddress.phone}</p>
//                 <p>📧 {shippingAddress.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Items Ordered */}
//           <div className="py-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Items Ordered</h2>
//             <div className="space-y-4">
//               {items.map((item: any) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-gray-600 text-sm">SKU: {item.sku || 'N/A'}</p>
//                   </div>
//                   <div className="text-right">
//                     <p>${(item.price * item.quantity).toFixed(2)}</p>
//                     <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-8">
//             <div className="flex flex-wrap justify-center gap-6 opacity-75">
//               <img src={sslsecure} alt="SSL Secure" className="h-12" />
//               <img src={moneyback} alt="30-Day Money Back" className="h-12" />
//               <img src={freeshipping} alt="Free Shipping" className="h-12" />
//             </div>
//           </div>


//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <button
//               onClick={() => navigate("/")}
//               className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => navigate("/orders")}
//               className="w-full py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
//             >
//               View Order History
//             </button>
//           </div>

//           <div className="mt-8 text-center text-sm text-gray-500">
//             <p>Join 100,000+ satisfied customers who trust us with their purchases</p>
//           </div>
//         </motion.div>

//         {/* Recommended Products */}
//         <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
//           <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {/* product previews*/}
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
//                 <div className="bg-gray-100 h-32 rounded-lg mb-2" />
//                 <p className="font-medium">Product {i}</p>
//                 <p className="text-gray-600">$49.99</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { base_url } from '../../apiConfig';

const OrderConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState('Verifying payment...');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const stateOrder = location.state?.orderDetails;

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // if (stateOrder) {
        //   // Handle client-side payment success
        //   setOrderStatus('Payment Successful!');
        //   successNotification('Success', 'Payment completed successfully');
        //   return;
        // }
        if (stateOrder) {
          // Handle direct success case
          await axios.patch(`${base_url}/order/${stateOrder.id}/status`, {
            paymentStatus: 'SUCCESS'
          });
        return;
        }

        if (!sessionId) {
          throw new Error('No payment session found');
        }

        // 1. Verify Stripe session
        const sessionResponse = await axios.get(
          `${base_url}/product/v1/checkout/session/${sessionId}`
        );

        // 2. Update order status
        await axios.patch(`${base_url}/order/${sessionResponse.data.metadata.orderId}/status`, {
          paymentStatus: 'SUCCESS'
        });

        setOrderStatus('Payment Successful!');
        successNotification('Success', 'Payment verified successfully');

      } catch (error) {
        console.error('Payment verification failed:', error);
        setOrderStatus('Payment verification failed');
        errorNotification('Error', 'Failed to verify payment');
        // navigate('/checkout');
      }
    };

    verifyPayment();
  }, [sessionId,stateOrder]);
  //[sessionId, navigate, stateOrder]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{orderStatus}</h2>
        
        {orderStatus === 'Payment Successful!' && (
          <>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase! A confirmation email has been sent.
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
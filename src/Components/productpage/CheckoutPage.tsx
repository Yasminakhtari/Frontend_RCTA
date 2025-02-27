import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveOrder, saveShippingAddress } from "../../Services/OrderService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import axios from "axios";
import { base_url } from "../../apiConfig";
import { LockRounded } from "@mui/icons-material";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const isClassOnly = location.state?.isClassOnly || false;
  const orderId = location.state?.orderId || 0;
  const cartData = location.state?.cartData || {};

  console.log(cartData);
  console.log(JSON.stringify(cartData));

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
  //////////////////////////////////////////
  //////////////////////////////////////////

  // const handleProceedToPayment = async () => {
  //   try {
  //     // Ensure items are properly formatted as an array
  //     let formattedItems = cartData.items;

  //     if (typeof formattedItems === "string") {
  //       // Convert items string to valid JSON format
  //       formattedItems = formattedItems
  //         .replace(/(\w+)=/g, '"$1":') // Wrap keys with quotes
  //         .replace(/:\s*([\w\s&()-]+)/g, ': "$1"') // Wrap string values in quotes
  //         .replace(/"\s*([\d.]+)"/g, "$1"); // Remove quotes around numbers

  //       // Parsed the formatted string into an actual array
  //       formattedItems = JSON.parse(formattedItems);
  //     }
  //     // Prepare JSON payload
  //     console.log(cartData);
  //     console.log((cartData?.items))
  //     const payload = {
  //       orderId, // Include orderId when present
  //       userId: cartData.userId,
  //       total: cartData.total,
  //       paymentMethod: cartData.paymentMethod,
  //       items: formattedItems, //i ensured that   it's sent as JSON
  //     };

  //     console.log("Sending Payload:", JSON.stringify(payload));

  //     // Call the saveOrder function with JSON payload
  //     const savedOrder = await saveOrder(JSON.stringify(payload));
  //     console.log("Saved Order Response:", savedOrder);
  //     if (hasProducts && savedOrder.data?.id) {
  //       const shippingPayload = {
  //         ...shippingAddress,
  //         userId: cartData.userId,
  //         orderId: savedOrder.data.id // Use the created order ID
  //       };
  //       console.log(shippingPayload)
  //       await saveShippingAddress(shippingPayload);
  //     }
  //     successNotification("Success", "Payment Successfull");

  //     // Navigate to checkout page with the updated order ID
  //     // if (savedOrder.data?.paymentStatus === "Success") {
  //     //   navigate("/cart", { state: { saveOrder: savedOrder.data?.paymentStatus } });
  //     // }
  //     console.log(savedOrder.data);
  //     if (savedOrder.data?.paymentStatus === "Success") {
  //       navigate("/order-confirmation", { 
  //         state: { 
  //           orderDetails: savedOrder.data,
  //           shippingAddress: hasProducts ? shippingAddress : null
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error saving order:", error);
  //     errorNotification("Error", "Failed to save the order");
  //   }
  // }

  // Update the handleProceedToPayment function
const handleProceedToPayment = async () => {
  try {
    // // 1. Create Stripe Checkout Session
    // const productRequest = {
    //   orderId: cartData.orderId || null,
    //   amount: Math.round(cartData.total * 100), // Convert to cents
    //   quantity: 1,
    //   name: `Order #${cartData.orderId || 'new'}`,
    //   currency: "USD"
    // };
    // 1. First create/save the order
    setIsLoading(true);
    console.log("[Checkout] Initializing payment process...");

    // 1. Log initial cart data
    console.log("[Checkout] Initial cart data:", JSON.stringify(cartData, null, 2));
    console.log("[Checkout] Shipping address:", shippingAddress);

    // const orderPayload = {
    //   userId: cartData.userId,
    //   total: cartData.total,
    //   paymentMethod: cartData.paymentMethod, 
    //   items: Array.isArray(cartData.items) ? cartData.items : JSON.parse(cartData.items),
    //   // paymentStatus: "pending"
     
    // };
    const orderPayload = {
      userId: cartData.userId,
      total: cartData.total,
      paymentMethod: "stripe", 
       items: Array.isArray(cartData.items) ? cartData.items : JSON.parse(cartData.items),
      paymentStatus: "pending"
    };
    console.log("[Checkout] Order payload:", JSON.stringify(orderPayload, null, 2));
    
    // Create order first
    console.log("[Checkout] Creating order...");
    const orderResponse = await axios.post(`${base_url}/order/save`, orderPayload);
    console.log("[Checkout] Order creation response:", orderResponse.data);
    const orderId = orderResponse.data?.data?.id; // Get created order ID
    console.log("okkkkkkkkkkkkkkkkkkk" + orderId);

    if (!orderId) {
      throw new Error("Failed to get order ID from response");
    }
    console.log("[Checkout] Created order ID:", orderId);

    // 2.0 Save shipping address if needed
    if (hasProducts) {
      
      const shippingPayload = {
        ...shippingAddress,
        userId: cartData.userId,
        orderId: orderId
      };
      console.log("[Checkout] Shipping payload:", JSON.stringify(shippingPayload, null, 2));
      await saveShippingAddress(shippingPayload);
      console.log("[Checkout] Shipping address saved successfully");
    }

    // 2. Create Stripe Checkout Session with the order ID
    // const stripeRequest = {
    //   orderId: orderId,
    //   amount: Math.round(cartData.total * 100), 
    //   quantity: cartData.quantity,
    //   name: `Order #${orderId}`,
    //   currency: "USD"
    // };
    const stripeRequest = {
      orderId: orderId,
      amount: Math.round(cartData.total * 100), 
      quantity: 1,
      name: `Order #${orderId}`,
      currency: "USD"
    };
    console.log("[Checkout] Stripe request payload:", JSON.stringify(stripeRequest, null, 2));

    const stripeResponse = await axios.post(
      `${base_url}/product/v1/checkout`,
      stripeRequest
    );
    console.log("[Checkout] Stripe response:", JSON.stringify(stripeResponse.data, null, 2));

    // 2. Redirect to Stripe Checkout
    if (stripeResponse.data.sessionUrl) {
      console.log("[Checkout] Redirecting to Stripe checkout...");
      window.location.href = stripeResponse.data.sessionUrl;
    } else {
      throw new Error('Stripe session URL not found in response');
    }

  } catch (error) {
    console.error("[Checkout] Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("[Checkout] Axios error details:", {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
    errorNotification('Payment Failed', 'Could not initiate payment');
  } finally {
    setIsLoading(false);
    console.log("[Checkout] Payment process completed");
  }
};

  useEffect(() => {
    console.log("Cart Items:", cartData?.items);
    console.log("Has Products:", hasProducts);
  }, [cartData]); // Runs whenever cartData changes

  ///////////////////////////
  ///////////////////////////
  // Single handler for all fields
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };
  ///////////////////////////////
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Checkout Details
          </h1>

          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                  onChange={handleAddressChange}
                  value={shippingAddress.name}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="john.doe@example.com"
                  onChange={handleAddressChange}
                  value={shippingAddress.email}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="(555) 123-4567"
                  onChange={handleAddressChange}
                  value={shippingAddress.phone}
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {hasProducts && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="123 Main St"
                    onChange={handleAddressChange}
                    value={shippingAddress.addressLine1}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
                    Apt, Suite, or Floor (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Apt 4B"
                    onChange={handleAddressChange}
                    value={shippingAddress.addressLine2}
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="New York"
                    onChange={handleAddressChange}
                    value={shippingAddress.city}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="NY"
                    onChange={handleAddressChange}
                    value={shippingAddress.state}
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="10001"
                    onChange={handleAddressChange}
                    value={shippingAddress.zipCode}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <div className="mt-10 border-t pt-8">
            <button
              onClick={handleProceedToPayment}
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <LockRounded className="w-5 h-5 mr-2" />
                  Pay Securely ${cartData.total?.toFixed(2)}
                </>
              )}
            </button>
            
            <p className="mt-4 text-center text-sm text-gray-500">
              <LockRounded className="h-4 w-4 inline-block mr-1 text-gray-400" />
              Your transaction is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

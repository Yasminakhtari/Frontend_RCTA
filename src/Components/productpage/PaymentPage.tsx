import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('contact');
  const navigate = useNavigate();

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Conditionally render content based on payment method */}
      {paymentMethod === 'card' ? (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Card Payment</h3>
            <p className="text-sm mb-6">You have selected Card Payment. Please proceed with your payment.</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            onClick={() => navigate("/checkout")}>
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="contact"
                name="payment"
                className="mr-2"
                defaultChecked={paymentMethod === 'contact'}
                onChange={() => handlePaymentSelection('contact')}
              />
              <label htmlFor="contact">Contact Payment</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="payment"
                className="mr-2"
                onChange={() => handlePaymentSelection('card')}
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

          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;



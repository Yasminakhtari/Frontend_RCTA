import React from 'react';

const PaymentPage: React.FC = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
        

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
          <div className="flex items-center mb-4">
            <input type="radio" id="contact" name="payment" className="mr-2" defaultChecked />
            <label htmlFor="contact">Contact Payment</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="card" name="payment" className="mr-2" />
            <label htmlFor="card">Card Payment</label>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Bank Information</h4>
            <p>Please transfer the total amount to the following bank account:</p>
            <ul className="mt-2 text-sm space-y-1">
              <li><span className="font-semibold">Bank Name: </span>Example Bank</li>
              <li><span className="font-semibold">Account Name: </span>Your Company Name</li>
              <li><span className="font-semibold">Account Number: </span>1234567890</li>
              <li><span className="font-semibold">Sort Code: </span>12-34-56</li>
              <li><span className="font-semibold">Reference: </span>Your Order Number</li>
            </ul>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default PaymentPage;
